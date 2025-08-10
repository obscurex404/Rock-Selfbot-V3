module.exports = {
    name: 'advice',
    category: 'Web',
    description: 'Get random advice',
    async execute({ message }) {
        try {
            await message.delete();
        } catch (error) {}

        try {
            const response = await fetch('https://api.adviceslip.com/advice', { timeout: 5000 });
            if (!response.ok) {
                return message.channel.send('❌ Couldn\'t fetch advice. Try again later.').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const data = await response.json();
            const advice = data?.slip?.advice || 'No advice available at the moment.';
            await message.channel.send(`💡 **Advice:** ${advice}`);
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};