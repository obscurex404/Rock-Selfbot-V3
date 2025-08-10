module.exports = {
    name: 'npm',
    category: 'Web',
    description: 'Search for npm packages',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const query = args.join(' ');
        if (!query) {
            return message.channel.send('❗ Please provide a package name to search, e.g., `!npm express`').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        try {
            const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=1`;
            const response = await fetch(url, { timeout: 5000 });
            
            if (!response.ok) {
                return message.channel.send('❌ Failed to reach NPM registry. Try again later.').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const npmData = await response.json();

            if (!npmData.objects?.length) {
                return message.channel.send(`❌ No npm package found for '${query}'.`).then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const pkg = npmData.objects[0].package;
            const name = pkg.name || 'N/A';
            const description = pkg.description || 'No description available';
            const version = pkg.version || 'N/A';
            const link = pkg.links?.npm || 'N/A';

            const cleanDescription = description.length > 500 
                ? description.slice(0, 497) + '...' 
                : description;

            await message.channel.send(
                `📦 **NPM Package Search Result for:** \`${query}\`\n` +
                `**Name:** ${name}\n` +
                `**Version:** ${version}\n` +
                `**Description:** ${cleanDescription}\n` +
                `🔗 **Link:** ${link}`
            );
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};