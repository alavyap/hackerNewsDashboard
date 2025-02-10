export const getRecentComments = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/newcomments.json`);
        const commentIds = await response.json();

        // Fetch details for the latest 20 comments (ensuring freshness)
        const commentPromises = commentIds.slice(0, 20).map(async (id) => {
            const commentRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await commentRes.json();
        });

        const comments = await Promise.all(commentPromises);

        // Sort comments by most recent first (descending order by timestamp)
        const sortedComments = comments
            .filter((comment) => comment.text) // Ensure valid comments
            .sort((a, b) => b.time - a.time)
            .slice(0, 10);

        return sortedComments.map((comment) => ({
            id: comment.id,
            username: comment.by,
            text: comment.text.replace(/<[^>]*>?/gm, "").slice(0, 100) + "...", // Strip HTML & limit length
            postedDate: new Date(comment.time * 1000).toLocaleTimeString(),
            url: `https://news.ycombinator.com/item?id=${comment.id}`,
        }));
    } catch (error) {
        console.error("Error fetching recent comments:", error);
        return [];
    }
};
