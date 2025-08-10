module.exports = {
    name: 'timeout',
    aliases: ['mute'],
    category: 'Moderation',
    description: 'Timeout a member for a specified duration',
    usage: 'timeout @member <duration> [reason]',
    permissions: ['MODERATE_MEMBERS'],
    async execute({ message, args }) {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('❌ Please mention a member to timeout.');

        const duration = args[1];
        if (!duration) return message.channel.send('❌ Please specify a duration (e.g., 30m, 1h, 2d)');

        const reason = args.slice(2).join(' ') || 'No reason provided';

        try {
            const time = parseDuration(duration);
            if (!time) throw new Error('Invalid duration format (use s/m/h/d)');
            if (time > 2419200000) throw new Error('Timeout cannot exceed 28 days');

            await member.timeout(time, reason);
            message.channel.send(`✅ ${member.user.tag} has been timed out for ${formatDuration(time)} | Reason: ${reason}`);
        } catch (error) {
            message.channel.send(`❌ Failed to timeout: ${error.message}`);
        }
    }
};

function parseDuration(duration) {
    const match = duration.match(/^(\d+)([smhd])$/i);
    if (!match) return null;

    const amount = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
        case 's': return amount * 1000;
        case 'm': return amount * 60 * 1000;
        case 'h': return amount * 60 * 60 * 1000;
        case 'd': return amount * 24 * 60 * 60 * 1000;
        default: return null;
    }
}

function formatDuration(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.join(' ') || '0s';
}