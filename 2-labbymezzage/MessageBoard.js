"use strict";

//statiskt objekt, objektliteral
var MessageBoard = {
    
    messages: [],
    
    init: function(){
       var mess = new Message("Test", new Date());
       alert(mess);
       alert(mess.getText());
       mess.setText("En annan text");
       alert(mess);
       
    }
};


window.onload = MessageBoard.init;