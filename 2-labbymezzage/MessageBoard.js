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
            var footer = document.createElement("footer");                      //Skapa ny footer
            var date = new Date();
            var showTime = document.createTextNode(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
            var numberOfMessages = document.getElementById("numberOfMessages"); //Hämtar stället för antal meddelanden
            var sum = document.createTextNode(MessageBoard.messages.length);    //Skapa text med antal meddelanden
            
            document.getElementById("numberOfMessages").innerHTML = "";         //Rensa antal meddelanden
            document.getElementById("textarea").value = "";                     //Rensa textrutan
            
            p.innerHTML = MessageBoard.messages[messageID].getHTMLText();       //Skriver ut meddelande
            console.log(MessageBoard.messages);
            
            numberOfMessages.appendChild(sum);                                  //Lägg till antal i numberOfMessages
            savedMessages.appendChild(p);                                       //Lägg p-taggen i saveMessages
            p.appendChild(footer);                                              //Lägg footer i p
            footer.appendChild(showTime);                                       //Lägg tid i footern
            footer.className = "footer";                                        //Ge footern ett klassnamn
        },
        
        renderMessages: function(){
            
            document.getElementById("savedMessages").innerHTML = "";            //Ta bort meddelanden
            
            for (var i = 0; i < MessageBoard.messages.length; ++i){             //Loopa igenom alla meddelanden
                MessageBoard.renderMessage(i);
            }
        },
};

window.onload = MessageBoard.init;