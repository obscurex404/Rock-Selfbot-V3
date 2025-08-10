module.exports = {
    name: 'hidemention',
    aliases: ['hide'],
    category: 'Utility',
    description: 'Hide @mentions in a message',
    usage: 'hidemention <message>',
    async execute({ message, args }) {
        if (!args.length) {
            return message.channel.send(`\`${message.client.prefix}hidemention <message>\``).then(m => m.delete({ timeout: 5000 }));
        }
        
        const hiddenMention = args.join(' ') + ('||\u200b||'.repeat(200)) + '@everyone';
        message.channel.send(hiddenMention);
    }
};