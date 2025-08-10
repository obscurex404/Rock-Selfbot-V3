const path = require("path");
const fs = require("fs");

module.exports = {
    name: "help",
    async execute({ message, client, config }) {
        const categories = {};

        // Scan commands folder and group by category (subfolder)
        const commandsPath = path.join(__dirname, "..", "commands");

        function loadCommands(dir, category = "Utility") {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    loadCommands(fullPath, file); // Folder name becomes category
                } else if (file.endsWith(".js")) {
                    try {
                        const cmd = require(fullPath);
                        const catName = cmd.category || category;
                        if (!categories[catName]) categories[catName] = [];
                        categories[catName].push(`${config.prefix}${cmd.name || file.replace(".js", "")}`);
                    } catch (err) {
                        console.error(`Error loading command ${file}: ${err.message}`);
                    }
                }
            }
        }

        loadCommands(commandsPath);

        // Sort categories: Utility always first
        const sortedCategories = Object.keys(categories).sort((a, b) => {
            if (a === "Utility") return -1;
            if (b === "Utility") return 1;
            return a.localeCompare(b);
        });

        // Build help output
        let output = [
            "```ansi",
            "⠀",
            "⠀⠀⠀⢸⣦⡀⠀⠀⠀⠀⢀⡄",
            "⠀⠀⠀⢸⣏⠻⣶⣤⡶⢾⡿⠁",
            "⠀⠀⣀⣼⠷⠀⠀⠁   \u001b[1;36mDevXploit\u001b[0m",
            "⠴⣾⣯⣅⣀⠀⠀⠀⠈⢻⣦⡀",
            "⠀⠀⠀⠉⢻⡇⣤⣾⣿⣷⣿⣿",
            "⠀⠀⠀⠀⠸⣿⡿⠏⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠟⠁⠀⠀⠀⠀",
            "```",
            "```md",
            "# 📜 Command List",
            ""
        ].join("\n");

        // Add categories & commands
        for (const category of sortedCategories) {
            output += `## ${category} Commands\n${categories[category].join(", ")}\n\n`;
        }

        output += "```";

        // Send and auto-delete
        const sent = await message.channel.send(output);

        setTimeout(() => {
            message.delete().catch(() => {});
            sent.delete().catch(() => {});
        }, 15000);
    }
};
