const fs = require('fs');
const { Client, Collection, Intents, joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, StreamType } = require('discord.js');
const ytdl = require('ytdl-core');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const statuses = ['Raid Bot', 'Buatan Ranii⭐', 'Jangan Lupa💢', 'Add Facebook😍', 'Ranii Chan'];
  let currentStatusIndex = 0;

  client.user.setActivity(statuses[currentStatusIndex], { type: 'WATCHING' });

  setInterval(() => {
      currentStatusIndex++;
      if (currentStatusIndex >= statuses.length) {
          currentStatusIndex = 0;
      }
      client.user.setActivity(statuses[currentStatusIndex], { type: 'WATCHING' });
  }, 5000); // Mengubah status setiap 5 detik (5000 ms)

  // Mengubah status bot menjadi DND (Do Not Disturb)
  client.user.setStatus('dnd');
});

const afkUsers = new Map();

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Menangani mention AFK
    const mentioned = message.mentions.users.first();
    if (mentioned) {
        if (afkUsers.has(mentioned.id)) {
            const afkInfo = afkUsers.get(mentioned.id);
            message.reply(`${mentioned.username} sedang AFK: ${afkInfo.message}`);
        }
    }

    // Menghapus status AFK jika pengguna mengirim pesan
    if (afkUsers.has(message.author.id)) {
        afkUsers.delete(message.author.id);
        message.reply('Selamat datang kembali! Anda tidak lagi AFK.');
    }

    // Penanganan perintah
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args, afkUsers);
    } catch (error) {
        console.error(error);
        message.reply('Terjadi kesalahan saat menjalankan perintah tersebut.');
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice('!'.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing the command.');
    }
});

client.login(process.env.DISCORD_TOKEN); // Login bot menggunakan token dari environment variable
