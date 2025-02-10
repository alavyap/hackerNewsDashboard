export const getNewStories = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`);
        const storyIds = await response.json();

        // Paginate the story IDs
        const startIndex = (page - 1) * limit;
        const selectedIds = storyIds.slice(startIndex, startIndex + limit);

        // Fetch details for each story
        const storyPromises = selectedIds.map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyRes.json();
        });

        const stories = await Promise.all(storyPromises);

        return stories.map((story) => ({
            id: story.id,
            title: story.title,
            url: story.url,
            date: new Date(story.time * 1000).toLocaleDateString(),
            score: story.score,
        }));
    } catch (error) {
        console.error("Error fetching new stories:", error);
        return [];
    }
};
