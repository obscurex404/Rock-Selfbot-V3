module.exports = {
    name: 'guildicon',
    aliases: ['gicon'],
    category: 'Utility',
    description: "Show the server's icon",
    async execute({ message }) {
        if (!message.guild) {
            return message.channel.send("⚠️ This command can only be used in a server.").then(m => m.delete({ timeout: 5000 }));
        }

        const icon = message.guild.iconURL({ size: 4096 });
        if (icon) {
            message.channel.send(`🖼️ **${message.guild.name}** icon:\n${icon}`);
        } else {
            message.channel.send(`ℹ️ **${message.guild.name}** has no icon set.`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};