module.exports = {
    name: 'pokedex',
    category: 'Web',
    description: 'Search for Pokémon information',
    async execute({ message, args }) {
        try {
            await message.delete();
        } catch (error) {}

        const pokemonName = args.join(' ');
        if (!pokemonName) {
            return message.channel.send('❗ Please provide a Pokémon name, e.g., `pokedex Pikachu`').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
            const response = await fetch(url, { timeout: 5000 });

            if (response.status !== 200) {
                return message.channel.send(`❌ No Pokémon found with the name '${pokemonName}'.`).then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }

            const pokeData = await response.json();

            const name = pokeData.name?.charAt(0).toUpperCase() + pokeData.name?.slice(1) || 'N/A';
            const pokeId = pokeData.id || 'N/A';
            const height = pokeData.height ? (pokeData.height / 10) : 0;
            const weight = pokeData.weight ? (pokeData.weight / 10) : 0;
            const types = pokeData.types?.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ') || 'N/A';
            const abilities = pokeData.abilities?.map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(', ') || 'N/A';
            const sprite = pokeData.sprites?.front_default || null;

            let msg = 
                `**Pokedex Entry for ${name}:**\n` +
                `**ID:** ${pokeId}\n` +
                `**Height:** ${height} meters\n` +
                `**Weight:** ${weight} kg\n` +
                `**Types:** ${types}\n` +
                `**Abilities:** ${abilities}\n`;

            if (sprite) {
                msg += `**Sprite:** ${sprite}`;
            }

            await message.channel.send(msg);
        } catch (error) {
            message.channel.send('❌ Failed to reach the Pokémon API. Please try again later.').then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};