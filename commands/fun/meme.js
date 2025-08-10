const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    category: 'Fun',
    description: '🤣 Fetch a random meme from Reddit',
    async execute({ message }) {
        try {
            await message.delete().catch(() => {});
            
            const response = await fetch("https://meme-api.com/gimme");
            const meme_data = await response.json();

            const meme_url = meme_data.preview[meme_data.preview.length - 1];
            const { title, subreddit, author, ups } = meme_data;

            await message.channel.send(
                `**Meme Title:** ${title}\n` +
                `**Subreddit:** r/${subreddit}\n` +
                `**Author:** u/${author}\n` +
                `**Upvotes:** ${ups}\n\n${meme_url}`
            );
        } catch (e) {
            message.channel.send(`❌ Failed to fetch meme: ${e}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};