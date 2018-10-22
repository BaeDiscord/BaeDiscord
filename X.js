const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");
let xp = require("./xp.json");
const botconfig = require("./botconfig.json")
let purple = botconfig.purple;

client.on("ready", () => {
console.log("Estoy listo!");

client.on("guildMemberAdd", (member) => {
console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${member.guild.name}.`);
var canal = client.channels.get('502994012882468864');
canal.send(`${member.user}, **Bienvenido al Servidor**.`);

let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if(!xp[message.author.id]){
xp[message.author.id] = {
xp: 0,
level: 1
};
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
xp[message.author.id].level = curlvl + 1;
}

fs.writeFile(".xp/json", JSON.stringify(xp), (err) => {
if(err) console.log(err)
});

console.log(`level is ${xp[message.author.id].level}`);

});

client.user.setPresence( {
status: "online",
game: {
name: "-help",
url: "https://www.twitch.tv/lachilenabelu",
type: "STREAMING"
}
});

});
var prefix = config.prefix;

client.on("message", (message) => {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
const palabras = ["puto", "puta", "mierda", "fuck"];

if(palabras.some(p => message.content.includes(p))){

message.channel.send("¡Esa palabra no esta permitida!!");
message.delete();
}

if (!message.content.startsWith(config.prefix)) return;
if (message.author.bot) return;

if(command === 'kick' ){

let user = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');

message.guild.member(user).kick(razon);
message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);

}

if(command === 'ban'){

let user = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
if(!razon) return message.channel.send('Escriba un razón, `-ban @username [razón]`');
if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');


message.guild.member(user).ban(razon);
message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);

}

if(command === 'server'){

var server = message.guild;

const embed = new Discord.RichEmbed()
.setThumbnail(server.iconURL)
.setAuthor(server.name, server.iconURL)
.addField('ID', server.id, true)
.addField('Region', server.region, true)
.addField('Creado el', server.joinedAt.toDateString(), true)
.addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
.addField('Miembros', server.memberCount, true)
.addField('Roles', server.roles.size, true)
.setColor(0x66b3ff)

message.channel.send({ embed });

}

if(command === 'user'){
let userm = message.mentions.users.first()
if(!userm){
var user = message.author;

const embed = new Discord.RichEmbed()
.setThumbnail(user.avatarURL)
.setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
.addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
.addField('ID', user.id, true)
.addField('Estado', user.presence.status, true)
.addField('Apodo', message.member.nickname, true)
.addField('Cuenta Creada', user.createdAt.toDateString(), true)
.addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
.addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
.setColor(0x66b3ff)

message.channel.send({ embed });
}else{
const embed = new Discord.RichEmbed()
.setThumbnail(userm.avatarURL)
.setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
.addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
.addField('ID', userm.id, true)
.addField('Estado', userm.presence.status, true)
.addField('Cuenta Creada', userm.createdAt.toDateString(), true)
.setColor(0x66b3ff)

message.channel.send({ embed });
}

}

let texto = args.join(" ");
if(command === 'decir'){
if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
message.channel.send(texto);
}

if(command === 'preguntar'){
var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Sí "," No "," Por supuesto! "," Por supuesto que no "];
if (!texto) return message.reply(`Escriba una pregunta.`);
message.channel.send(message.member.user+' a su pregunta `'+texto+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');
}

if(message.content.startsWith(prefix + 'help')){

message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
message.author.send('**COMANDOS DE MYBOT**\n```\n'+
'-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
'-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
'-> '+prefix+'decir          :: Hace que el bot diga un mensaje.\n'+
'-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
'-> '+prefix+'server         :: Muestra información de un servidor determinado.\n'+
'-> '+prefix+'8ball          :: El bot respondera a tus preguntas.\n'+
'-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
'-> '+prefix+'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n'+
'-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n```\n\n'+
'**X-RolePlay BOT Oficial **\nCreador Bæ🥀#8165');
}

});
client.login(config.token);
