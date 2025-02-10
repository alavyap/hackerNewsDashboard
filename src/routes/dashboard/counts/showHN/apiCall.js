let previousShowStoryCount = 0; // Store previous count for trend calculation

export const getShowStoryStats = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/showstories.json`);
        const storyIds = await response.json();

        const currentShowStoryCount = storyIds.length; // Get the current total count

        // Calculate trend percentage
        const trendChange = previousShowStoryCount > 0 ? ((currentShowStoryCount - previousShowStoryCount) / previousShowStoryCount) * 100 : 0;

        previousShowStoryCount = currentShowStoryCount; // Update previous count for next comparison

        return {
            showStoryCount: currentShowStoryCount,
            trendPercentage: trendChange.toFixed(2), // Round to 2 decimal places
            isTrendingUp: trendChange >= 0, // Boolean for UI
        };
    } catch (error) {
        console.error("Error fetching Show HN stories stats:", error);
        return { showStoryCount: 0, trendPercentage: 0, isTrendingUp: true };
    }
};
