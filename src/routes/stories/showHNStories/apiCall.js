export const getShowHNStories = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/showstories.json`);
        const storyIds = await response.json();

        // Fetch details for all stories (to sort them by score)
        const storyPromises = storyIds.map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyRes.json();
        });

        let stories = await Promise.all(storyPromises);

        // Sort stories by most upvotes (score) in descending order
        stories.sort((a, b) => b.score - a.score);

        // Paginate the sorted list
        const startIndex = (page - 1) * limit;
        const paginatedStories = stories.slice(startIndex, startIndex + limit);

        return paginatedStories.map((story) => ({
            id: story.id,
            title: story.title,
            url: story.url,
            date: new Date(story.time * 1000).toLocaleDateString(),
            score: story.score,
        }));
    } catch (error) {
        console.error("Error fetching Show HN stories:", error);
        return [];
    }
};
