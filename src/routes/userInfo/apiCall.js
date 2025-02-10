export const getHackerNewsUser = async (username) => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`);
        const data = await response.json();

        if (!data || data.error) {
            return null; // Handle case where the user does not exist
        }

        return {
            id: data.id,
            karma: data.karma,
            created: new Date(data.created * 1000).toLocaleDateString(),
            about: data.about || "No bio available",
            submitted: data.submitted ? data.submitted.length : 0, // Total submissions
        };
    } catch (error) {
        console.error("Error fetching Hacker News user:", error);
        return null;
    }
};
