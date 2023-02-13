const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv/config');

const KAKERA_AVISO = 299;
var lastMessage = "";
const commands = ["$w", "$m", "$h", "$mx", "$ma", "$wa", "$im ucy", "$im bell", "$im aka", "$im bido", "$im asta", "$im irys"];
var suscriptores = new Map();
suscriptores.set("247330571687034881", "One Piece");
suscriptores.set("272001246322229258", "Black Clover");
suscriptores.set("271676463097446402", "Genshin Impact");
suscriptores.set("165415517539008512", "Fullmetal Alchemist");
suscriptores.set("530439044773969920", "hololive");


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
    console.log(lastMessage);
    if((message.channel.name == 'wifus-todo' || message.channel.name == 'prueba') && commands.includes(lastMessage)){
        try {
            // Comprobar si la carta es cara
            let kakeras = message.embeds[0].data.description.split('**')[1];
            if (kakeras > KAKERA_AVISO) {
                message.channel.send(`<@&1063919516620435567>: Ha salido una carta cara`);
            }
        } catch (error) {}
        suscriptores.forEach((collecion, usuario) => {
            try {
                // Comprobar si la carta es de la coleccion del usuarios
                if(message.embeds[0].data.description.includes(collecion)){
                    console.log(`Ha salido un personaje de la coleccion de ${collecion}`);
                    message.channel.send(`<@${usuario}>: Ha salido un personaje de ${collecion}`);
                }
            } catch (error) {
                //console.log(error);
            }
        })
    }else{
        console.log("Error");
    }
    lastMessage = message.content.toLowerCase();
})

client.login(process.env.TOKEN);