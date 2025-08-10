module.exports = {
    name: 'github',
    category: 'Web',
    description: 'Get GitHub user info',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const username = args[0];
        if (!username) {
            return message.channel.send('❗ Please provide a GitHub username').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        
        try {
            const response = await fetch(apiUrl);
            if (response.status !== 200) {
                return message.channel.send('❌ User not found').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const data = await response.json();

            const responseText = 
                `**GitHub: ${data.login || username}**\n` +
                `**Bio:** ${data.bio || 'No bio available.'}\n` +
                `**Followers:** ${data.followers || 'N/A'}\n` +
                `**Following:** ${data.following || 'N/A'}\n` +
                `**Public Repos:** ${data.public_repos || 'N/A'}\n` +
                `**Location:** ${data.location || 'N/A'}\n` +
                `**Blog:** ${data.blog || 'N/A'}\n` +
                `**Avatar:** ${data.avatar_url}\n` +
                `**Profile:** ${data.html_url || 'N/A'}`;

            await message.channel.send(responseText);
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};