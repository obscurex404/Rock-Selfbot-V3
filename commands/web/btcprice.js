module.exports = {
    name: 'btcprice',
    category: 'Web',
    description: 'Get current Bitcoin price',
    async execute({ message }) {
        try {
            await message.delete();
        } catch (error) {}

        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', { timeout: 5000 });
            if (!response.ok) {
                return message.channel.send('❌ Failed to fetch Bitcoin price. Try again later.').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const btcData = await response.json();
            const btcPrice = btcData?.bitcoin?.usd;

            if (!btcPrice) {
                return message.channel.send('❌ Bitcoin price not available at the moment.').then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            await message.channel.send(`💰 **Current Bitcoin (BTC) Price:** $${btcPrice.toLocaleString()}`);
        } catch (error) {
            message.channel.send(`❌ Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};