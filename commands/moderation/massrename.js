module.exports = {
    name: 'massrename',
    category: 'Moderation',
    description: 'Rename all non-bot members to a given nickname',
    usage: 'massrename [new_nickname]',
    permissions: ['MANAGE_NICKNAMES'],
    async execute({ message, args }) {
        const newName = args.join(' ');
        if (!newName) return message.channel.send('❌ Please provide a new nickname.');

        let renamedCount = 0;
        const guild = message.guild;

        for (const member of guild.members.cache.values()) {
            if (!member.user.bot) {
                try {
                    await member.setNickname(newName);
                    renamedCount++;
                } catch {
                    // Ignore errors
                }
            }
        }

        message.channel.send(`✅ Renamed ${renamedCount} members to "${newName}".`);
    }
};