const fetch = require('node-fetch');

module.exports = {
    name: 'trash',
    category: 'Fun',
    description: 'Puts a user\'s avatar in a trashcan',
    async execute({ message, args }) {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ format: 'png' });
        
        try {
            const response = await fetch(`https://nekobot.xyz/api/imagegen?type=trash&url=${avatar}`);
            const data = await response.json();
            
            if (data.success && data.message) {
                await message.channel.send(data.message);
            } else {
                await message.channel.send("❌ API returned failure.");
            }
        } catch (e) {
            await message.channel.send(`❌ Error contacting API: \`${e}\``);
        }
    }
};