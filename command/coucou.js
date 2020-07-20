const Command = require('./command')

module.exports = class Coucou extends Command{
    start(){
        this.name = "coucou"
        this.power = 2;
    }
    action(){
        this.resp('coucou');
        this.flush();
    }
}