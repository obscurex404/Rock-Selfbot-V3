const fetch = require('node-fetch');

module.exports = {
    name: 'captcha',
    category: 'Fun',
    description: 'Generate a fake CAPTCHA for a user',
    async execute({ message, args }) {
        const user = message.mentions.users.first();
        
        if (!user) {
            return message.channel.send('❌ Please mention a user.');
        }

        try {
            const response = await fetch(
                `https://nekobot.xyz/api/imagegen?type=captcha&url=${user.displayAvatarURL({ format: 'png' })}&username=${user.username}`
            );
            const data = await response.json();
            
            if (!data.message) {
                throw new Error('Invalid API response');
            }
            
            await message.channel.send(data.message);
        } catch (error) {
            console.error('Captcha command error:', error);
            message.channel.send('❌ Failed to generate CAPTCHA. Please try again later.');
        }
    }
};