const whois = require('whois-json');

module.exports = {
    name: 'dominfo',
    category: 'Web',
    description: 'Get WHOIS information for a domain',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const domain = args[0];
        if (!domain) {
            return message.channel.send('❗ Please provide a domain (e.g., `!dominfo google.com`)').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        function formatDate(dateObj) {
            if (!dateObj) return 'N/A';
            if (Array.isArray(dateObj)) dateObj = dateObj[0];
            try {
                const date = new Date(dateObj);
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            } catch {
                return 'N/A';
            }
        }

        try {
            const domainInfo = await whois(domain);
            
            if (!domainInfo.domainName) {
                return message.channel.send(`❌ No WHOIS data found for \`${domain}\`.`).then(msg => {
                    setTimeout(() => msg.delete(), 10000);
                });
            }

            let nameServers = domainInfo.nameServer || domainInfo.nameServers;
            if (nameServers) {
                if (Array.isArray(nameServers)) {
                    nameServers = nameServers.join(', ');
                }
                nameServers = nameServers.length > 100 
                    ? nameServers.slice(0, 100) + '...' 
                    : nameServers;
            }

            const response = 
                '```js\n' +
                `WHOIS Lookup for: ${domain}\n\n` +
                `Domain: ${domainInfo.domainName || 'N/A'}\n` +
                `Registrar: ${domainInfo.registrar || 'N/A'}\n` +
                `Creation Date: ${formatDate(domainInfo.creationDate)}\n` +
                `Expiration Date: ${formatDate(domainInfo.expirationDate)}\n` +
                `Updated Date: ${formatDate(domainInfo.updatedDate)}\n` +
                `Name Servers: ${nameServers || 'N/A'}\n` +
                `Status: ${domainInfo.status || 'N/A'}\n` +
                '```';

            await message.channel.send(response);
        } catch (error) {
            console.error(`[WHOIS Error] ${error}`);
            message.channel.send(`❌ Failed to fetch WHOIS data for \`${domain}\`. Error: ${error.message}`).then(msg => {
                setTimeout(() => msg.delete(), 10000);
            });
        }
    }
};