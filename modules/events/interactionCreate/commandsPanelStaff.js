const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

const cfx = require('cfx-api')

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')

async function conServer(interaction){
    const conServer = await cfx.fetchServer('e4rylp')
}
const loadImage = async () => {
    const server = await cfx.fetchServer("e4rylp") // Replace "qrpm7v" with a server id
    console.log(`Server: ${server.hostname}, ${server.players.length}`); 
};

module.exports = (interaction) => {
    if(interaction.customId === 'checking_Panel'){
        const commands = new ActionRowBuilder() // O que é roleplay?
        .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId(`panelSelectMenu`)
        .setPlaceholder('Clique aqui para selecionar')
        .addOptions(
            {label: `Área de monitoramento`, description: 'Uma área que monitora o servidor em tempo real.', value: 'managerServer'},
            {label: `Portal Administrativo`, description: 'Mostra todos os manuais administrativos.', value: 'portableAdmin'},
            {label: `Gerenciamento`, description: 'Faz o gerenciamento de você ou todos administradores.', value: 'gerenciamentoAdmin'}
            )
        );

        let embed = new EmbedBuilder()
        .setTitle('Comandos disponíveis')
        .setDescription('Bem-vindo(a) ao painel do administrador, para selecionar, clique abaixo e faça suas verificações rapidamente.')
        interaction.reply({embeds: [embed], components: [commands], ephemeral: true})
    }
    if(interaction.customId === 'panelSelectMenu'){
        const selected = interaction.values[0];
        
        if(selected === 'managerServer'){
            const commands = new ActionRowBuilder() // O que é roleplay?
            .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId(`panelManagerServer`)
            .setPlaceholder('Clique aqui para selecionar')
            .addOptions(
                {label: `Ver status`, description: 'Verifica o status do servidor.', value: 'checkingStatus'},
                )
            );
        }
    }
}