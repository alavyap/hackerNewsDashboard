import React, { useState } from "react";
import UserCard from "./userCard";
import { getHackerNewsUser } from "./apiCall";

const UserInfo = () => {
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchHackerNewsUserData() {
        if (!userName.trim()) return;
        setLoading(true);
        const data = await getHackerNewsUser(userName);
        setUserData(data);
        setLoading(false);
    }

    function handleSubmit() {
        fetchHackerNewsUserData();
    }

    return (
        <div className="mx-auto mt-10 max-w-lg">
            {/* Search Bar */}
            <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-3">
                <input
                    type="text"
                    placeholder="Search Hacker News Username..."
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    className="flex-grow bg-transparent p-2 outline-none"
                />
                <button
                    onClick={handleSubmit}
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
                >
                    Search
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <h1 className="mt-5 text-center text-gray-500">Loading data... Please wait</h1>
            ) : (
                userData !== null && <UserCard user={userData} />
            )}
        </div>
    );
};

export default UserInfo;
