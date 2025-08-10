const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'shutdown',
    aliases: ['logout'],
    category: 'Utility',
    description: 'Shutdown the selfbot',
    async execute({ message, client }) {
        const msg = await message.channel.send("Shutting down...");
        await setTimeout(2000);
        await msg.delete();
        client.destroy();
    }
};