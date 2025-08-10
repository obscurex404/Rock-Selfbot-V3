module.exports = {
    name: 'massrenamechannels',
    category: 'Moderation',
    description: 'Rename all channels in the server',
    usage: 'massrenamechannels [new_name]',
    permissions: ['MANAGE_CHANNELS'],
    async execute({ message, args }) {
        const newName = args.join(' ');
        if (!newName) return message.channel.send('❌ Please provide a new channel name.');

        let renamedCount = 0;
        const guild = message.guild;

        for (const channel of guild.channels.cache.values()) {
            try {
                await channel.setName(newName);
                renamedCount++;
            } catch {
                // Ignore errors
            }
        }

        message.channel.send(`✅ Renamed ${renamedCount} channels to "${newName}".`);
    }
};