module.exports = {
    name: 'sendall',
    category: 'Moderation',
    description: 'Send a message to all text channels',
    usage: 'sendall <message>',
    async execute({ message, args }) {
        const msg = args.join(' ');
        if (!msg) return message.channel.send('❌ Please provide a message to send.');

        let success = 0;
        for (const channel of message.guild.channels.cache.values()) {
            if (channel.type === 'GUILD_TEXT') {
                try {
                    await channel.send(msg);
                    success++;
                } catch {
                    // Ignore errors
                }
            }
        }

        message.channel.send(`📢 Message sent to ${success} channel(s).`);
    }
};