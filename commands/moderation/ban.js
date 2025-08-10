module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Ban a specific member from the server',
    usage: 'ban @user [reason]',
    permissions: ['BAN_MEMBERS'],
    async execute({ message, args }) {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('❌ Please mention a user to ban.');

        const reason = args.slice(1).join(' ') || 'No reason provided';
        
        try {
            await member.ban({ reason });
            message.channel.send(`✅ Banned ${member.user.tag} | Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            message.channel.send(`❌ Failed to ban: ${error.message}`);
        }
    }
};