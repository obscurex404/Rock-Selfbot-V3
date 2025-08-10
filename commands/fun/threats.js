const fetch = require('node-fetch');

module.exports = {
    name: 'threats',
    category: 'Fun',
    description: 'Fake threatening message image',
    async execute({ message, args }) {
        const user = message.mentions.users.first() || message.author;
        const msg = await message.channel.send("⏳ Generating image, please wait...");
        
        try {
            const avatar = user.displayAvatarURL({ format: 'png' });
            const response = await fetch(`https://nekobot.xyz/api/imagegen?type=threats&url=${avatar}`);
            const data = await response.json();
            
            if (data.message && data.message.startsWith('http')) {
                await msg.edit(data.message);
            } else {
                await msg.edit("❌ Invalid response from API.");
            }
        } catch (e) {
            await msg.edit(`❌ Error: ${e}`);
        }
    }
};