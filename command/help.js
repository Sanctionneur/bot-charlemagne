const Command = require('./command')

module.exports = class Help extends Command {
    start(){
        this.name = "help"
        this.power = 1
    }
    action(){
        this.msg.author.createDM().then(ch => ch.send(this.data.helpmessage));
        this.log("message d'aide envoyé en mp à "+this.msg.member.diplayName);
        this.flush();
    }
}