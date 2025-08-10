module.exports = {
    name: 'uptime',
    category: 'Utility',
    description: 'Show how long the bot has been running',
    async execute({ message, client }) {
        try {
            await message.delete();
        } catch (error) {
            // Ignore error if message can't be deleted
        }

        const startTime = client.startTime || new Date();
        const delta = Date.now() - startTime;
        const seconds = Math.floor(delta / 1000);
        
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        const uptimeStr = `${days}d ${hours}h ${minutes}m ${secs}s`;
        await message.channel.send(`Uptime: \`${uptimeStr}\``);
    }
};