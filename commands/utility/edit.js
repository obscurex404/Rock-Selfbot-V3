module.exports = {
    name: 'edit',
    category: 'Utility',
    description: 'Edit a message to include RTL character',
    usage: 'edit <message>',
    async execute({ message, args }) {
        if (!args.length) {
            return message.channel.send(`\`${message.client.prefix}edit <message>\``).then(m => m.delete({ timeout: 5000 }));
        }

        const text = await message.channel.send(args.join(' '));
        await text.edit(`\u202b${args.join(' ')}`);
    }
};