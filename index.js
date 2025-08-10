const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = 'config.json';

// --- Config Loader ---
function loadConfig() {
    try {
        const data = JSON.parse(fs.readFileSync(CONFIG_FILE));
        if (!data.autoresponders) data.autoresponders = {};
        return data;
    } catch (err) {
        console.error("Failed to load config.json:", err);
        process.exit(1);
    }
}

function saveConfig(config) {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 4));
    } catch (err) {
        console.error("Failed to save config.json:", err);
    }
}

// --- Client Setup ---
const config = loadConfig();
const client = new Client();
client.commands = new Collection();
client.config = config;
client.saveConfig = () => saveConfig(client.config);
client.loadConfig = () => { client.config = loadConfig(); };

// --- Command Loader (with subfolder support) ---
function loadCommands(dir, category = 'Root') {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name); // absolute path

        if (file.isDirectory()) {
            // Folder name becomes category (capitalize first letter)
            const subCategory = file.name.charAt(0).toUpperCase() + file.name.slice(1);
            loadCommands(fullPath, subCategory);
        } else if (file.name.endsWith('.js')) {
            try {
                const command = require(fullPath);
                command.category = category; // store category for help.js
                client.commands.set(command.name, command);
            } catch (err) {
                console.error(`[ERROR] Failed to load command ${file.name}: ${err.message}`);
            }
        }
    }
}

// ✅ Load all commands recursively
loadCommands(path.join(__dirname, 'commands'));

// --- Event Loader ---
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    try {
        const event = require(path.join(__dirname, 'events', file));
        client.on(event.name, (...args) => event.execute(client, ...args));
    } catch (err) {
        console.error(`[ERROR] Failed to load event ${file}: ${err.message}`);
    }
}

// --- Ready Event ---
client.on('ready', () => {
    console.log(`[READY] Logged in as ${client.user.username} (${client.user.id})`);
});

// --- Login ---
client.login(config.token).catch(err => {
    console.error("[ERROR] Login failed:", err.message);
    process.exit(1);
});
