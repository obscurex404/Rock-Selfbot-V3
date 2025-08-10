const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'abc',
    category: 'Fun',
    description: 'Send the alphabet in a message',
    async execute({ message }) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let msg = await message.channel.send('A');
        
        for (let i = 1; i < alphabet.length; i++) {
            await setTimeout(1000); // 1 second delay
            await msg.edit(msg.content + alphabet[i]);
        }
    }
};