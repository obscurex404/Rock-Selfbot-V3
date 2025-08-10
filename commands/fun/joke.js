const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    category: 'Fun',
    description: '😂 Get a random joke from the internet',
    async execute({ message }) {
        try {
            await message.delete().catch(() => {});
            
            const response = await fetch("https://official-joke-api.appspot.com/random_joke");
            const joke = await response.json();
            
            await message.channel.send(`**Setup:** ${joke.setup}\n**Punchline:** ${joke.punchline}`);
        } catch (e) {
            message.channel.send(`❌ Couldn't fetch a joke: ${e}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};