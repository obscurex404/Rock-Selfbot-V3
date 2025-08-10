const figlet = require('figlet');
const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'ascii',
    category: 'Fun',
    description: 'Convert text to ASCII art',
    usage: 'ascii <text>',
    examples: ['ascii Hello'],
    async execute({ message, args }) {
        // Try to delete the original message
        try {
            await message.delete();
        } catch (error) {
            // Ignore if deletion fails
        }

        if (!args.length) {
            const reply = await message.channel.send(`\`${message.client.prefix}ascii <message>\``);
            await setTimeout(5000); // 5 seconds
            await reply.delete();
            return;
        }

        const text = args.join(' ');
        
        figlet.text(text, (error, art) => {
            if (error) {
                console.error('ASCII generation error:', error);
                return message.channel.send('❌ Failed to generate ASCII art.');
            }
            
            // Discord has 2000 character limit, so we truncate if needed
            if (art.length > 1990) {
                art = art.substring(0, 1990) + '...';
            }
            
            message.channel.send(`\`\`\`\n${art}\n\`\`\``);
        });
    }
};