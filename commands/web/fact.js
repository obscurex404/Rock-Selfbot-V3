module.exports = {
    name: 'fact',
    category: 'Web',
    description: 'Get a random fact',
    async execute({ message }) {
        try {
            await message.delete();
        } catch (error) {}

        try {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', { timeout: 5000 });
            if (!response.ok) {
                return message.channel.send('❌ Couldn\'t fetch a fact right now. Try again later.').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const data = await response.json();
            const factText = data?.text || 'No fact found.';
            await message.channel.send(`💡 **Fact:** ${factText}`);
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};