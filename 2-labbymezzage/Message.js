"use strict";

//konstruktorfunktion
function Message(message, date){
    
    this.getText = function() {
        return message;
    };
    
    this.setText = function(_text) {
        message = _text;                     //text???
    };
    
    this.getDate = function() {
        return date;
    };
    
    this.setDate = function(_date) {
        date = _date;
    };
}

Message.prototype.toString = function() {
    return this.getText() + " (" +this.getDate() + ") "
}

Message.prototype.getHTMLText() = function() {
    return this.message;        //Hämtar texten med \n utbytt mot <br/>
}