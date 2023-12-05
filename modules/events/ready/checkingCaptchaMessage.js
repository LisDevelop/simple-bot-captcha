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
    .setTitle('Praia Grande Roleplay — Verificação')
    .setDescription('Seja bem-vindo(a) ao grupo Praia Grande Roleplay, mas antes, para ter acesso aos canais de whitelist, dúvidas e spoilers, você precisará resolver um simples captcha.\n\n- Para resolver basta clicar no botão abaixo que você receberá uma mensagem no seu privado com o captcha!')

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