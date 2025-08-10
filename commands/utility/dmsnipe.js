module.exports = {
    name: 'dmsnipe',
    category: 'Utility',
    description: 'Show your recently deleted DMs',
    usage: 'dmsnipe [number]',
    async execute({ message, args, client }) {
        const number = parseInt(args[0]) || 1;
        const deletedDMs = client.deletedDMs.get(message.author.id) || [];
        
        if (!deletedDMs.length) {
            return message.channel.send("No deleted DMs found.").then(m => m.delete({ timeout: 5000 }));
        }

        if (number < 1 || number > deletedDMs.length) {
            return message.channel.send(`Only ${deletedDMs.length} deleted DMs found.`).then(m => m.delete({ timeout: 5000 }));
        }

        const msg = deletedDMs[number - 1];
        let content = `**Deleted DM #${number}:**\n${msg.content || '[No content]'}\n`;
        content += `🗑️ Deleted at: ${new Date(msg.deletedTimestamp).toLocaleString()}\n`;
        content += `📅 Originally sent: ${new Date(msg.createdTimestamp).toLocaleString()}`;

        if (msg.attachments.size > 0) {
            content += "\n\n**Attachments:**\n" + msg.attachments.map(a => a.url).join('\n');
        }

        message.channel.send(content).then(m => m.delete({ timeout: 15000 }));
    }
};