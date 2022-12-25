const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv/config');

const KAKERA_AVISO = 200;
var lastMessage = "";
const commands = ["$w", "$m", "$h", "$mx", "$im ucy"];
let suscriptores = new Map();
suscriptores.set("247330571687034881", "One Piece");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready', () => {
    console.log('El BOT esta listo.');
})

client.on('messageCreate', (message) => {
    if(message.channel.name == 'wifus-todo' && commands.includes(lastMessage)){
        suscriptores.forEach((collecion, usuario) => {
            // Comprobar si la carta es cara
            try {
                let kakeras = message.embeds[0].data.description.split('**')[1];
                if(kakeras > KAKERA_AVISO){
                    message.channel.send("<@247330571687034881> Ha salido una carta cara");
                }
            } catch (error) {
                console.log("Error al leer los kakeras de la carta");
            }
            // Comprobar si la carta pertenece a la coleccion
            try {
                if(message.embeds[0].data.description.includes(collecion)){
                    message.channel.send(`<@${usuario}> Ha salido un personaje de ${collecion}`);
                }
            } catch (error) {
                console.log("No se ha encontrado descripcion");
            }
        })
        lastMessage = message.content.toLowerCase();
    }
})

client.login(process.env.TOKEN);