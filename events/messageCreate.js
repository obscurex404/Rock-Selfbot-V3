const fs = require('fs');
const configPath = './config.json';

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        // Avoid reloading config every message unless necessary
        if (!client.config) client.loadConfig();
        const config = client.config;

        // Ignore invalid authors or bot messages
        if (!message.author || message.author.bot) return;

        const authorId = message.author.id;
        const content = message.content.trim();
        const isAllowedUser = config?.allowed_users?.includes(authorId);

        // --- Auto-react logic
        if (authorId !== client.user.id && Array.isArray(config?.auto_react_users)) {
            for (const entry of config.auto_react_users) {
                if (authorId === entry.id) {
                    try {
                        await message.react(entry.emoji);
                        console.log(`[REACT] Reacted to ${message.author.username} (${authorId}) with ${entry.emoji}`);
                    } catch (err) {
                        console.error(`[ERROR] Reacting to ${message.author.username}: ${err.message}`);
                    }
                }
            }
        }

        // --- Copycat logic
        if (Array.isArray(config?.copycat_users) &&
            config.copycat_users.includes(authorId) &&
            authorId !== client.user.id
        ) {
            try {
                await message.channel.send({
                    content,
                    reply: { messageReference: message.id }
                });
                console.log(`[COPYCAT] Replied to ${message.author.username}: ${content}`);
            } catch (err) {
                console.error(`[ERROR] Copycat for ${message.author.username}: ${err.message}`);
            }
        }

        // --- Autoresponder (plain message)
        if (config?.autoresponders && config.autoresponders[content]) {
            await message.channel.send(config.autoresponders[content]);
            setTimeout(() => message.delete().catch(() => {}), 500);
            return;
        }

        if (!isAllowedUser) return;

        // --- Command parsing (prefix optional)
        const isPrefixed = config?.prefix && content.startsWith(config.prefix);
        const parts = isPrefixed
            ? content.slice(config.prefix.length).trim().split(/\s+/)
            : content.split(/\s+/);

        const commandName = parts.shift()?.toLowerCase();
        const args = parts;

        // --- Built-in command: setauto
        if (commandName === 'setauto') {
            const key = args[0];
            const value = args.slice(1).join(' ');

            if (!key || !value) {
                return message.channel.send(`Usage: ${config.prefix || '.'}setauto <keyword> <response>`);
            }

            config.autoresponders = config.autoresponders || {};
            config.autoresponders[key] = value;

            try {
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
                console.log(`[CONFIG] Auto-response set by ${message.author.tag} (${authorId}) for "${key}"`);
            } catch (err) {
                console.error(`[ERROR] Saving config: ${err.message}`);
                return message.channel.send(`❌ Failed to save config: ${err.message}`);
            }

            return message.channel.send(`✅ Auto-response set for **${key}**`);
        }

        // --- Command execution
        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute({
                client,
                message,
                args,
                config,
                saveConfig: client.saveConfig
            });
            console.log(`[COMMAND] ${commandName} executed by ${message.author.tag} (${authorId})`);
        } catch (err) {
            console.error(`[ERROR] Command '${commandName}': ${err.stack || err.message}`);
            message.channel.send(`❌ Error: ${err.message}`);
        }
    }
};
