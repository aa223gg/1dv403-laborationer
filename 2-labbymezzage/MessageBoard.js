"use strict";

//statiskt objekt, objektliteral
var MessageBoard = {
    
    messages: [],
    
    
    init: function(){
        
        var button = document.getElementById("submit");         
        var textarea = document.getElementById("textarea");
        var mess = {};
       
        //Skapar meddelande genom att klicka på "Skriv"
        button.addEventListener("click", function(e){
            e.preventDefault();
            mess = new Message(textarea.value, new Date());
            //Lägg till i arrayen
            MessageBoard.messages.push(mess);
            
            MessageBoard.renderMessages();
        });
    },
    
    renderMessage: function(messageID){
            
            var savedMessages = document.getElementById("savedMessages");       //Hämtar ut stället att spara meddelanden på
            var p = document.createElement("p");                                //Skapa ny p-tagg 
            var div = document.createElement("div");                            //Skapa ny div 
            var footer = document.createElement("footer");                      //Skapa ny footer
            
            p.innerHTML = MessageBoard.messages[messageID].getHTMLText();       //Skriver ut meddelande
            
            div.appendChild(p);                                                 //Lägg p-taggen i div
            div.appendChild(footer);                                            //Lägg footer i div
            
            savedMessages.appendChild(div);                                     //Lägg div-taggen i "save"
        },
        
        renderMessages: function(){
            //Remove all messages
            document.getElementById("textarea").innerHTML = "";
            
            //Render all messages
            for (var i = 0; i < MessageBoard.messages.length; ++i){
                MessageBoard.renderMessage(i);
            }
        }
};


window.onload = MessageBoard.init;