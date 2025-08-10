const fs = require('fs');
const configPath = './config.json';
let listenerAdded = false;

function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours`;
    const days = Math.floor(hours / 24);
    return `${days} days`;
}

module.exports = {
    name: 'afk',
    description: 'Toggle AFK status with an optional message',
    usage: '!afk [message] or !afk off',
    async execute({ client, message, args, config }) {
        config.afk_users = config.afk_users || [];

        const subcommand = args[0]?.toLowerCase();

        // TURN OFF
        if (subcommand === 'off') {
            const index = config.afk_users.findIndex(u => u.id === message.author.id);
            if (index !== -1) {
                config.afk_users.splice(index, 1);
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
                return message.channel.send(`✅ <@${message.author.id}> you are no longer AFK.`);
            } else {
                return message.channel.send(`⚠️ You are not currently AFK.`);
            }
        }

        // TURN ON
        const afkMessage = args.length > 0 ? args.join(' ') : 'I am AFK';
        const timestamp = Date.now();

        config.afk_users = config.afk_users.filter(u => u.id !== message.author.id);
        config.afk_users.push({
            id: message.author.id,
            username: message.author.username,
            message: afkMessage,
            timestamp
        });

        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
        await message.channel.send(`⏸️ You're now AFK: ${afkMessage}`);

        // ADD LISTENER ONCE ONLY
        if (!listenerAdded) {
            listenerAdded = true;

            client.on('messageCreate', async (msg) => {
                if (msg.author.bot) return;

                const mentionedUsers = new Set();
                msg.mentions.users.forEach(user => mentionedUsers.add(user.id));

                if (msg.reference?.messageId) {
                    try {
                        const repliedMsg = await msg.channel.messages.fetch(msg.reference.messageId);
                        mentionedUsers.add(repliedMsg.author.id);
                    } catch { }
                }

                for (const id of mentionedUsers) {
                    // 🚫 Skip if the author is the AFK user
                    if (msg.author.id === id) continue;

                    const afkUser = config.afk_users.find(u => u.id === id);
                    if (afkUser) {
                        const duration = formatDuration(Date.now() - afkUser.timestamp);
                        let reply = `⏸️ <@${id}> is AFK: ${afkUser.message} (${duration} ago)`;

                        if (msg.channel.type === 'DM') {
                            reply = `⏸️ The user you messaged is AFK: ${afkUser.message} (${duration} ago)`;
                        }

                        await msg.channel.send(reply).catch(() => {});
                    }
                }
            });
        }
    }
};
