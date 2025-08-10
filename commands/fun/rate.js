// Note: You'll need to implement your own ratings database system
// This is a simplified version without database persistence

module.exports = {
    name: 'rate',
    category: 'Fun',
    description: 'Rate a user in various categories',
    usage: 'rate <category> <@user>',
    examples: ['rate gay @User', 'rate smart @User'],
    async execute({ message, args }) {
        const validCategories = {
            "good": "👍 Good",
            "bad": "👎 Bad", 
            "gay": "🌈 Gay",
            "gamer": "🎮 Gamer",
            "simp": "😍 Simp",
            "smart": "🧠 Smart",
            "funny": "😂 Funny"
        };

        // Get category and user
        const category = args[0]?.toLowerCase();
        const member = message.mentions.members.first();

        // Validate input
        if (!category || !validCategories[category] || !member) {
            const categoriesList = Object.keys(validCategories).join('/');
            return message.channel.send(
                `❌ Invalid format! Use: \`${message.client.prefix}rate [${categoriesList}] @user\`\n` +
                `Example: \`${message.client.prefix}rate gay @${message.author.username}\``
            );
        }

        // Generate random rating (in a real implementation, you'd store this)
        const rating = Math.floor(Math.random() * 100) + 1;
        const displayCategory = validCategories[category];

        // Build response
        let response = 
            `**${member.displayName}'s ${displayCategory} Rating**\n` +
            '```\n' +
            '╔══════════════════════╗\n' +
            '║                      ║\n' +
            `║       ${rating.toString().padStart(3, ' ')}/100        ║\n` +
            '║                      ║\n' +
            '╚══════════════════════╝\n' +
            '```';

        // Add comment based on rating
        if (rating < 20) {
            response += '\n*Yikes... that\'s rough* 😬';
        } else if (rating > 90) {
            response += '\n*Now that\'s impressive!* 🏆';
        }

        await message.channel.send(response);
    }
};