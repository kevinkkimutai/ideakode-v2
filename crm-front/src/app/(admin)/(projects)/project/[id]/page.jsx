'use client'
import { use, useEffect, useState } from 'react';
import { Calendar, Clock, DollarSign, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useGetProjectMutation } from '@/redux/actions/projectActions';
// import Skeleton from '@/components/projects/skeleton';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Link from 'next/link';
import ProjectModal from '@/components/projects/ProjectModal';
import Notification from '@/components/ui/alert/Notification';
import TaskTab from '@/components/projects/Tabs/TaskTab';
import ClientTab from '@/components/projects/Tabs/ClientTab';

export default function ProjectDetailsPage(promiseParams) {
  const { id } = use(promiseParams.params);
  const [getProject] = useGetProjectMutation();
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false)
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getProject(id);
        
        if (response.data) {
          setProject(response.data);
          setLoading(false);
        } else if (response.error) {
          // Correctly extracting the error message
          const errorMessage = response.error.data?.error || "Failed to fetch project. Please try again.";
          toast.error(errorMessage);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch project: " + (error.message || "Unknown error"));
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, getProject]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Calculate project progress based on tasks
  const calculateProgress = () => {
    if (!project || !project.Tasks || project.Tasks.length === 0) return 0;
    
    const totalTasks = project.Tasks.length;
    const completedTasks = project.Tasks.filter(task => task.completed_at).length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  // Map status to badge color
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
        case 'planning':
          return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  // Map priority to badge color
  const getPriorityBadgeColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'medium':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'low':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };


// Calculate days remaining (either to start date or end date)
const calculateDaysRemaining = () => {
  if (!project) return { days: 0, type: 'end' };
  
  const today = new Date();

  if (project.start_date) {
    const startDate = new Date(project.start_date);
    if (today < startDate) {
      const diffDays = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
      return { days: diffDays, type: 'start' };
    }
  }

  if (project.end_date) {
    const endDate = new Date(project.end_date);
    const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    return { days: diffDays > 0 ? diffDays : 0, type: 'end' };
  }

  return { days: 0, type: 'end' };
};

const { days, type } = calculateDaysRemaining();

  if (loading || !project) {
    return (
     <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Skeleton Header */}
        <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="mt-1 h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex space-x-3">
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Skeleton Dashboard */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Skeleton Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6">
                <div className="flex items-center">
                  <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-3 h-12 w-12 mr-4 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skeleton Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px space-x-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="py-4 px-1 border-b-2 border-transparent">
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </nav>
          </div>

          {/* Skeleton Content */}
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6 mb-8">
                  <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6">
                  <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                      <div>
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6 mb-8">
                  <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                  <div className="flex items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-12 w-12 animate-pulse mr-4"></div>
                    <div>
                      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i}>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
     </>
    );
  }
  
  const progress = calculateProgress();

  const handelEdit = () => {
    setOpenEditModal(true);
  }
  const handelClose = () => {
    setOpenEditModal(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
         <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
       Project
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
        <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/projects"
            >
              Projects
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-blue-600 dark:text-white/90">
          {project.name}
          </li>
        </ol>
      </nav>
    </div>
    {/* Header */}
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Project #{project.id} • Client: {project.Customer.company_name}</p>
          </div>
          <div className="flex space-x-3 items-center">
     
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium text-center flex items-center justify-center ${getStatusBadgeColor(project.status)}`}>
              {project.status.replace('_', ' ').toUpperCase()}
            </span>
            <button  
            onClick={() => { handelEdit() }} 
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
              Edit Project
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Project Overview Dashboard */}
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex items-center">
            <div className="rounded-md bg-blue-100 dark:bg-blue-900 p-3 mr-4">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</p>
              <p className="text-lg 2xl:text-xl font-semibold text-gray-900 dark:text-white">
            {days} Days {type === 'start' ? 'Until Start' : 'Remaining'}
          </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex items-center">
            <div className="rounded-md bg-green-100 dark:bg-green-900 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
              <p className="text-lg 2xl:text-xl  font-semibold text-gray-900 dark:text-white">ksh: {parseInt(project.budget).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex items-center">
            <div className="rounded-md bg-purple-100 dark:bg-purple-900 p-3 mr-4">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</p>
              <p className="text-lg 2xl:text-xl  font-semibold text-gray-900 dark:text-white">{progress}% Complete</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex items-center">
            <div className="rounded-md bg-orange-100 dark:bg-orange-900 p-3 mr-4">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team</p>
              <p className="text-lg 2xl:text-xl  font-semibold text-gray-900 dark:text-white">{new Set(project.Tasks.flatMap(task => task.Assignees.map(a => a.email))).size} Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
              activeTab === 'tasks'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('client')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
              activeTab === 'client'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Client
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Description</h2>
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Project Timeline</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{project.start_date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{project.end_date}</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Progress: {progress}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{days} Days {type === 'start' ? 'Until Start' : 'Remaining'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Manager</h2>
                <div className="flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mr-4">
                    <span className="text-xl font-medium text-indigo-700 dark:text-indigo-300">
                      {project.Manager.first_name.charAt(0)}{project.Manager.last_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{project.Manager.first_name} {project.Manager.last_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.Manager.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Details</h2>
                <div className="space-y-4 ">
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <div className='flex flex-col items-center justify-center'>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created On</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(project.createdAt)}</p>
                  </div>
                  <div  className='flex flex-col items-center justify-center'>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(project.updatedAt)}</p>
                  </div>
                  <div  className='flex flex-col items-center justify-center'>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
                    <p className="font-medium text-gray-900 dark:text-white">ksh: {parseInt(project.budget).toLocaleString()}</p>
                  </div>
                </div>
                 
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
         <TaskTab project={project} />
        )}
        
        {activeTab === 'client' && (
        <ClientTab project={project} />
        )}
      </div>
    </main>

    {openEditModal && (
      <ProjectModal 
      isOpen={openEditModal}
      onClose={handelClose}
      project={project}
      setAlertData={setAlertData}
      setProject={setProject}
      />
    )}
     {alertData?.show && (
        <Notification
          alertData={alertData} 
          onClose={() => setAlertData(null)}
        />
      )}
  </div>
  );
}