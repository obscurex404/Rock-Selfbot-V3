module.exports = {
    name: 'eightball',
    category: 'Fun',
    description: '🎱 Ask the magic 8-ball a question and get a random answer',
    async execute({ message, args }) {
        if (!args.length) {
            return message.channel.send("Ask a question, and I'll give you an answer!").then(m => m.delete({ timeout: 5000 }));
        }

        const responses = [
            "Yes", "No", "Maybe", "Definitely", "Ask again later",
            "Absolutely not", "Without a doubt", "Cannot predict now", "Don't count on it", "Yes, but be careful"
        ];

        const answer = responses[Math.floor(Math.random() * responses.length)];
        await message.channel.send(`**Question:** ${args.join(' ')}\n**Answer:** ${answer} 🎱`);
    }
};