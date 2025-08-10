const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'spam',
    category: 'Moderation',
    description: 'Spam a message multiple times (1-9)',
    usage: 'spam <amount> <message>',
    async execute({ message, args }) {
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 9) {
            return message.channel.send('❌ Amount must be between 1 and 9.').then(m => m.delete({ timeout: 3000 }));
        }

        const msg = args.slice(1).join(' ');
        if (!msg) return message.channel.send('❌ Please provide a message to spam.');

        for (let i = 0; i < amount; i++) {
            await message.channel.send(msg);
            await setTimeout(100); // 0.1 second delay
        }
    }
};