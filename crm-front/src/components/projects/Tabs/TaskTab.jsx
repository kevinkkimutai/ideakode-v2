'use client'
import React from 'react'
import { Calendar, Clock, DollarSign, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function TaskTab({project, getPriorityBadgeColor, getStatusBadgeColor, name}) {
  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-lg   overflow-hidden transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{name} Tasks</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
                  Add Task
                </button>
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {project.Tasks.map((task) => (
                <li key={task.id} className="px-6 py-4 relative overflow-clip">
                    <div className='absolute top-0 -ms-6 w-full flex items-center justify-center'>
                      <span className={`${getStatusBadgeColor(task.status)} px-6 pb-1 rounded-b-xl text-sm`}>
                    {task.status}
                      </span>
                    </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {task.completed_at ? (
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
                        ) : task.status === 'pending' ? (
                          <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-3" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3" />
                        )}
                        <div className='ms-4'>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">{task.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-10">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </span>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-900 dark:text-white">Due: {task.due_date}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Est: {task.estimated_hours} hours</p>
                      </div>
                      
                      <div className="flex -space-x-2">
                        {task.Assignees.map((assignee, idx) => (
                          <div key={idx} className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center border-2 border-white dark:border-gray-800">
                            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                              {assignee.first_name.charAt(0)}{assignee.last_name.charAt(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
  )
}
