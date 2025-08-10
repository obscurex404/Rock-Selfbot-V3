module.exports = {
    name: 'love',
    category: 'Fun',
    description: '❤️ Calculate love compatibility between two users',
    async execute({ message, args }) {
        try {
            await message.delete().catch(() => {});
            
            const users = message.mentions.users;
            if (!users.size) {
                return message.channel.send("❗ Please mention at least one user to calculate love percentage!").then(m => m.delete({ timeout: 5000 }));
            }
            
            const user1 = users.first();
            const user2 = users.size > 1 ? users.last() : message.author;
            const percentage = Math.floor(Math.random() * 101);
            
            await message.channel.send(`❤️ **${user1.username}** and **${user2.username}** have a ${percentage}% love compatibility!`);
        } catch (e) {
            console.error(e);
        }
    }
};