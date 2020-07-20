const Command = require('./command')

module.exports = class Say extends Command {
    start(){
        this.name = "say"
        this.power = 2
    }
    action(){
        this.parse();
        this.resp(this.mainparam);
        this.flush();
    }
}