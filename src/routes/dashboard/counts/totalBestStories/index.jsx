import { Star, TrendingUp, TrendingDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getBestStoryStats } from "./apiCall";

const TotalBestStories = () => {
    const [bestStoryStats, setBestStoryStats] = useState({
        bestStoryCount: 0,
        trendPercentage: 0,
        isTrendingUp: true,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const stats = await getBestStoryStats();
            setBestStoryStats(stats);
        };

        fetchStats();
        const interval = setInterval(fetchStats, 30000); // Fetch new stats every 30 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <Star
                        color="orange"
                        size={26}
                    />
                </div>
                <p className="card-title">Best Stories Count</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                    {bestStoryStats.bestStoryCount.toLocaleString()}
                </p>
                <span
                    className={`flex w-fit items-center gap-x-2 rounded-full border px-2 py-1 font-medium ${
                        bestStoryStats.isTrendingUp
                            ? "border-green-500 text-green-500 dark:border-green-600 dark:text-green-600"
                            : "border-red-500 text-red-500 dark:border-red-600 dark:text-red-600"
                    }`}
                >
                    {bestStoryStats.isTrendingUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    {Math.abs(bestStoryStats.trendPercentage)}%
                </span>
            </div>
        </div>
    );
};

export default TotalBestStories;
