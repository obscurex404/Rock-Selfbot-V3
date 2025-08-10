
const fs = require('fs');
const configPath = './config.json';

module.exports = {
    name: 'setauto',
    async execute({ message, args, config }) {
        const key = args[0];
        const value = args.slice(1).join(' ');

        if (!key || !value) {
            return message.channel.send('Usage: .setauto <keyword> <response>');
        }

        config.autoresponders = config.autoresponders || {};
        config.autoresponders[key] = value;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
        const sent = await message.channel.send(`Auto-response set for **${key}** ✅`);

        setTimeout(() => {
            message.delete().catch(() => {});
            sent.delete().catch(() => {});
        }, 5000);
    }
};
