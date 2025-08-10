module.exports = {
    name: 'stopactivity',
    aliases: ['stopstreaming', 'stopstatus', 'stoplistening', 'stopplaying', 'stopwatching'],
    category: 'Utility',
    description: 'Stop any current activity and set status to DND',
    async execute({ message, client }) {
        client.user.setActivity(null);
        client.user.setStatus('dnd');
        message.channel.send("🛑 Activity stopped, status set to Do Not Disturb.").then(m => m.delete({ timeout: 5000 }));
    }
};