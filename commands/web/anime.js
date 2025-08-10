module.exports = {
    name: 'anime',
    category: 'Web',
    description: 'Search for anime information',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const query = args.join(' ');
        if (!query) {
            return message.channel.send('❗ Please provide an anime name to search, e.g., `!anime Naruto`').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        try {
            const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`;
            const response = await fetch(apiUrl);
            const animeData = await response.json();

            if (response.status !== 200 || !animeData?.data?.length) {
                return message.channel.send(`No anime found for '${query}'.`).then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const anime = animeData.data[0];
            const title = anime.title || 'N/A';
            const synopsis = anime.synopsis || 'No synopsis available';
            const imageUrl = anime.images?.jpg?.image_url || '';
            const score = anime.score || 'No score available';
            const animeUrl = anime.url || '#';

            const responseText = 
                `**Anime Search: ${title}**\n` +
                `**Score:** ${score}\n` +
                `**Synopsis:** ${synopsis.slice(0, 500)}${synopsis.length > 500 ? '...' : ''}\n` +
                `**Image:** ${imageUrl}\n` +
                `**More Info:** ${animeUrl}`;

            await message.channel.send(responseText);
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};