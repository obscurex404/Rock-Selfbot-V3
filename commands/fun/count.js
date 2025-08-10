const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'count',
    category: 'Fun',
    description: 'Counts from 1 to 10 with delays',
    async execute({ message }) {
        try {
            // Delete the original command message
            await message.delete().catch(() => {});
            
            // Send initial message
            const countMsg = await message.channel.send('1');
            
            // Count from 2 to 10 with 1-second delays
            for (let i = 2; i <= 10; i++) {
                await setTimeout(1000); // 1 second delay
                await countMsg.edit(i.toString());
            }
            
            // Final message
            await setTimeout(1000);
            await countMsg.edit('✅ Counting complete!');
            
        } catch (error) {
            console.error('Count command error:', error);
            message.channel.send('❌ An error occurred while counting.').catch(() => {});
        }
    }
};