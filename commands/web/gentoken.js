module.exports = {
    name: 'gentoken',
    category: 'Web',
    description: 'Generate a fake Discord token',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        function generateFakeToken() {
            const part1 = 'ODA' + String.fromCharCode(97 + Math.floor(Math.random() * 26)) + 
                Array.from({ length: 20 }, () => Math.random().toString(36).slice(2, 3)).join('');
            const part2 = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                Array.from({ length: 5 }, () => Math.random().toString(36).slice(2, 3)).join('');
            const part3 = Array.from({ length: 27 }, () => Math.random().toString(36).slice(2, 3)).join('');
            return `${part1}.${part2}.${part3}`;
        }

        const token = generateFakeToken();
        const user = args[0];

        if (user) {
            await message.channel.send(`> **${user}'s token:** ||${token}||`);
        } else {
            await message.channel.send(`> Fake Token: ||${token}||`);
        }
    }
};