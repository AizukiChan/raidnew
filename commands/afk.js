module.exports = {
    name: 'afk',
    description: 'Atur status AFK Anda.',
    execute(message, args, afkUsers) {
        const afkMessage = args.join(' ') || 'AFK';
        afkUsers.set(message.author.id, { message: afkMessage });
        message.reply(`Anda sekarang AFK: ${afkMessage}`);
    }
};
