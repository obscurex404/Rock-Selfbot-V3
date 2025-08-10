module.exports = {
    name: 'roll',
    category: 'Fun',
    description: '🎲 Roll a six-sided dice and get a random number',
    async execute({ message }) {
        const roll = Math.floor(Math.random() * 6) + 1;
        await message.channel.send(`The dice rolled: **${roll}** 🎲`);
    }
};