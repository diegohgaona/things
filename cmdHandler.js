/* 
this is an Command Handler with subfolders for Discord Bots
in this example i use Eris but it also works for Djs
*/
/*
things that don't matter from the bot
const Eris = require('eris');
const clientOptions = {
	intents: ['guilds', 'guildMessages']
};
const bot = new Eris(process.env.DISCORD_TOKEN, clientOptions);
module.exports.bot = bot;
bot.color = '#64C8AE';
bot.snipe = new Map();
require('./db/main.js');
const canvas = require('canvas');
canvas.registerFont('./CaviarDreams.ttf', { family: 'Caviar' });
canvas.registerFont('./CaviarDreams_Bold.ttf', { family: 'CDB' });
canvas.registerFont('./LEMONMILK-Regular.otf', { family: 'Lemon' });
*/
// A function to avoid having to write a bible in the for
const { readdirSync, statSync } = require('fs');
function readDir() {
	return readdirSync('./commands').filter(function subF(file) {
		return statSync('./commands/' + file).isDirectory();
	});
}
//We create the Collection, you can perfectly use a collection of Djs
bot.commands = new Eris.Collection();
//To read files outside of subfolders and to push the subfolder commands
let commandFiles = readdirSync('./commands').filter(f => f.endsWith('.js'));

//a loop for reading all the files in the subfolders and pushes them to commandFiles
for (const dir of readDir()) {
	const folderFiles = readdirSync('./commands/' + dir).filter(f =>
		f.endsWith('.js')
	);
	for (const file of folderFiles) {
		commandFiles.push([dir, file]);
	}
}
//another loop to set all the commands in the collection
for (const file of commandFiles) {
	let command;
	if (Array.isArray(file)) {
		command = require(`./commands/${file[0]}/${file[1]}`);
	} else {
		command = require(`./commands/${file}`);
	}
	bot.commands.set(command.name, command);
}
//you will need to use the name as a property of the command, you will have to adapt it if you want to use it with the file name
