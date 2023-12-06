const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

const checkUsers = new FileSync(path.resolve(__dirname, '../../configurations/usersCaptcha.json'));
const config_USERS = low(checkUsers)

const loadImage = async () => {
    const background = await Canvas.loadImage(path.resolve(__dirname, "../../configurations/assets/background.png"));
    return background;
};
const generateImage = async (interaction, client) => {
    config_BOT.read(); config_BOT.write()
    
    Canvas.registerFont(path.resolve(__dirname, '../../configurations/assets/Highman.ttf'), { family: 'Highman Trial' })
    let selected = interaction.values[0];
    const hoje = moment();
    const timeHJ = hoje.format('DD/MM');

    const dataResultado = hoje.add(selected, 'days');
    const dataFormatada = dataResultado.format('DD/MM');

    const canvas = Canvas.createCanvas(1772, 2480);
    const context = canvas.getContext('2d');
  
    const background = await loadImage();
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const texto1 = `${timeHJ}`;
    const text2 = `${dataFormatada}`
    const tamanhoFonte1 = 162.5;
    const corTexto1 = '#CA2D2D';
    const fonte1 = 'Highman Trial';

    // Configura as propriedades do texto
    context.font = `${tamanhoFonte1}px ${fonte1}`;
    context.fillStyle = corTexto1;

    // Posiciona o texto no canvas
    const textoX = 410.8;
    const textoY = 2037.5;
    context.fillText(texto1, textoX, textoY);

    // Posiciona o texto no canvas
    const textoX2 = 1268.5;
    const textoY2 = 2037.5;
    context.fillText(text2, textoX2, textoY2);

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), 'profile-image.jpg');
};

module.exports = (interaction) => {
    if(interaction.customId === 'checking_Captcha'){
        config_BOT.read(); config_BOT.write()
        config_USERS.read(); config_USERS.write()

        // verificações
        const checkUsers = config_USERS.get('users').find({userid: `${interaction.user.id}`}).value()
        if(checkUsers === undefined){

        }else{
            interaction.reply({content: "**[AVISO]** | Voc~e já possui um captcha aberto no nosso privado! Vá lá e de uma olhada."})
        }
    }
}