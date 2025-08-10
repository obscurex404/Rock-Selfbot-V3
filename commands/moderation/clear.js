module.exports = {
    name: 'clear',
    category: 'Moderation',
    description: 'Delete your own recent messages in this channel (max 100)',
    usage: 'clear <amount>',
    permissions: [],
    async execute({ message, args }) {
        let amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1) {
            return message.channel.send('❌ Please provide a valid number of messages to delete.');
        }

        if (amount > 100) amount = 100;

        try {
            // Fetch the last 100 messages from the channel
            const fetched = await message.channel.messages.fetch({ limit: 100 });

            // Filter only the user's messages
            const userMessages = fetched.filter(msg => msg.author.id === message.author.id).first(amount);

            if (userMessages.length === 0) {
                return message.channel.send('⚠️ No messages found to delete.');
            }

            // Delete each message
            for (const msg of userMessages) {
                await msg.delete().catch(() => {});
            }

            // Confirmation
            const confirmMsg = await message.channel.send(`🗑️ Deleted ${userMessages.length} of your messages.`);
            setTimeout(() => confirmMsg.delete().catch(() => {}), 3000);

        } catch (error) {
            console.error(error);
            message.channel.send(`❌ Failed to delete messages: ${error.message}`);
        }
    }
};
