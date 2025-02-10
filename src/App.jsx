import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import UserInfo from "./routes/userInfo";
import AskHNStories from "./routes/stories/askHNStories";
import ShowHNStories from "./routes/stories/showHNStories";
import BestStories from "./routes/stories/bestStories";
import NewStories from "./routes/stories/newStories";
import JobPosts from "./routes/jobPosts";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "jobPosts",
                    element: <JobPosts />,
                },
                {
                    path: "userInfo",
                    element: <UserInfo />,
                },

                {
                    path: "newStories",
                    element: <NewStories />,
                },
                {
                    path: "bestStories",
                    element: <BestStories />,
                },
                {
                    path: "showHNStories",
                    element: <ShowHNStories />,
                },
                {
                    path: "askHNStories",
                    element: <AskHNStories />,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
