module.exports = {
    name: 'guildrename',
    aliases: ['grename'],
    category: 'Utility',
    description: 'Rename the server (requires Manage Server permission)',
    usage: 'guildrename <new name>',
    async execute({ message, args }) {
        if (!message.guild) {
            return message.channel.send("⚠️ This command can only be used in a server.").then(m => m.delete({ timeout: 5000 }));
        }

        const newName = args.join(' ');
        if (!newName) {
            return message.channel.send("❗ Usage: `guildrename <new name>`").then(m => m.delete({ timeout: 5000 }));
        }

        if (!message.member.permissions.has('MANAGE_GUILD')) {
            return message.channel.send("🚫 You don't have permission to manage the server name.").then(m => m.delete({ timeout: 5000 }));
        }

        try {
            await message.guild.setName(newName);
            message.channel.send(`✅ Renamed the server to \`${newName}\``);
        } catch (error) {
            message.channel.send(`❌ Failed to rename server: ${error.message}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};