import React from 'react'
import PageTitle from '../components/PageTitle'
import { useProject } from '../Context/ProjectContext';
import { useUser } from '../Context/UserContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OVERALL_COLORS = ['#3b82f6', '#22c55e']; // Blue and Green
const USER_DIST_COLORS = ['#a855f7', '#f97316']; // Purple and Orange
const Dashboard = () => {
    const { allData, loading } = useProject();
    const { allUsers } = useUser();

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    // ── Summary counts ──────────────────────────────────────
    const totalproject = allData.length;
    let totaltaskcount = 0;
    allData.forEach((project) => {
        totaltaskcount = totaltaskcount + (project.tasks?.length || 0);
    });

    //  FIX 1: allUsers is flat array from mockapi
  

    // ── Left Chart ────────────────────────────────────────────
    const overallData = [
        { name: 'Total Projects', value: totalproject },
        { name: 'Total Tasks',    value: totaltaskcount },
    ];
   

// 1. Get every user from every project
const allFlattenedUsers = allUsers.flatMap(project => project.users || []);

// 2. Remove duplicates (so Alice doesn't count twice if she is in two projects)
const uniqueUsers = Array.from(new Map(allFlattenedUsers.map(u => [u.id, u])).values());

// 3. Use this for your total count
const totalusercount = uniqueUsers.length;

const managerCount = uniqueUsers.filter(
    (u) => (u.role || "").toLowerCase().includes("manager")
).length;

const userCount = uniqueUsers.filter(
    (u) => (u.role || "").toLowerCase().includes("user") && 
           !(u.role || "").toLowerCase().includes("manager")
).length;

 
const USER_DIST_COLORS = ['#a855f7', '#f97316']; 

const userDistData = [
    { name: "Managers", value: managerCount },
    { name: "Users", value: userCount },
];

    return (
        <div className='flex flex-col'>
            <PageTitle />

            {/* section 2: Summary Counters */}
            <section className='w-full grid grid-cols-3 pt-12 px-7 gap-7'>
                <div className='flex flex-col py-2 items-center gap-2 bg-white shadow-md rounded-md justify-center'>
                    <span className='text-lg font-semibold'>Total Project</span>
                    <span className='px-3 py-1 bg-blue-600 text-white rounded-2xl font-semibold'>{totalproject}</span>
                </div>
                <div className='flex flex-col py-2 items-center gap-2 bg-white shadow-md rounded-md justify-center'>
                    <span className='text-lg font-semibold'>Total Tasks</span>
                    <span className='px-2 py-1 bg-blue-600 text-white rounded-2xl font-semibold'>{totaltaskcount}</span>
                </div>
                <div className='flex flex-col py-2 items-center gap-2 bg-white shadow-md rounded-md justify-center'>
                    <span className='text-lg font-semibold'>Total Users</span>
                    <span className='px-3 py-1 bg-blue-600 text-white rounded-2xl font-semibold'>{totalusercount}</span>
                </div>
            </section>

            {/* section 3: Charts + Projects */}
            <section className='w-full grid grid-cols-3 pt-12 px-7 gap-7 pb-10'>

                {/* ── LEFT: Overall Distribution Donut ── */}
                <div className='flex flex-col h-96 items-center bg-white shadow-md rounded-md'>
                    <div className='py-4'>
                        <span className='font-semibold'>Overall Distribution</span>
                    </div>
                    {/* FIX 3: full width + height container so donut centers properly */}
                    <div className='w-full flex-1 flex flex-col items-center justify-center'>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={overallData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                  {overallData.map((entry, index) => (
  <Cell key={`cell-${index}`} fill={OVERALL_COLORS[index % OVERALL_COLORS.length]} />
))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <span className='text-xs text-gray-500 font-semibold pb-3'>Projects and Tasks Overview</span>
                </div>

                {/* ── MIDDLE: All Projects Scrollable ── */}
                <div className='flex flex-col h-96 items-center gap-2 bg-white shadow-md rounded-md justify-between'>
                    <div className='py-4'>
                        <span className='font-semibold'>All Projects</span>
                    </div>
                    <div className='grid grid-cols-2 overflow-auto h-full w-full px-2
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                        {allData.map((project) => {
                            const todo       = project.tasks?.filter(t => t.status === "todo").length || 0;
                            const inprogress = project.tasks?.filter(t => t.status === "progress").length || 0;
                            const done       = project.tasks?.filter(t => t.status === "done").length || 0;
                            return (
                                <div key={project.project_id} className='p-2 w-full'>
                                    <div className="flex flex-col justify-center shadow-md border border-gray-100 rounded-lg p-2 gap-1 bg-gray-50">
                                        <span className='font-semibold text-sm truncate'>{project.project_title}</span>
                                        <div className='flex flex-col text-xs mt-2 gap-1'>
                                            <div className='flex justify-between px-1'><span>Total Task :</span><b>{project.tasks?.length || 0}</b></div>
                                            <div className='flex justify-between px-1'><span>To Do :</span><b>{todo}</b></div>
                                            <div className='flex justify-between px-1'><span>Progress :</span><b>{inprogress}</b></div>
                                            <div className='flex justify-between px-1'><span>Done :</span><b>{done}</b></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <span className='text-xs text-gray-500 font-semibold pb-1'>Showing {totalproject} Projects</span>
                </div>

              
                {/* ── RIGHT: User Distribution Donut ── */}
<div className='flex flex-col h-96 items-center bg-white shadow-md rounded-md'>
    <div className='py-4'>
        <span className='font-semibold'>User Distribution</span>
    </div>
    
    <div className='w-full flex-1 flex flex-col items-center justify-center'>
        <ResponsiveContainer width="100%" height={220}>
            <PieChart>
                <Pie
                    data={userDistData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}   // Same as left chart
                    outerRadius={90}   // Same as left chart
                    paddingAngle={3}
                    dataKey="value"
                >
                    {userDistData.map((entry, index) => (
  <Cell key={`cell-${index}`} fill={USER_DIST_COLORS[index % USER_DIST_COLORS.length]} />
))}
                </Pie>
                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
    <span className='text-xs text-gray-500 font-semibold pb-3'>All Users</span>
</div>

            </section>
        </div>
    );
}

export default Dashboard