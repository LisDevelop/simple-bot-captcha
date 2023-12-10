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
    const checking = config_BOT.get('CONFIG_DO_BOT').find({staff_configurations: 'NO_MODIFY'}).value()

    let embed = new EmbedBuilder()
    .setTitle('Praia Grande — Verificação')
    .setThumbnail('https://media.discordapp.net/attachments/1077814640513384448/1182491145763295333/praia_grande_rp.png')
    .setFooter({text: 'Sistema de verificação — Praia Grande'})
    .setTimestamp()
    .addFields(
        {name: `Como funciona?`, value: `- Olá, futuro administrador! Seja bem-vindo ao escopo administrativo do servidor **Praia Grande Roleplay!** Se você chegou até aqui, é provável que foi avaliado e, de forma conscisa, percebemos seu potencial para participar de nossas dependências. O projeto de líderes conta com o #escopo-administrativo preparado para você encontrar o que sua determinada função está inserida, então leia com atenção todas as informações que estão lá.\n\n- Nós contamos com esse sistema de verificação para termos automatização dentro das nossas dependências.`}
    )

    let embed2 = new EmbedBuilder()
    .setTitle('Painel do Administrador')
    .setThumbnail('https://media.discordapp.net/attachments/1077814640513384448/1182491145763295333/praia_grande_rp.png')
    .setTimestamp()
    .addFields(
        {name: `Como funciona?`, value: `Seja bem-vindo(a) ao painel do administrador! Clicando no botão abaixo você poderá realizar várias ações administrativas que te ajudará bastante enquanto está na administração do servidor Praia Grande.`, inline: false}
    )

    const buttonStaffer = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('checking_Staffer')
        .setLabel('Verificar')
        .setStyle(ButtonStyle.Success)
    )

    const buttonPanel = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('checking_Panel')
        .setLabel('Comandos disponíveis')
        .setStyle(ButtonStyle.Success)
    )

    try{
        if(checking.staff_checkingPanelMessage === '0 | NÃO MEXA AQUI!'){
            client.channels.cache.get(checking.staff_channelToPanel).send({embeds: [embed2], components: [buttonPanel]})
            config_BOT.get('CONFIG_DO_BOT').find({staff_configurations: 'NO_MODIFY'}).assign({staff_checkingPanelMessage: '1 | NÃO MEXA AQUI!'}).write()
        }else{
            return;
        }

        if(checking.staff_checkingIntroductionMessage === '0 | NÃO MEXA AQUI!'){
            client.channels.cache.get(checking.staff_channelToIntroduction).send({embeds: [embed], components: [buttonStaffer]})
            config_BOT.get('CONFIG_DO_BOT').find({staff_configurations: 'NO_MODIFY'}).assign({staff_checkingIntroductionMessage: '1 | NÃO MEXA AQUI!'}).write()
        }else{
            return;
        }
    } catch(err) {
        console.log('[ERRO DEPENDÊNCIA]: Você não colocou corretamente o ID de um canal nas configurações. Vá no diretório; modules/configsBOT.json e adicione o ID do canal onde pede o staff_channelToPanel')
        process.exit()
    }
}