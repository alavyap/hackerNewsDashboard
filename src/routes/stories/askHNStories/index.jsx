import React, { useEffect, useState } from "react";
import { getAskHnStories } from "./apiCall";

const AskHNStories = () => {
    const [askHnStories, setAskHnStories] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of stories per page

    useEffect(() => {
        const fetchStories = async () => {
            const data = await getAskHnStories(page, limit);
            setAskHnStories(data);
        };

        fetchStories();
    }, [page]);

    return (
        <div className="card">
            <div className="card-header">
                <p className="card-title">Ask HN Stories</p>
            </div>
            <div className="card-body p-0">
                <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">ID</th>
                                <th className="table-head">Story</th>
                                <th className="table-head">Published Date</th>
                                <th className="table-head">Upvotes</th>
                                <th className="table-head">Comments</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {askHnStories.length > 0 ? (
                                askHnStories.map((story, index) => (
                                    <tr
                                        key={story.id}
                                        className="table-row"
                                    >
                                        <td className="table-cell">{(page - 1) * limit + index + 1}</td>
                                        <td className="table-cell">
                                            <div className="flex w-max gap-x-4">
                                                <div className="flex flex-col">
                                                    <a
                                                        href={story.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {story.title}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">{story.date}</td>
                                        <td className="table-cell font-bold">{story.score}</td>
                                        <td className="table-cell">{story.comments}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-4 text-center text-slate-500"
                                    >
                                        Loading Ask HN stories...
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

export default AskHNStories;
