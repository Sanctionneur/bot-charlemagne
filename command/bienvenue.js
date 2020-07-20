const Command = require('./command')

module.exports = class Bienvenue extends Command{
    start(){
        this.name = 'bienvenue';
        this.power = 3;
    }
    action(){
        this.parse()
        if(this.msg.channel.name.startsWith('bienvenue-')) {
            if(this.msg.mentions.members.first()){
                this.mbr = this.msg.mentions.members.first();
                this.log(this.param2)
                this.log(this.data.rolenametoid[this.param2]);
                this.msg.guild.roles.fetch(this.data.carolid).then(rl => this.action1bis(rl));
            } else {
                this.log("Aucun utilisateur mentionné");
                this.flush();
            }
        } else {
            this.log("Commande inutilisable sur un chan autre que le chan de bienvenue")
        }
    }
    action1bis(rl){
        this.carolingien = rl;
        this.msg.guild.roles.fetch(this.data.rolenametoid[this.param2]).then(rl => this.action2(rl));
    }
    action2(rl){
        this.mbr.roles.add([rl,this.carolingien]).then(this.action3())
    }
    action3(){
        this.msg.channel.delete();
        this.log('Chan de bienvenue de l\'utilisateur <@' + this.mbr.user.id + '>')
        this.flush();
    }
}