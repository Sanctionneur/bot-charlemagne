const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Warn extends Command {
    start(){
        this.name = "warn";
        this.power = 3
    }
    action(){
        this.parse();
        if(this.msg.mentions.members.first()){
            this.warnalert(this.msg.mentions.members.first().user,this.param2);
            this.log('avertissement éxécuté (voir log avertissement)')
        } else this.log("erreur, pas de personne mentionée");
        this.flush();
    }
};