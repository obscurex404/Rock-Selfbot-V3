module.exports = {
    name: 'firstmessage',
    category: 'Utility',
    description: 'Get the first message in the current channel',
    async execute({ message }) {
        try {
            const messages = await message.channel.messages.fetch({ limit: 1, after: '1' });
            const firstMessage = messages.first();
            
            if (!firstMessage) {
                return message.channel.send("❌ Could not find the first message.");
            }

            const link = `https://discord.com/channels/${message.guild?.id || '@me'}/${message.channel.id}/${firstMessage.id}`;
            message.channel.send(`📩 First message: ${link}`).then(m => m.delete({ timeout: 5000 }));
        } catch {
            message.channel.send("❌ Failed to fetch the first message.").then(m => m.delete({ timeout: 5000 }));
        }
    }
};