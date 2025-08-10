module.exports = {
    name: 'removereact',
    async execute({ message, config, saveConfig }) {
        if (message.mentions.users.size === 0) return message.channel.send("Mention a user.");
        const mention = message.mentions.users.first();
        const before = config.auto_react_users.length;
        config.auto_react_users = config.auto_react_users.filter(u => u.id !== mention.id);
        saveConfig(config);
        if (before === config.auto_react_users.length) {
            await message.channel.send("User not found in auto-react list.");
        } else {
            await message.channel.send(`Removed ${mention.username} from auto-react list.`);
        }
    }
};
