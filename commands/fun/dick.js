module.exports = {
    name: 'dick',
    category: 'Fun',
    description: '🍆 Shows a humorous randomly sized "dick" for a user',
    async execute({ message, args }) {
        try {
            await message.delete().catch(() => {});
            
            const user = message.mentions.users.first() || message.author;
            const size = Math.floor(Math.random() * 15) + 1;
            await message.channel.send(`**${user.username}**'s Dick size\n8${'='.repeat(size)}D`);
        } catch (e) {
            console.error(e);
        }
    }
};