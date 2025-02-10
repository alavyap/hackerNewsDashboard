export const getJobPosts = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/jobstories.json`);
        const jobIds = await response.json();

        // Paginate the job post IDs
        const startIndex = (page - 1) * limit;
        const selectedIds = jobIds.slice(startIndex, startIndex + limit);

        // Fetch details for each job post
        const jobPromises = selectedIds.map(async (id) => {
            const jobRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await jobRes.json();
        });

        const jobs = await Promise.all(jobPromises);

        return jobs.map((job) => ({
            id: job.id,
            title: job.title,
            url: job.url || `https://news.ycombinator.com/item?id=${job.id}`,
            date: new Date(job.time * 1000).toLocaleDateString(),
        }));
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return [];
    }
};
