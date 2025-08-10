module.exports = {
    name: 'nitro',
    category: 'Fun',
    description: 'Generate a fake Discord Nitro gift link',
    async execute({ message }) {
        try {
            await message.delete().catch(() => {});
            
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const code = Array.from({ length: 16 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
            await message.channel.send(`https://discord.gift/${code}`);
        } catch (e) {
            message.channel.send(`❌ Error: ${e}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};