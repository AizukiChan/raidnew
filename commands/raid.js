const { Client, Intents, MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { token } = require('../secrets.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    if (message.content.toLowerCase() === '!raidselect') {
        if (!message.member.roles.cache.some(role => role.name === 'Ranii'))
            return message.reply('Anda tidak memiliki izin untuk menggunakan command ini.');
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('raid_select')
                    .setPlaceholder('Select a raid type')
                    .addOptions([
                        { label: 'Raid Water', value: 'raid_water', description: 'See the composition for Raid Water' },
                        { label: 'Raid Earth', value: 'raid_earth', description: 'See the composition for Raid Earth' },
                        { label: 'Raid Dark', value: 'raid_dark', description: 'See the composition for Raid Dark' },
                        { label: 'Raid Light', value: 'raid_light', description: 'See the composition for Raid Light' },
                        { label: 'Raid Fire', value: 'raid_fire', description: 'See the composition for Raid Fire' },
                        { label: 'Raid Basic', value: 'raid_basic', description: 'See the composition for Raid Basic' },
                    ]),
            );

            const embed = new MessageEmbed()
            .setTitle('Choose Element Raid Type')
            .setDescription('Select a element raid type below:')
            .setColor('#0099ff')
            .setImage('https://encdn.ldmnq.com/faq/images/en/c02ccd1f-580e-491d-ac32-5a823afe1c8a.jpg'); // Ganti URL dengan URL gambar yang diinginkan

        try {
            await message.channel.send({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Error sending raid select message:', error);
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    const { values } = interaction;
    let composition = '';

    switch (values[0]) {
        case 'raid_water':
            composition = 'Coming Soon -\n yang punya bot lagi turu jadi nanti aja';
            break;
        case 'raid_earth':
            composition = `Raid Earth Composition:
\`\`\`
Range

Alternative 1
Team: Ameris(Lead) - Kamael - Mayreel - Tinia
Cards: Skill/Skill - AtkE/Atk7 - Atk7/Crit - Crit/Atk
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Ameris)

Alternative 2 
Team: Kamael(Lead) - Tinia - Ameris - Mayreel
Cards: Skill/Skill - Crit/Atk7 - Crit/AtkE - Atk/Atk7
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Kamael)

Melee

Team: Rue - Yuze Pantai - Bari(Melee Version) - Lilith
Cards: Skill/Skill - Crit/AtkE - Crit/Crit - Atk7/Atk7
Acc: Mirror NOR - SG - SG - SG
Relics: Books (Skill Dmg on Rue)
\`\`\``;
            break;
        case 'raid_dark':
            composition = `Raid Dark Composition:
\`\`\`
Range

Alternative 1
Team: OgmaRiffle (Lead) - Cammie - Vinette - Claude
Cards: Skill/Skill - Crit/Atk7 - Crit/Atk7 - Crit/AtkE
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Ameris)

Alternative 2 
Team: Claude(Lead) - Cammie - OgmaRiffle - Vinette
Cards: Skill/Skill - Crit/Atk7 - Crit/AtkE - Crit/Atk7
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Claude)

Melee

Team: Lilith - Beth - Rey - Doctor Plague
Cards: Skill/Skill - Crit/Crit - Atk7/AtkE(Dark) - Crit/Atk7
Acc: Mino - SG - SG - SG
Relics: Book (Skill Dmg on Lilith)
\`\`\``;
            break;
        case 'raid_light':
            composition = `Raid Light Composition:
\`\`\`
Range

Alternative 1
Team: Andras(Lead) - Chun - Gabriel - Tinia
Cards: Crit/Atk7 - Crit/Atk7 - Atk/AtkE - Skill/Skill
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Tinia)

Alternative 2 
Team: Chun (Lead) - Gabriel - Eunha - Eleanor
Cards: Skill/Skill - Crit/AtkE - Crit/Atk - Atk/Atk
Acc: Mino - SG - SG - SG
Relics: Books (Skill Dmg on Chun

Melee

Team: Shapira Pantai - Carol - Lapice - Doctor Plague
Cards: Skill/Skill - Crit/Crit - Crit/AtkE - Atk7/Atk7
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Shapira)
\`\`\``;
            break;
        case 'raid_fire':
            composition = `Raid Fire Composition:
\`\`\`
Range

Team: Elvira(Lead) - Vishuac - Win Ling - Toga
Cards: Skill/Skill - Crit/Atk7 - AtkE/Atk7 - Crit/Crit
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Elvira)

Melee

Team: Rey - Scintilla - Lilith - PIl Win Ling
Cards: Skill/Skill - Crit/AtkE - Crit/Atk7 - Crit/Atk7
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Rey)
\`\`\``;
            break;
        case 'raid_basic':
            composition = `Raid Basic Composition:
\`\`\`
Range

Team: Eunha(Lead) - Nari - Future Knight - Kanna
Cards: Skill/Skill - Crit/Atk7 - Crit/Crit - Crit/Atk7
Acc: Mino - SG - SG - SG
Relics: Cups (Skill Dmg on Eunha)

Melee

- ???
\`\`\``;
            break;
        default:
            composition = 'Unknown Raid Type';
    }

    try {
        await interaction.reply({ content: composition, ephemeral: true });
    } catch (error) {
        console.error('Error replying with composition:', error);
    }
});

client.login(token);
