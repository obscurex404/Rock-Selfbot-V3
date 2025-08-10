module.exports = {
    name: 'reverse',
    category: 'Fun',
    description: 'Reverse your text message',
    async execute({ message, args }) {
        try {
            await message.delete().catch(() => {});
            
            if (!args.length) {
                return message.channel.send(`\`${message.client.prefix}reverse <message>\``).then(m => m.delete({ timeout: 5000 }));
            }
            
            const reversed = args.join(' ').split('').reverse().join('');
            await message.channel.send(reversed);
        } catch (e) {
            message.channel.send(`❌ Error: ${e}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};