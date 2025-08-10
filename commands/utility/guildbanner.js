module.exports = {
    name: 'guildbanner',
    aliases: ['gbanner'],
    category: 'Utility',
    description: "Show the server's banner image",
    async execute({ message }) {
        if (!message.guild) {
            return message.channel.send("⚠️ This command can only be used in a server.").then(m => m.delete({ timeout: 5000 }));
        }

        const banner = message.guild.bannerURL({ size: 4096 });
        if (banner) {
            message.channel.send(`🖼️ **${message.guild.name}** banner:\n${banner}`);
        } else {
            message.channel.send(`ℹ️ **${message.guild.name}** has no banner set.`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};