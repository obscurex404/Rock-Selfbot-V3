module.exports = {
    name: 'kickall',
    category: 'Moderation',
    description: 'Kicks all non-bot members from the server',
    permissions: ['KICK_MEMBERS'],
    async execute({ message }) {
        const guild = message.guild;
        let kickedCount = 0;
        const failed = [];

        for (const member of guild.members.cache.values()) {
            if (!member.user.bot && member.id !== message.author.id && member.id !== guild.ownerId) {
                try {
                    await member.kick('Kicked by kickall command');
                    kickedCount++;
                } catch {
                    failed.push(member.user.tag);
                }
            }
        }

        let reply = `✅ Kicked ${kickedCount} members.`;
        if (failed.length > 0) {
            reply += `\n❌ Failed to kick ${failed.length} members.`;
        }
        message.channel.send(reply);
    }
};