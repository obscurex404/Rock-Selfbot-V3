module.exports = {
    name: 'fakehack',
    category: 'Web',
    description: 'Fake hack a user for fun',
    async execute({ message, args }) {
        const user = message.mentions.users.first() || message.client.users.cache.get(args[0]);
        if (!user) {
            return message.channel.send('❗ Usage: `!fakehack @user` — Please mention a user.');
        }

        try {
            await message.delete();
        } catch (error) {}

        const loadingMessages = [
            '🔍 Hacking... Please wait.',
            '🔓 Bypassing security...',
            '🧠 Cracking passwords...',
            '🐍 Injecting malware...',
            '🛰 Accessing server...'
        ];
        
        for (const msg of loadingMessages) {
            await message.channel.send(msg);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const fakeEmail = `${user.username.toLowerCase()}@gmail.com`;
        const fakePassword = `${user.username.toLowerCase()}${Math.floor(1000 + Math.random() * 9000)}`;
        const createdAtStr = user.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        
        // Simulated fake token
        const userIdB64 = Buffer.from(user.id).toString('base64').replace(/=+$/, '');
        const part1 = Array.from({ length: 4 }, () => 
            Math.random().toString(36).slice(2, 3)).join('');
        const part2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const part3 = Array.from({ length: 27 }, () => 
            Math.random().toString(36).slice(2, 3)).join('');
        const fakeToken = `${userIdB64}.${part1}_${part2}.${part3}`;

        const finalMsg = 
            '```js\n' +
            `💻 ${user.tag} has been successfully hacked! 💻\n\n` +
            `Discord ID       : ${user.id}\n` +
            `Account Created  : ${createdAtStr}\n` +
            `Email            : ${fakeEmail}\n` +
            `Password         : ${fakePassword}\n` +
            `Token            : ${fakeToken}\n` +
            '```';

        await message.channel.send(finalMsg);
    }
};