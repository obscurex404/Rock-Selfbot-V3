const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'airplane',
    aliases: ['911'],
    category: 'Fun',
    description: 'Displays an airplane animation',
    async execute({ message }) {
        // Try to delete the original message
        try {
            await message.delete();
        } catch (error) {
            // Ignore if deletion fails (no permission or message already deleted)
        }

        const frames = [
            ':man_wearing_turban::airplane:    :office:',
            ':man_wearing_turban: :airplane:   :office:',
            ':man_wearing_turban:  :airplane:  :office:',
            ':man_wearing_turban:   :airplane: :office:',
            ':man_wearing_turban:    :airplane::office:',
            ':boom::boom::boom:'
        ];

        const msg = await message.channel.send(frames[0]);
        
        for (let i = 1; i < frames.length; i++) {
            await setTimeout(500); // 0.5 second delay
            await msg.edit(frames[i]);
        }
    }
};