module.exports = {
    name: 'hypesquad',
    aliases: ['hs'],
    category: 'Utility',
    description: 'Change your HypeSquad house',
    usage: 'hypesquad <balance|brilliance|bravery>',
    async execute({ message, args }) {
        const house = args[0]?.toLowerCase();
        const houses = {
            bravery: 1,
            brilliance: 2,
            balance: 3
        };
        
        if (!house || !houses[house]) {
            return message.channel.send([
                '❌ Invalid input',
                'Usage: `hypesquad <balance|brilliance|bravery>`',
                'Example: `hypesquad bravery`'
            ].join('\n')).then(m => m.delete({ timeout: 5000 }));
        }
        
        try {
            await message.client.api.hypesquadOnline.post({
                data: { house_id: houses[house] }
            });
            message.channel.send(`✅ Hypesquad House changed to \`${house}\`!`);
        } catch (error) {
            message.channel.send(`❌ Failed to change Hypesquad house: ${error.message}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};