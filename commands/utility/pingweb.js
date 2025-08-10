const fetch = require('node-fetch');

module.exports = {
    name: 'pingweb',
    category: 'Utility',
    description: 'Ping a website and show response time',
    usage: 'pingweb <url>',
    async execute({ message, args }) {
        let url = args[0];
        if (!url) {
            return message.channel.send(`\`${message.client.prefix}pingweb <url>\``).then(m => m.delete({ timeout: 5000 }));
        }
        
        if (!url.startsWith('http')) {
            url = `http://${url}`;
        }
        
        try {
            const start = Date.now();
            const response = await fetch(url, { timeout: 5000 });
            const end = Date.now();
            const responseTime = end - start;
            
            if (response.ok) {
                message.channel.send(`✅ \`${url}\` is **up!**\nResponse Time: \`${responseTime}ms\``);
            } else {
                message.channel.send(`⚠️ \`${url}\` responded with status \`${response.status}\``).then(m => m.delete({ timeout: 10000 }));
            }
        } catch (error) {
            message.channel.send(`❌ \`${url}\` is **down or unreachable!**\nError: \`${error.message}\``).then(m => m.delete({ timeout: 10000 }));
        }
    }
};