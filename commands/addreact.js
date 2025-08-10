module.exports = {
    name: 'addreact',
    description: 'Add auto-reaction to a user\'s messages',
    usage: 'addreact @user <emoji>',
    async execute({ message, args, config, saveConfig }) {
        // Check if user was mentioned
        if (message.mentions.users.size === 0) {
            return message.channel.send("❌ Please mention a user to add reactions to.\nExample: `addreact @user 👍`")
                .then(msg => msg.delete({ timeout: 5000 }))
                .catch(() => {});
        }

        const mention = message.mentions.users.first();
        
        // Check if emoji was provided
        if (args.length < 2) {
            return message.channel.send("❌ Please provide an emoji to react with.\nExample: `addreact @user 👍`")
                .then(msg => msg.delete({ timeout: 5000 }))
                .catch(() => {});
        }

        const emoji = args[args.length - 1];
        
        // Validate emoji format
        const emojiRegex = /^<a?:.+?:\d+>$/;
        const unicodeEmojiRegex = /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]$/u;
        
        if (!emojiRegex.test(emoji) && !unicodeEmojiRegex.test(emoji)) {
            return message.channel.send("❌ Invalid emoji format. Please use a standard emoji or custom server emoji.")
                .then(msg => msg.delete({ timeout: 5000 }))
                .catch(() => {});
        }

        // Check if user already exists in config
        const existingUserIndex = config.auto_react_users.findIndex(u => u.id === mention.id);
        
        if (existingUserIndex !== -1) {
            const currentEmoji = config.auto_react_users[existingUserIndex].emoji;
            return message.channel.send(`ℹ️ ${mention.username} already has auto-reactions (${currentEmoji}). Use \`removereact @user\` first.`)
                .then(msg => msg.delete({ timeout: 5000 }))
                .catch(() => {});
        }

        // Add to config and save
        config.auto_react_users.push({ 
            id: mention.id, 
            username: mention.username,
            emoji: emoji,
            addedBy: message.author.id,
            dateAdded: new Date().toISOString()
        });
        
        saveConfig(config);

        // Send success message
        await message.channel.send(`✅ Now automatically reacting to ${mention.username}'s messages with ${emoji}`)
            .then(msg => msg.delete({ timeout: 5000 }))
            .catch(() => {});
    }
};