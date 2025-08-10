module.exports = {
    name: 'whremove',
    category: 'Utility',
    description: 'Delete a webhook',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {
            // Ignore error if message can't be deleted
        }

        const webhook = args[0];
        if (!webhook) {
            return message.channel.send(`\`${message.client.prefix}whremove <webhook>\``).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        try {
            const response = await fetch(webhook, { 
                method: 'DELETE',
                timeout: 5000
            });

            if (response.status === 204) {
                await message.channel.send(`✅ Successfully deleted webhook: \`${webhook}\``).then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            } else {
                const text = await response.text();
                await message.channel.send(
                    `⚠️ Failed to delete webhook!\n` +
                    `Status Code: \`${response.status}\`\n` +
                    `Response: \`${text}\``
                ).then(msg => {
                    setTimeout(() => msg.delete(), 10000);
                });
            }
        } catch (error) {
            await message.channel.send(`❌ Error deleting webhook!\n\`${error.message}\``).then(msg => {
                setTimeout(() => msg.delete(), 10000);
            });
        }
    }
};