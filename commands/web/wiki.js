module.exports = {
    name: 'wiki',
    category: 'Web',
    description: 'Search Wikipedia',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const query = args.join(' ');
        if (!query) {
            return message.channel.send('❗ Please provide a topic to search, e.g., `!wiki Python`').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        try {
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
            const response = await fetch(url);

            if (response.status !== 200) {
                return message.channel.send(`❌ No information found for '${query}'.`).then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const wikiData = await response.json();
            const title = wikiData.title || 'N/A';
            const description = wikiData.extract || 'No description available.';
            const pageUrl = wikiData.content_urls?.desktop?.page || 'N/A';

            await message.channel.send(
                `**Wikipedia Summary for '${title}':**\n` +
                `**Description:** ${description}\n` +
                `**Link:** ${pageUrl}`
            );
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};