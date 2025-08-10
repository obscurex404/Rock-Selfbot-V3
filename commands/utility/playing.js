module.exports = {
    name: 'playing',
    async execute({ client, message, args }) {
        if (args.length === 0) return message.channel.send("Usage: playing <text>");
        const status = args.join(" ");
        client.user.setPresence({ activities: [{ name: status, type: "PLAYING" }] });
        await message.channel.send(`Now playing: \`${status}\``);
    }
};
