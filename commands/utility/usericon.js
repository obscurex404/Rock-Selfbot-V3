module.exports = {
    name: 'usericon',
    category: 'Utility',
    aliases: ['uicon'],
    description: 'Get a user\'s avatar',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {
            // Ignore error if message can't be deleted
        }

        const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;
        if (!user) {
            return message.channel.send(`\`${message.client.prefix}usericon <@user>\``).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 4096 });
        await message.channel.send(`${user}'s avatar:\n${avatarUrl}`);
    }
};