module.exports = {
    name: 'ping',
    category: 'Utility',
    description: 'Check bot latency',
    async execute({ message, client }) {
        const start = Date.now();
        const msg = await message.channel.send("🏓 Pinging...");
        const end = Date.now();
        
        const apiLatency = end - start;
        const wsLatency = client.ws.ping;
        
        msg.edit(`🏓 Pong!\n📶 API: ${apiLatency}ms\n📡 WebSocket: ${wsLatency}ms`);
    }
};