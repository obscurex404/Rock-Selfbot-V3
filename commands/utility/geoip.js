const fetch = require('node-fetch');

module.exports = {
    name: 'geoip',
    category: 'Utility',
    description: 'Get geolocation information about an IP address',
    usage: 'geoip <ip>',
    async execute({ message, args }) {
        const ip = args[0];
        if (!ip) {
            return message.channel.send("❗ Please provide an IP address to look up, e.g., `geoip 8.8.8.8`").then(m => m.delete({ timeout: 5000 }));
        }

        try {
            const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
            const data = await response.json();

            if (!data.ipAddress) {
                throw new Error("Invalid IP or no data found");
            }

            const output = [
                `IP Lookup for ${ip}:`,
                `Country   : ${data.countryName || 'N/A'}`,
                `City      : ${data.cityName || 'N/A'}`,
                `Region    : ${data.regionName || 'N/A'}`,
                `Timezone  : ${data.timeZone || 'N/A'}`,
                `Zip Code  : ${data.zipCode || 'N/A'}`,
                `Latitude  : ${data.latitude || 'N/A'}`,
                `Longitude : ${data.longitude || 'N/A'}`,
                `Currency  : ${data.currency?.name || 'N/A'}`,
                `Language  : ${data.language || 'N/A'}`,
                `Continent : ${data.continent || 'N/A'}`
            ].join('\n');

            message.channel.send(`\`\`\`py\n${output}\n\`\`\``);
        } catch (error) {
            message.channel.send(`❌ Failed to look up IP \`${ip}\`: ${error.message}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};