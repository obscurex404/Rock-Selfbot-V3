module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kick a specific member from the server',
    usage: 'kick @user [reason]',
    permissions: ['KICK_MEMBERS'],
    async execute({ message, args }) {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('❌ Please mention a user to kick.');

        const reason = args.slice(1).join(' ') || 'No reason provided';
        
        try {
            await member.kick(reason);
            message.channel.send(`✅ Kicked ${member.user.tag} | Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            message.channel.send(`❌ Failed to kick: ${error.message}`);
        }
    }
};