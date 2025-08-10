module.exports = {
    name: 'quotes',
    category: 'Web',
    description: 'Get random quotes',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const baseUrl = 'https://hindi-quotes.vercel.app/random';
        const validCats = new Set(['motivational', 'positive', 'attitude', 'love', 'sad', 'success']);
        const category = args[0]?.toLowerCase();

        const apiUrl = (category && validCats.has(category)) 
            ? `${baseUrl}/${category}` 
            : baseUrl;

        try {
            const response = await fetch(apiUrl, { timeout: 10000 });
            if (!response.ok) throw new Error('API error');
            
            const data = await response.json();
            const quoteType = data.type?.toUpperCase() || 'UNKNOWN';
            const quoteText = data.quote || 'No quote available at the moment.';

            await message.channel.send(`\`\`\`js\nTYPE: ${quoteType}\n${quoteText}\n\`\`\``);
        } catch (error) {
            message.channel.send('⚠️ Quote laane me dikkat aa gayi, zara phir try karo!').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};