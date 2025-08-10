module.exports = {
    name: 'minesweeper',
    aliases: ['mine'],
    category: 'Fun',
    description: 'Play Minesweeper with customizable size',
    async execute({ message, args }) {
        try {
            await message.delete().catch(() => {});
            
            let size = args[0] ? parseInt(args[0]) : 5;
            size = Math.max(Math.min(size, 8), 2);
            
            const bombs = Array.from({ length: size - 1 }, () => [
                Math.floor(Math.random() * size),
                Math.floor(Math.random() * size)
            ]);
            
            let board = "";
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const isBomb = bombs.some(b => b[0] === x && b[1] === y);
                    if (isBomb) {
                        board += "||:bomb:||";
                    } else {
                        const count = [-1, 0, 1].reduce((total, dx) => 
                            [-1, 0, 1].reduce((subTotal, dy) => 
                                (dx || dy) && bombs.some(b => b[0] === x + dx && b[1] === y + dy) ? subTotal + 1 : subTotal, 
                            total), 
                        0);
                        board += count ? `||:${['zero','one','two','three','four','five','six'][count]}:||` : "||:black_square_button:||";
                    }
                }
                board += "\n";
            }
            
            await message.channel.send(`**Minesweeper (${size}x${size})**\n${board}`);
        } catch (e) {
            message.channel.send(`❌ Error: ${e}`).then(m => m.delete({ timeout: 5000 }));
        }
    }
};