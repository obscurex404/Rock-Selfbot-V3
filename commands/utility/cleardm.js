module.exports = {
    name: 'cleardm',
    category: 'Utility',
    description: 'Delete bot messages from DMs',
    usage: 'cleardm <1-100>',
    async execute({ message, args }) {
        if (!message.channel.isDMBased()) {
            return message.channel.send("❌ This command can only be used in DMs.").then(m => m.delete({ timeout: 5000 }));
        }

        const amount = parseInt(args[0]) || 1;
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.channel.send("❌ Usage: cleardm <1-100>").then(m => m.delete({ timeout: 5000 }));
        }

        let deleted = 0;
        const messages = await message.channel.messages.fetch({ limit: amount });
        
        for (const msg of messages.values()) {
            if (msg.author.id === message.client.user.id) {
                try {
                    await msg.delete();
                    deleted++;
                } catch {
                    // Ignore errors
                }
            }
        }

        message.channel.send(`✅ Cleared ${deleted} bot message(s).`).then(m => m.delete({ timeout: 5000 }));
    }
};