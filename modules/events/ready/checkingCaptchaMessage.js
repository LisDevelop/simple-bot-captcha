const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const process = require('process');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

module.exports = (client) => {
    config_BOT.read(); config_BOT.write()

    // verificações
    const checking = config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: 'NO_MODIFY'}).value()

    let embed = new EmbedBuilder()
    .setTitle('Praia Grande — Verificação')
    .setThumbnail('https://media.discordapp.net/attachments/1077814640513384448/1182491145763295333/praia_grande_rp.png')
    .setFooter({text: 'Sistema de verificação — '})
    .setTimestamp()
    .addFields(
        {name: `Como funciona?`, value: `- Olá caro interpretador, seja bem-vindo(a) ao servidor **Praia Grande Roleplay**!! Aqui você verá novas possibilidades, mas antes disso, você deve resolver um captcha. Usamos esse sistema bem prático para que novos spammers que entrem não tenham acesso a nossas áreas públicas. Clique no botão abaixo e prossiga com o captcha para darmos continuidade a sua entrada no servidor.`}
    )

    const buttonCaptcha = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('checking_Captcha')
        .setLabel('Verificar captcha')
        .setStyle(ButtonStyle.Success)
    )

    try{
        if(checking.bot_checkingMessage === '0 | NÃO MEXA AQUI!'){
            client.channels.cache.get(checking.bot_channelToCaptcha).send({embeds: [embed], components: [buttonCaptcha]})
            config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: 'NO_MODIFY'}).assign({bot_checkingMessage: '1 | NÃO MEXA AQUI!'}).write()
        }else{
            return;
        }
    } catch(err) {
        console.log('[ERRO DEPENDÊNCIA]: Você não colocou corretamente o ID de um canal nas configurações. Vá no diretório; modules/configsBOT.json e adicione o ID do canal onde pede o bot_channelToCaptcha')
        process.exit()
    }
}