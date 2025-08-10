module.exports = {
    name: 'editsnipe',
    category: 'Utility',
    description: 'Show recently edited messages in this channel',
    usage: 'editsnipe [number]',
    async execute({ message, args, client }) {
        const number = parseInt(args[0]) || 1;
        const channelEdits = client.editedMessages.get(message.channel.id) || [];
        
        if (!channelEdits.length) {
            return message.channel.send("No edited messages found.").then(m => m.delete({ timeout: 5000 }));
        }

        if (number < 1 || number > channelEdits.length) {
            return message.channel.send(`Only ${channelEdits.length} edited messages found.`).then(m => m.delete({ timeout: 5000 }));
        }

        const edit = channelEdits[number - 1];
        const author = message.guild?.members.cache.get(edit.authorId) || { user: { tag: edit.authorTag } };

        let content = `**Edited message #${number} from ${author.user.tag}:**\n`;
        content += `**Before:** ${edit.beforeContent || '[No content]'}\n`;
        content += `**After:** ${edit.afterContent || '[No content]'}\n`;
        content += `✏️ Edited at: ${new Date(edit.editedTimestamp).toLocaleString()}\n`;
        content += `📅 Originally sent: ${new Date(edit.createdTimestamp).toLocaleString()}`;

        if (edit.attachments?.length) {
            content += "\n\n**Attachments:**\n" + edit.attachments.join('\n');
        }

        message.channel.send(content).then(m => m.delete({ timeout: 15000 }));
    }
};