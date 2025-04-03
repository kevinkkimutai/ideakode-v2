'use client';
import { useGetAllProjectsMutation } from '@/redux/actions/projectActions';
import { setProjects } from '@/redux/reducers/projectReducers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function PortfolioHighlights() {
    const dispatch = useDispatch();
    const [getProjects] = useGetAllProjectsMutation();
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await getProjects();
                if (response.data) {
                    dispatch(setProjects(response?.data));
                    setAllProjects(response?.data);
                } else if (response?.error) {
                    console.error(response?.error?.data?.error || "Failed to fetch projects.");
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [dispatch, getProjects]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='max-w-[1280px] w-full mx-auto max-lg:px-4 flex flex-col lg:items-center justify-center'>
            <h2 className="text-3xl text-green-900 font-bold mb-2">Our Work Speaks for Itself</h2>
            <hr className="w-10 h-[3px] bg-green-800" />
            <p className="text-gray-800 mt-5 lg:w-[65%] flex lg:text-center lg:text-lg">
                Explore our portfolio of cutting-edge web, software, and design projects.
                From sleek websites to powerful applications, our work showcases innovation,
                creativity, and functionality. See how we bring ideas to life!
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 md:mt-20'>
                {allProjects.slice(0, 3).map((project, index) => (
                    <div className='relative h-[400px] rounded-2xl overflow-clip' key={index}>
                        <div className="absolute bottom-0 left-0 right-0 top-24 opacity-100 bg-gradient-to-t from-green-700 to-transparent"></div>
                        <Image
                            src={project?.image}
                            alt="project"
                            width={1000}
                            height={1000}
                            priority
                            className="object-contain"
                        />
                        <div className='absolute bottom-4 left-0 right-0 px-4 lg:px-6'>
                            <h2 className="text-2xl font-bold text-white">{project?.title}</h2>
                            <p className="text-base text-white line-clamp-2">{project?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
