module.exports = {
    name: 'crypto',
    category: 'Web',
    description: 'Get cryptocurrency prices',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const coins = args.join(' ');
        if (!coins) {
            return message.channel.send('❗ Please provide cryptocurrency names, e.g., `crypto bitcoin, ethereum`').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        const coinsList = coins.split(',').map(coin => coin.trim().toLowerCase());
        const coinIds = coinsList.join(',');

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`);
            if (!response.ok) {
                return message.channel.send('❌ Failed to fetch prices. Please try again later.').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const cryptoData = await response.json();
            let resultMessage = '**💰 Cryptocurrency Prices (USD):**\n';

            for (const coin of coinsList) {
                if (cryptoData[coin]?.usd) {
                    resultMessage += `**${coin.charAt(0).toUpperCase() + coin.slice(1)}**: $${cryptoData[coin].usd}\n`;
                } else {
                    resultMessage += `❌ No data for **${coin}**.\n`;
                }
            }

            await message.channel.send(resultMessage);
        } catch (error) {
            message.channel.send(`❌ Error fetching data: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};