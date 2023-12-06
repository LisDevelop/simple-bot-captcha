const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');

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
    const textoX = 3.75;
    const textoY = 1.78;
    context.fillText(texto1, textoX, textoY);

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), 'profile-image.jpg');

    // sys
    const changeUser = client.users.cache.get(interaction.user.id);
    changeUser.send({content: "> **BEM-VINDO(A)!!!**\n- Para verificar o nosso captcha é bem simples e prático, para isso, você deve apenas digitalizar os caracteres que estão na imagem. Para fazer isso, clique no botão logo abaixo e coloque o código que está.", files: [attachment]}).then(msg => {
        config_USERS.get('users').push({
            userid: `${interaction.user.id}`,
            username: `${interaction.user.username}`,
            code: `${code}`
        }).write()
        interaction.reply({content: 'Acabei de enviar no seu privado o código do captcha.', ephemeral: true})
    }).catch(err => {
        interaction.reply({content: `**[AVISO]:** Tive um erro ao enviar uma mensagem no seu privado. Libere antes de solicitar o captcha! Caso ainda tenha problemas, envie uma mensagem para: markusfiller`, ephemeral: true})
    })
};

module.exports = (interaction, client) => {
    if(interaction.customId === 'checking_Captcha'){
        config_BOT.read(); config_BOT.write()
        config_USERS.read(); config_USERS.write()

        // verificações
        const checkUsers = config_USERS.get('users').find({userid: `${interaction.user.id}`}).value()
        if(checkUsers === undefined){
            generateImage(interaction, client);
        }else{
            interaction.reply({content: "**[AVISO]** | Voc~e já possui um captcha aberto no nosso privado! Vá lá e de uma olhada.", ephemeral: true})
        }
    }
}