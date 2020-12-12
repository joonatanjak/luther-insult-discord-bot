const Discord = require('discord.js');
const client = new Discord.Client();
const insults = require('./insults.json');
const prefix = '/';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('/insult [user]', { type: 'LISTENING' });
});

function insult(channel, target){
    let randomInsult = insults[Math.floor(Math.random() * insults.length)];
    channel.send(`<@${target.id}>, ${randomInsult}`);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    
	if (command === 'insult') {
        	if(message.mentions.members.first()) insult(message.channel, message.mentions.members.first());
        	else if (args[0]) message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => insult(message.channel, members.first().user)).catch(console.error);
        	else insult(message.channel, message.author);

    	}
    
});

client.login(process.env.BOT_KEY);
