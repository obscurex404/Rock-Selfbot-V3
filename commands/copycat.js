const fs = require('fs');
const configPath = './config.json';

module.exports = {
    name: 'copycat',
    async execute({ message, args, config }) {
        if (!args[0]) {
            return message.channel.send("Usage: !copycat <user_id> OR !copycat stop <user_id>");
        }

        const subcommand = args[0].toLowerCase();
        config.copycat_users = config.copycat_users || [];

        if (subcommand === 'stop') {
            const userId = args[1]?.replace(/[<@!>]/g, '');
            if (!userId) return message.channel.send("Please specify a user to stop copying.");
            
            const index = config.copycat_users.indexOf(userId);
            if (index !== -1) {
                config.copycat_users.splice(index, 1);
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
                return message.channel.send(`❌ Stopped copying <@${userId}>`);
            } else {
                return message.channel.send(`⚠️ <@${userId}> was not being copied.`);
            }
        } else {
            const userId = subcommand.replace(/[<@!>]/g, '');
            const index = config.copycat_users.indexOf(userId);

            if (index === -1) {
                config.copycat_users.push(userId);
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
                return message.channel.send(`🔁 Now copying messages from <@${userId}>`);
            } else {
                config.copycat_users.splice(index, 1);
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
                return message.channel.send(`❌ Stopped copying <@${userId}>`);
            }
        }
    }
};
