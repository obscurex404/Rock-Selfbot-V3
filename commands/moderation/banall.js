module.exports = {
    name: 'banall',
    category: 'Moderation', 
    description: 'Bans all non-bot members from the server',
    permissions: ['BAN_MEMBERS'],
    async execute({ message }) {
        const guild = message.guild;
        let bannedCount = 0;
        const failed = [];

        for (const member of guild.members.cache.values()) {
            if (!member.user.bot && member.id !== message.author.id && member.id !== guild.ownerId) {
                try {
                    await member.ban({ reason: 'Banned by banall command' });
                    bannedCount++;
                } catch {
                    failed.push(member.user.tag);
                }
            }
        }

        let reply = `✅ Banned ${bannedCount} members.`;
        if (failed.length > 0) {
            reply += `\n❌ Failed to ban ${failed.length} members.`;
        }
        message.channel.send(reply);
    }
};