const { ModalBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const { TextInputBuilder, ActionRowBuilder } = require('@discordjs/builders');

const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/administrators.json'));
const config_BOT = low(check_BOT)

module.exports = (interaction, client) => {
    if(interaction.customId === 'checking_Staffer'){
        const modeloIntro = new ModalBuilder()
        .setCustomId(`change_panelStaff`)
        .setTitle('Verificando seu usuário...')
        //
        const getName = new TextInputBuilder()
        .setCustomId('getNamePerson')
        .setLabel('Qual seu nome de usuário no grupo principal?')
        .setPlaceholder('Ex: éoGordão')
        .setMaxLength(50)
        .setMinLength(5)
        .setStyle(TextInputStyle.Short);

        //
        const getAccID = new TextInputBuilder()
        .setCustomId('getAccID')
        .setLabel('Qual ID da sua(s) conta(s)?')
        .setPlaceholder('Ex: 1023 ou: 1023, 2323, 45')
        .setMaxLength(50)
        .setStyle(TextInputStyle.Short);

        //
        const getAcID = new TextInputBuilder()
        .setCustomId('getAcID')
        .setLabel('Qual ID registrado do anticheat?')
        .setPlaceholder('Ex: 1021')
        .setMaxLength(50)
        .setStyle(TextInputStyle.Short);

        

        const sa1 = new ActionRowBuilder().addComponents(getName);
        const sa2 = new ActionRowBuilder().addComponents(getAccID);
        const sa3 = new ActionRowBuilder().addComponents(getAcID);
        modeloIntro.addComponents(sa1, sa2, sa3)
        interaction.showModal(modeloIntro)
    }
    if(interaction.customId === 'change_panelStaff'){
        const get1 = interaction.fields.getTextInputValue('getNamePerson');
        const get2 = interaction.fields.getTextInputValue('getAccID');
        const get3 = interaction.fields.getTextInputValue('getAcID');

        interaction.reply({content: "**[AVISO]:** Parabéns, você foi adicionado ao cargo mínimo, agora, boa sorte. Em cinco segundos perderá acesso a esse canal.", ephemeral: true})

        setTimeout(() => {
            interaction.member.setNickname(`${get1}`)
            interaction.member.roles.add('1182826351682670733') // id cargo suporte

            config_BOT.read(); config_BOT.write()
            config_BOT.get('admins').push({
                userID: interaction.user.id,
                username: interaction.user.username,
                userRule: `Suporte`,
                personName: `${get1}`,
                accountsID: `${get2}`,
                anticheatID: `${get3}`
            }).write()

            let embed = new EmbedBuilder()
            .setTitle('Novo administrador')
            .setDescription('O administrador ' + get1 + ' (' + interaction.user.username + ') acabou de se registrar como suporte dentro da administração.')
            client.channels.cache.get('1183096047808036935').send({embeds: [embed]})
        }, 5000);
    }
}