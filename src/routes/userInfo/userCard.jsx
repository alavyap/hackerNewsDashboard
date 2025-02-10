import React from "react";

const UserCard = ({ user }) => {
    if (!user) {
        return <div className="mt-5 text-center font-semibold text-red-500">User not found. Try again!</div>;
    }

    return (
        <div className="mx-auto mt-6 max-w-lg rounded-lg bg-white p-6 shadow-lg">
            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-2">
                <h2 className="text-xl font-bold">{user.id}</h2>
                <a
                    href={`https://news.ycombinator.com/user?id=${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    View Profile on Hacker News
                </a>
            </div>

            {/* Bio */}
            <p className="mt-4 text-center text-gray-700">{user.about}</p>

            {/* Sub Cards Section */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100 p-3 text-center">
                    <p className="text-lg font-semibold">{user.karma}</p>
                    <p className="text-sm text-gray-500">Karma</p>
                </div>
                <div className="rounded-lg bg-gray-100 p-3 text-center">
                    <p className="text-lg font-semibold">{user.submitted}</p>
                    <p className="text-sm text-gray-500">Submissions</p>
                </div>
                <div className="col-span-2 rounded-lg bg-gray-100 p-3 text-center">
                    <p className="text-lg font-semibold">{user.created}</p>
                    <p className="text-sm text-gray-500">Joined</p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
