const fetch = require('node-fetch');

module.exports = {
    name: 'neko',
    category: 'Fun',
    description: 'Sends a fun neko response',
    async execute({ message }) {
        try {
            await message.delete().catch(() => {});
            
            const response = await fetch("https://nekobot.xyz/api/image?type=neko");
            const data = await response.json();
            await message.channel.send(data.message);
        } catch (e) {
            message.channel.send(`❌ Failed to fetch content.\n\`${e}\``).then(m => m.delete({ timeout: 10000 }));
        }
    }
};