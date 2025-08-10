module.exports = {
    name: 'guildinfo',
    aliases: ['ginfo'],
    category: 'Utility',
    description: 'Show basic information about the server',
    async execute({ message }) {
        if (!message.guild) {
            return message.channel.send("⚠️ This command can only be used in a server.").then(m => m.delete({ timeout: 5000 }));
        }

        const guild = message.guild;
        const info = [
            `🏰 **Server Info**`,
            `**Name:** \`${guild.name}\``,
            `**ID:** \`${guild.id}\``,
            `**Created:** \`${guild.createdAt.toUTCString()}\``,
            `**Owner:** \`${guild.owner?.user.tag || 'Unknown'}\``,
            `**Members:** \`${guild.memberCount}\``,
            `**Channels:** \`${guild.channels.cache.size}\``,
            `**Roles:** \`${guild.roles.cache.size}\``,
            `**Boosts:** \`${guild.premiumSubscriptionCount || 0}\``
        ].join('\n');

        message.channel.send(info);
    }
};