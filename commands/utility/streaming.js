module.exports = {
    name: 'streaming',
    async execute({ client, message, args }) {
        if (args.length === 0) return message.channel.send("Usage: streaming <text>");
        const status = args.join(" ");
        client.user.setPresence({
            activities: [{
                name: status,
                type: "STREAMING",
                url: "https://twitch.tv/discord"
            }]
        });
        await message.channel.send(`Now streaming: \`${status}\``);
    }
};
