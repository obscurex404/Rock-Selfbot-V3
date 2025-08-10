module.exports = {
    name: 'userinfo',
    category: 'Utility',
    description: 'Show information about a user',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {
            // Ignore error if message can't be deleted
        }

        const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;
        const createdAt = user.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 4096 });
        
        const info = `\`\`\`js\n` +
            `Username    : ${user.tag}\n` +
            `ID          : ${user.id}\n` +
            `Created At  : ${createdAt}\n` +
            `Bot?        : ${user.bot}\n` +
            `Avatar URL  : ${avatarUrl}\n` +
            `\`\`\``;
            
        await message.channel.send(info);
    }
};