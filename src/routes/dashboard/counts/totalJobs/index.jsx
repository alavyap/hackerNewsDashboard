import { Briefcase, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getJobStats } from "./apiCall";

const TotalJobs = () => {
    const [jobStats, setJobStats] = useState({ jobCount: 0, trendPercentage: 0, isTrendingUp: true });

    useEffect(() => {
        const fetchStats = async () => {
            const stats = await getJobStats();
            setJobStats(stats);
        };

        fetchStats();
        const interval = setInterval(fetchStats, 30000); // Fetch new stats every 30 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <Briefcase size={26} />
                </div>
                <p className="card-title">Job Posted</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50"> {jobStats.jobCount.toLocaleString()}</p>
                <span
                    className={`flex w-fit items-center gap-x-2 rounded-full border px-2 py-1 font-medium ${
                        jobStats.isTrendingUp
                            ? "border-green-500 text-green-500 dark:border-green-600 dark:text-green-600"
                            : "border-red-500 text-red-500 dark:border-red-600 dark:text-red-600"
                    }`}
                >
                    {jobStats.isTrendingUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    {Math.abs(jobStats.trendPercentage)}%
                </span>
            </div>
        </div>
    );
};

export default TotalJobs;
