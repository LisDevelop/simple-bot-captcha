const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const Canvas = require('canvas');
const { AttachmentBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

const checkUsers = new FileSync(path.resolve(__dirname, '../../configurations/usersCaptcha.json'));
const config_USERS = low(checkUsers)

const loadImage = async () => {
    const background = await Canvas.loadImage(path.resolve(__dirname, "../../configurations/assets/background.png"));
    return background;
};

function generateCharacters (count = 20) { // Atualização automática de criação de senha
    let password = ''
    while (password.length < count) {
      password += Math.random().toString(36).substr(2)
    }
    return password.substr(0, count)
  }

const generateImage = async (interaction, client) => {
    config_BOT.read(); config_BOT.write()

    const changeInfo = config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: 'NO_MODIFY'}).value()

    Canvas.registerFont(path.resolve(__dirname, '../../configurations/assets/Highman.ttf'), { family: 'Highman Trial' })

    const code = generateCharacters(5);
    const canvas = Canvas.createCanvas(322, 96);
    const context = canvas.getContext('2d');
  
    const background = await loadImage();
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const texto1 = `${code}`;
    const tamanhoFonte1 = 58;
    const corTexto1 = '#FFFFFF';
    const fonte1 = 'Highman Trial';

    // Configura as propriedades do texto
    context.font = `${tamanhoFonte1}px ${fonte1}`;
    context.fillStyle = corTexto1;

    // Posiciona o texto no canvas
    const textoX = 75;
    const textoY = 75;
    context.fillText(texto1, textoX, textoY);

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), 'profile-image.jpg');

    const buttonCaptcha = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('verify_captcha')
        .setLabel('Verificar código')
        .setStyle(ButtonStyle.Primary)
    )

    // sys
    config_USERS.read(); config_USERS.write()
    const verifyUser = config_USERS.get('users').find({userid: `${interaction.user.id}`}).value()
    if(verifyUser === undefined){
        interaction.reply({content: '> **BEM-VINDO(A)!!!**\n- Para verificar o nosso captcha é bem simples e prático, para isso, você deve apenas digitalizar os caracteres que estão na imagem. Para fazer isso, clique no botão logo abaixo e coloque o código que está.', files: [attachment], components: [buttonCaptcha], ephemeral: true}).then(msg => {
            config_USERS.get('users').push({
                userid: `${interaction.user.id}`,
                username: `${interaction.user.username}`,
                code: `${code}`
            }).write()        
        })
    }else{
        interaction.reply({content: '> **BEM-VINDO(A)!!!**\n- Para verificar o nosso captcha é bem simples e prático, para isso, você deve apenas digitalizar os caracteres que estão na imagem. Para fazer isso, clique no botão logo abaixo e coloque o código que está.', files: [attachment], components: [buttonCaptcha], ephemeral: true}).then(msg => {
            config_USERS.get('users').find({userid: `${interaction.user.id}`}).assign({
                code: `${code}`
            }).write()   
        })
    }
};

module.exports = (interaction, client) => {
    if(interaction.customId === 'checking_Captcha'){
        config_BOT.read(); config_BOT.write()
        config_USERS.read(); config_USERS.write()

        generateImage(interaction, client);
    }
    if(interaction.customId === 'verify_captcha'){
        const modeloIntro = new ModalBuilder()
        .setCustomId(`change_panelCaptcha`)
        .setTitle('Checando código')
        //
        const getName = new TextInputBuilder()
        .setCustomId('getCode')
        .setLabel('Qual o código?')
        .setPlaceholder('Coloque os cinco digitos aqui!!!')
        .setMaxLength(5)
        .setMinLength(5)
        .setStyle(TextInputStyle.Short);

        const sa1 = new ActionRowBuilder().addComponents(getName);
        modeloIntro.addComponents(sa1)
        interaction.showModal(modeloIntro)
    }
    if(interaction.customId === 'change_panelCaptcha'){
        config_USERS.read(); config_USERS.write()
        const get1 = interaction.fields.getTextInputValue('getCode');

        const checkUser = config_USERS.get('users').find({userid: `${interaction.user.id}`}).value()
        if(checkUser === undefined){
            interaction.reply({content: "**[AVISO]:** Você não está inserido no meu banco de dados temporário. Para isso, vá e crie outro captcha. Entre no servidor principal e clique em verificar captcha!"})
        }else{
            if(get1 === checkUser.code){
                const checkrole = config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: 'NO_MODIFY'}).value()
                const role = interaction.guild.roles.cache.get(checkrole.bot_ruleNotVerify);
                const noPassaport = interaction.guild.roles.cache.get(checkrole.bot_ruleNoPassaport);

                interaction.reply({content: '**[AVISO]:** Parabéns, você passou no captcha! Seja bem-vindo(a) ao Praia Grande.', ephemeral: true})

                setTimeout(() => {
                    interaction.member.roles.remove(role)
                    interaction.member.roles.add(noPassaport)
                    config_USERS.get('users').remove({userid: `${interaction.user.id}`}).write()
                }, 5000);
            
            }else{
                interaction.update({content: "**[AVISO]:** Você colocou o código errado. Clique novamente em verificar captcha para prosseguir com outro código.", files: [], components: []})
            }
        }
    }
}