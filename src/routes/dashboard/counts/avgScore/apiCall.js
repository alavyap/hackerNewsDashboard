let previousAvgScore = 0; // Store previous month's average score for trend calculation

export const getMonthlyAvgScore = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`);
        const storyIds = await response.json();

        // Fetch details for each story (limiting to 200 for performance)
        const storyPromises = storyIds.slice(0, 200).map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyRes.json();
        });

        const stories = await Promise.all(storyPromises);

        // Filter stories from the last 30 days
        const thirtyDaysAgo = Date.now() / 1000 - 30 * 24 * 60 * 60;
        const monthlyStories = stories.filter((story) => story.time >= thirtyDaysAgo);

        // Calculate the average score
        const totalScore = monthlyStories.reduce((sum, story) => sum + (story.score || 0), 0);
        const avgScore = monthlyStories.length > 0 ? totalScore / monthlyStories.length : 0;

        // Calculate the percentage change from the previous average score
        const trendChange = previousAvgScore > 0 ? ((avgScore - previousAvgScore) / previousAvgScore) * 100 : 0;

        previousAvgScore = avgScore; // Update previous score for next comparison

        return {
            averageScore: avgScore.toFixed(2),
            trendPercentage: trendChange.toFixed(2), // Round to 2 decimal places
            isTrendingUp: trendChange >= 0, // Boolean for UI
        };
    } catch (error) {
        console.error("Error fetching monthly average score:", error);
        return { averageScore: 0, trendPercentage: 0, isTrendingUp: true };
    }
};
