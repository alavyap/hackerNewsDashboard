import { useTheme } from "@/hooks/use-theme";

import { recentSalesData, topProducts } from "@/constants";

import { Footer } from "@/layouts/footer";

import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";
import TotalJobs from "./counts/totalJobs";
import TotalBestStories from "./counts/totalBestStories";

import TotalShowStories from "./counts/showHN";
import MonthlyAvg from "./counts/avgScore";
import LiveScores from "./counts/liveScore";
import TopStories from "./counts/topStories";
import RecentComments from "./counts/recentComment";

const DashboardPage = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <TotalJobs />
                <TotalBestStories />
                <TotalShowStories />
                <MonthlyAvg />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <LiveScores />
                <RecentComments />
            </div>
            <TopStories />
            <Footer />
        </div>
    );
};

export default DashboardPage;
