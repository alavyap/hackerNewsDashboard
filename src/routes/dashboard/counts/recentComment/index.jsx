import React, { useEffect, useState } from "react";
import { getRecentComments } from "./apiCall";

const RecentComments = () => {
    const [recentComments, setRecentComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getRecentComments();
            setRecentComments(data);
        };

        fetchComments();
    }, []);

    return (
        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
            <div className="card-header">
                <p className="card-title">Recent Comments</p>
            </div>
            <div className="card-body h-[300px] overflow-auto p-0">
                {recentComments.length > 0 ? (
                    recentComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex cursor-pointer items-center justify-between gap-x-4 py-2 pr-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => window.open(comment.url, "_blank")}
                        >
                            <div className="flex items-center gap-x-4">
                                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-bold uppercase text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                                    {comment.username.charAt(0)}
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <p className="font-medium text-slate-900 dark:text-slate-50">{comment.username}</p>
                                    <p className="w-[200px] truncate text-sm text-slate-600 dark:text-slate-400">{comment.text}</p>
                                </div>
                            </div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{comment.postedDate}</p>
                        </div>
                    ))
                ) : (
                    <p className="py-4 text-center text-slate-500">Loading recent comments...</p>
                )}
            </div>
        </div>
    );
};

export default RecentComments;
