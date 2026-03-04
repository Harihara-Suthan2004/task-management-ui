import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import { getDashboardData } from '../Services/ProjectService';

const Dashboard = () => {

    const [APIdata, setAPIdata] = useState([]);
    useEffect(() => {
        const FetchallDashData = async () => {
            try {
                const Res = await getDashboardData();
                setAPIdata(Res);
            }
            catch (error) {
                console.log(error);
            }
        }

        FetchallDashData();
    }, [])

    //logic for Summary Cards
    const totalproject = APIdata.length;
    let totaltaskcount = 0;
    APIdata.forEach((project) => {
        totaltaskcount = totaltaskcount + (project.tasks?.length || 0);
    })
    const allmembers = APIdata.flatMap(project => project.members || []);
    const uniqueusercount = new Set(allmembers).size
    return (

        <div className='flex flex-col'>
            <PageTitle />

            {/* section 2:  Summary Counters*/}

            <section className='w-full grid grid-cols-3 pt-12 px-7 gap-7'>

                <div className='flex flex-col py-2 items-center gap-2 bg-white shadow-md rounded-md justify-center'>
                    <span className=' text-lg font-semibold'>Total Project</span>
                    <span className='px-3 py-1 bg-blue-600 text-white rounded-2xl font-semibold'>{totalproject}</span>
                </div>
                <div className='flex flex-col py-2 items-center gap-2  bg-white shadow-md rounded-md justify-center'>
                    <span className=' text-lg font-semibold'>Total Tasks</span>
                    <span className='px-2 py-1 bg-blue-600 text-white rounded-2xl font-semibold'>{totaltaskcount}</span>
                </div>
                <div className='flex flex-col py-2  items-center gap-2  bg-white shadow-md rounded-md justify-center'>
                    <span className=' text-lg font-semibold'>Total Project</span>
                    <span className='px-3 py-1 bg-blue-600 text-white rounded-2xl font-semibold'>{uniqueusercount}</span>
                </div>

            </section>

            {/* section 3: Distributions and limits */}

            <section className='w-full grid grid-cols-3 pt-12 px-7 gap-7 pb-10'>
                <div className='flex flex-col h-96 items-center gap-2  bg-white shadow-md rounded-md justify-between'>
                    <div className='py-6'>
                        <span className='font-semibold'>Overall Distribution</span>
                    </div>
                </div>
                {/* All Projects - Scrollable List */}
                <div className='flex flex-col h-96 items-center gap-2  bg-white shadow-md rounded-md justify-between'>
                    <div className='py-6'>
                        <span className='font-semibold'>All Projects</span>
                    </div>
                    <div className='grid grid-cols-2 overflow-auto h-full [&::-webkit-scrollbar]:hidden 
                [-ms-overflow-style:none] 
                [scrollbar-width:none]'>
                        {APIdata.map((project) => {
                            const todo = project.tasks?.filter(t => t.status === "todo").length || 0;
                            const inprogress = project.tasks?.filter(t => t.status === "progress").length || 0;
                            const done = project.tasks?.filter(t => t.status === "done").length || 0;
                            return (
                                <div className='p-2 w-full h-full'>
                                    <div key={project.project_id} className=" flex flex-col justify-center shadow-md border border-gray-50 rounded-lg p-2 gap-1 bg-gray-50">
                                        <span className='font-semibold text-sm truncate'>{project.project_title}</span>
                                        <div className='felx flex-col text-xs mt-2 gap-1'>
                                            <div className='flex justify-between px-1'><span>Total Task : </span><b>{project.tasks?.length || 0}</b></div>
                                            <div className='flex justify-between px-1'><span>To Do : </span><b>{todo}</b></div>
                                            <div className='flex justify-between px-1'><span>Progress : </span><b>{inprogress}</b></div>
                                            <div className='flex justify-between px-1'><span>Done : </span><b>{done}</b></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <span className='text-xs text-gray-500 font-semibold pb-1'>Showing {totalproject} Projects</span>
                </div>
                {/* User Distribution */}
                <div className='flex flex-col h-96 items-center gap-2  bg-white shadow-md rounded-md justify-between'>
                    <div className='py-6'>
                        <span className='font-semibold'>User Distribution</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
