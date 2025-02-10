export const getLiveScores = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`);
        const storyIds = await response.json();

        // Fetch details for the latest 200 stories (optimization)
        const storyPromises = storyIds.slice(0, 200).map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyRes.json();
        });

        const stories = await Promise.all(storyPromises);

        // Get timestamp for the last 10 hours
        const tenHoursAgo = Date.now() / 1000 - 10 * 60 * 60;

        // Initialize data structure for 10-hour tracking
        const now = new Date();
        const hourlyScores = {};

        for (let i = 9; i >= 0; i--) {
            const hour = new Date(now.getTime() - i * 60 * 60 * 1000).getHours();
            hourlyScores[hour] = { name: `${hour}:00`, total: 0, count: 0 };
        }

        // Process stories
        stories.forEach((story) => {
            if (story.time >= tenHoursAgo && story.score !== undefined) {
                const postHour = new Date(story.time * 1000).getHours();

                if (hourlyScores[postHour]) {
                    hourlyScores[postHour].total += story.score;
                    hourlyScores[postHour].count += 1;
                }
            }
        });

        // Convert object to array and compute hourly averages
        const formattedData = Object.values(hourlyScores).map((entry) => ({
            name: entry.name,
            total: entry.count > 0 ? (entry.total / entry.count).toFixed(2) : 0, // Avg score per hour
        }));

        return formattedData;
    } catch (error) {
        console.error("Error fetching live scores:", error);
        return [];
    }
};
