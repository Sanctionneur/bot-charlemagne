const Command = require('./command');

module.exports = class Clean extends Command {
    start(){
        this.name = "clean";
        this.power = 3
    }
    action(){
        this.parse();
        try {
            let nb = parseInt(this.mainparam)
            this.msg.channel.messages.fetch({max: nb}).then(collected => this.suppr(collected));
            this.log("Suppression de "+nb+" messages")
        } catch (e){
           this.log('erreur, suppression annulée')
        }
    }
    suppr(coll){
        let nbr = 0;
        coll.forEach(function(mes){
            mes.delete();
            nbr++;
        });
        this.log(nbr+' messages effectivement supprimés');
        this.flush();
    }
};