let previousBestStoryCount = 0; // Store previous count for trend calculation

export const getBestStoryStats = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`);
        const storyIds = await response.json();

        const currentBestStoryCount = storyIds.length; // Get the current total count

        // Calculate trend percentage
        const trendChange = previousBestStoryCount > 0 ? ((currentBestStoryCount - previousBestStoryCount) / previousBestStoryCount) * 100 : 0;

        previousBestStoryCount = currentBestStoryCount; // Update previous count for next comparison

        return {
            bestStoryCount: currentBestStoryCount,
            trendPercentage: trendChange.toFixed(2), // Round to 2 decimal places
            isTrendingUp: trendChange >= 0, // Boolean for UI
        };
    } catch (error) {
        console.error("Error fetching best stories stats:", error);
        return { bestStoryCount: 0, trendPercentage: 0, isTrendingUp: true };
    }
};
