module.exports = {
    name: 'webhook',
    category: 'Web',
    description: 'Send messages to a webhook URL',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const webhookUrl = args[0];
        if (!webhookUrl) {
            return message.channel.send(
                '❗ Please provide a valid webhook URL, e.g., `!webhook <webhook_url> 10 <message>`'
            ).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        let count = 10;
        let messageText = 'Spamming...';

        // Parse count if provided
        if (args[1] && !isNaN(args[1])) {
            count = parseInt(args[1]);
            messageText = args.slice(2).join(' ') || 'Spamming...';
        } else {
            messageText = args.slice(1).join(' ') || 'Spamming...';
        }

        // Limit count to avoid abuse
        if (count > 20) {
            return message.channel.send('⚠️ Maximum count is 20 to avoid spam.').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        for (let i = 0; i < count; i++) {
            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: messageText })
                });

                if (response.status === 204) {
                    console.log(`Message ${i+1}/${count} sent successfully.`);
                } else {
                    console.log(`Failed to send message ${i+1}/${count}: HTTP ${response.status}`);
                }
            } catch (error) {
                console.log(`Error sending message ${i+1}/${count}: ${error.message}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};