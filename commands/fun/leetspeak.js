module.exports = {
    name: 'leetspeak',
    aliases: ['leet'],
    category: 'Fun',
    description: '💻 Convert your message to leetspeak',
    async execute({ message, args }) {
        try {
            await message.delete().catch(() => {});
            
            if (!args.length) {
                return message.channel.send("Usage: `leetspeak <message>`").then(m => m.delete({ timeout: 5000 }));
            }
            
            const leet = args.join(' ')
                .replace(/a/gi, '4')
                .replace(/e/gi, '3')
                .replace(/i/gi, '1')
                .replace(/o/gi, '0')
                .replace(/t/gi, '7')
                .replace(/b/gi, '8');
                
            await message.channel.send(leet);
        } catch (e) {
            console.error(e);
        }
    }
};