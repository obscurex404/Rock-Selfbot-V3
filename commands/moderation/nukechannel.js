module.exports = {
    name: 'nukechannel',
    category: 'Moderation',
    description: 'Delete and recreate the current channel to clear all messages',
    permissions: ['MANAGE_CHANNELS'],
    async execute({ message }) {
        const channel = message.channel;
        const channelData = {
            name: channel.name,
            position: channel.position,
            parent: channel.parent,
            permissionOverwrites: channel.permissionOverwrites.cache,
            topic: channel.topic,
            nsfw: channel.nsfw,
            rateLimitPerUser: channel.rateLimitPerUser,
            reason: `Channel nuked by ${message.author.tag}`
        };

        try {
            await channel.delete();
            const newChannel = await message.guild.channels.create(channelData.name, channelData);
            newChannel.send(`💥 Channel was nuked by ${message.author}\nAll messages have been cleared!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`❌ Failed to nuke channel: ${error.message}`);
        }
    }
};