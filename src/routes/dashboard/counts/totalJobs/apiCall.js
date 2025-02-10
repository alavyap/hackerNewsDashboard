let previousJobCount = 0; // Store previous job count for trend calculation

export const getJobStats = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/jobstories.json`);
        const jobIds = await response.json();

        const currentJobCount = jobIds.length; // Get the current total job count

        // Calculate trend percentage
        const trendChange = previousJobCount > 0 ? ((currentJobCount - previousJobCount) / previousJobCount) * 100 : 0;

        previousJobCount = currentJobCount; // Update the previous job count for next comparison

        return {
            jobCount: currentJobCount,
            trendPercentage: trendChange.toFixed(2), // Round to 2 decimal places
            isTrendingUp: trendChange >= 0, // Boolean for UI
        };
    } catch (error) {
        console.error("Error fetching job stats:", error);
        return { jobCount: 0, trendPercentage: 0, isTrendingUp: true };
    }
};
