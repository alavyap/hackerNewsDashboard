export const getTopStories = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`);
        const storyIds = await response.json();

        // Fetch details for the latest 50 stories (ensuring a good sample)
        const storyPromises = storyIds.slice(0, 50).map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyRes.json();
        });

        const stories = await Promise.all(storyPromises);

        // Sort stories by most upvotes (score) in descending order
        const sortedStories = stories
            .filter((story) => story.score) // Ensure valid scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        return sortedStories.map((story, index) => ({
            id: story.id,
            number: index + 1,
            name: story.title,
            publishedDate: new Date(story.time * 1000).toLocaleDateString(),
            upvotes: story.score || 0,
            url: `https://news.ycombinator.com/item?id=${story.id}`,
        }));
    } catch (error) {
        console.error("Error fetching top stories:", error);
        return [];
    }
};
