import React, { useEffect, useState } from "react";
import { getTopStories } from "./apiCall";

const TopStories = () => {
    const [topStories, setTopStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            const data = await getTopStories();
            setTopStories(data);
        };

        fetchStories();
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <p className="card-title">Top 5 Most Upvoted Stories</p>
            </div>
            <div className="card-body p-0">
                <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">#</th>
                                <th className="table-head">Story</th>
                                <th className="table-head">Published Date</th>
                                <th className="table-head">Total Upvotes</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {topStories.length > 0 ? (
                                topStories.map((story) => (
                                    <tr
                                        key={story.id}
                                        className="table-row cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => window.open(story.url, "_blank")}
                                    >
                                        <td className="table-cell">{story.number}</td>
                                        <td className="table-cell text-blue-500 hover:underline">{story.name}</td>
                                        <td className="table-cell">{story.publishedDate}</td>
                                        <td className="table-cell">{story.upvotes}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="py-4 text-center text-slate-500"
                                    >
                                        Loading top upvoted stories...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopStories;
