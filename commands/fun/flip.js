module.exports = {
    name: 'flip',
    category: 'Fun',
    description: '🪙 Flip a coin and get Heads or Tails',
    async execute({ message }) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        await message.channel.send(`The coin landed on: **${result}** 🪙`);
    }
};