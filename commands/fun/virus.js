const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'virus',
    category: 'Fun',
    description: '🦠 Send animated fake virus message',
    async execute({ message, args }) {
        try {
            await message.delete().catch(() => {});
            
            const type = args[0] || "trojan";
            
            const stages = [
                `\`[▓▓▓                    ] / ${type}.exe Packing files.\``,
                `\`[▓▓▓▓▓▓▓                ] - ${type}.exe Packing files..\``,
                `\`[▓▓▓▓▓▓▓▓▓▓▓▓           ] \\ ${type}.exe Packing files...\``,
                `\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓         ] | ${type}.exe Packing files.\``,
                `\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ] - ${type}.exe Packing files..\``,
                `\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ] \\ ${type}.exe Packing files...\``,
                `\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] | ${type}.exe Packing files...\``,
                `\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] - ${type}.exe Packing complete ✅\``,
                `\`✅ Successfully downloaded ${type}.exe\``,
                '`Injecting virus.   |`',
                '`Injecting virus..  /`',
                '`Injecting virus... -`',
                `\`💀 Successfully injected ${type}.exe.\``
            ];

            const msg = await message.channel.send(stages[0]);
            
            for (let i = 1; i < stages.length; i++) {
                await setTimeout(500);
                await msg.edit(stages[i]);
            }
        } catch (error) {
            console.error('Virus command error:', error);
        }
    }
};