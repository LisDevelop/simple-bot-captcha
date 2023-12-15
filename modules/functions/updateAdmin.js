const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const { EmbedBuilder } = require('discord.js');

const check_BOT = new FileSync(path.resolve(__dirname, '../configurations/administrators.json'));
const config_BOT = low(check_BOT)

function updateAdmin(selectUser){
    config_BOT.read(); config_BOT.write()

    const globalChange = config_BOT.value()

    let embed = new EmbedBuilder()
    .setTitle('Quadro dos administradores')
    .setThumbnail('https://media.discordapp.net/attachments/1077814640513384448/1182491145763295333/praia_grande_rp.png')
    .setTimestamp()
    .setFooter({text: 'Atualizado em: '})

    
}