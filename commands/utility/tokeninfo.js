module.exports = {
    name: 'tokeninfo',
    category: 'Utility',
    aliases: ['tinfo'],
    description: 'Get info about a Discord token',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {
            // Ignore error if message can't be deleted
        }

        const usertoken = args[0];
        if (!usertoken) {
            return message.channel.send(`\`${message.client.prefix}tokeninfo <token>\``).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        const headers = {
            'Authorization': usertoken,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch('https://discord.com/api/v9/users/@me', { headers });
            if (!response.ok) throw new Error('Invalid token or API issue');
            
            const userData = await response.json();
            const username = `${userData.username}#${userData.discriminator}`;
            const userId = userData.id;
            const avatarUrl = userData.avatar 
                ? `https://cdn.discordapp.com/avatars/${userId}/${userData.avatar}.png` 
                : 'No avatar';
            const email = userData.email || 'Not provided';
            const mfaEnabled = userData.mfa_enabled || false;
            const timestamp = ((BigInt(userId) >> 22n) + 1420070400000n) / 1000n;
            const createdAt = new Date(Number(timestamp) * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');

            const info = `**Token Info**\n` +
                `Username: \`${username}\`\n` +
                `User ID: \`${userId}\`\n` +
                `Created: \`${createdAt}\`\n` +
                `Avatar: ${avatarUrl}\n` +
                `Email: \`${email}\`\n` +
                `2FA Enabled: \`${mfaEnabled}\``;
                
            await message.channel.send(info);
        } catch (error) {
            message.channel.send(`Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};