const gtts = require('gtts');
const { MessageAttachment } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { tmpdir } = require('os');
const { join } = require('path');

module.exports = {
    name: 'tts',
    category: 'Fun',
    description: 'Convert text to speech (TTS)',
    async execute({ message, args }) {
        try {
            if (!args.length) {
                const reply = await message.channel.send(`Usage: \`${message.client.prefix}tts <text>\``);
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return;
            }

            const text = args.join(' ');
            const tempFile = join(tmpdir(), `tts_${Date.now()}.mp3`);
            
            // Create TTS file using callback approach
            const tts = new gtts(text, 'en');
            await new Promise((resolve, reject) => {
                tts.save(tempFile, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            // Read the file and send it
            const fileStream = fs.createReadStream(tempFile);
            await message.channel.send({
                files: [{
                    attachment: fileStream,
                    name: 'tts.mp3'
                }]
            });

            // Clean up the temp file
            fileStream.on('close', () => {
                fs.unlink(tempFile, () => {});
            });

        } catch (e) {
            console.error('TTS Error:', e);
            const errorMsg = await message.channel.send(`❌ Error: ${e.message || 'Failed to generate TTS'}`);
            setTimeout(() => errorMsg.delete().catch(() => {}), 5000);
        }
    }
};