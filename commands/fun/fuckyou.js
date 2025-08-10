const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'fuckyou',
    category: 'Fun',
    description: 'Send animated "fuck you" message',
    async execute({ message }) {
        const msg = await message.channel.send("F");
        const words = ["FU", "FUC", "FUCK", "FUCK Y", "FUCK YO", "FUCK YOU"];
        
        for (const word of words) {
            await setTimeout(500);
            await msg.edit(word);
        }
    }
};