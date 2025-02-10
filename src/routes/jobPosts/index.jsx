import React, { useEffect, useState } from "react";
import { getJobPosts } from "./apiCall";
const JobPosts = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of job posts per page

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getJobPosts(page, limit);
            setJobPosts(data);
        };

        fetchJobs();
    }, [page]);

    return (
        <div className="card">
            <div className="card-header">
                <p className="card-title">Hacker News Job Posts</p>
            </div>
            <div className="card-body p-0">
                <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">ID</th>
                                <th className="table-head">Job Title</th>
                                <th className="table-head">Posted Date</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {jobPosts.length > 0 ? (
                                jobPosts.map((job, index) => (
                                    <tr
                                        key={job.id}
                                        className="table-row"
                                    >
                                        <td className="table-cell">{(page - 1) * limit + index + 1}</td>
                                        <td className="table-cell">
                                            <a
                                                href={job.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {job.title}
                                            </a>
                                        </td>
                                        <td className="table-cell">{job.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="py-4 text-center text-slate-500"
                                    >
                                        Loading job posts...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center gap-4">
                <button
                    className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-lg font-bold">Page {page}</span>
                <button
                    className="rounded bg-gray-200 px-4 py-2"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default JobPosts;
