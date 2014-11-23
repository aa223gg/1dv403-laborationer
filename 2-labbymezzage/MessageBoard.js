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
            
            //MessageBoard.renderMessages();
            MessageBoard.renderMessage(MessageBoard.messages.length -1);
        });
    },
    
    renderMessage: function(messageID){
       
            var savedMessages = document.getElementById("savedMessages");       //Hämtar ut stället att spara meddelanden på
            var p = document.createElement("p");                                //Skapa ny p-tagg 
            var footer = document.createElement("footer");                      //Skapa ny footer
            var numberOfMessages = document.getElementById("numberOfMessages"); //Hämtar stället för antal meddelanden
            var sum = document.createTextNode(MessageBoard.messages.length);    //Skapa text med antal meddelanden          //BLIR EJ 0!!
            var time = document.createTextNode(MessageBoard.messages[messageID].getDateText());     //Variabel med tiden
            
            document.getElementById("numberOfMessages").innerHTML = "";         //Rensa antal meddelanden
            document.getElementById("textarea").value = "";                     //Rensa textrutan
            
            p.innerHTML = MessageBoard.messages[messageID].getHTMLText();       //Skriver ut meddelande
            
            numberOfMessages.appendChild(sum);                                  //Lägg till antal i numberOfMessages
            savedMessages.appendChild(p);                                       //Lägg p-taggen i saveMessages
            p.appendChild(footer);                                              //Lägg footer i p
            footer.appendChild(time);                                           //Lägg tid i footern
            footer.className = "footer";                                        //Ge footern ett klassnamn
            
            var imgClose = document.createElement("img");                       //Skapa bild
            imgClose.src = "delete.svg";                                        //Ladda in bild
            imgClose.alt = "Radera meddelande";                                  //Alt-text
            var linkClose = document.createElement("a");                        //Skapa länk
            linkClose.appendChild(imgClose);                                    //Lägg bild i länk
            linkClose.setAttribute("href", "#");                                //Sätt attribut
            p.insertBefore(linkClose, footer);                               //Lägg länk i savedMessages
            linkClose.className = "link";                                  //Ge länk ett klassnamn
            linkClose.addEventListener("click", function(){                     //Anropa removeMessages vid klick
                MessageBoard.removeMessages(messageID);
            });
            
            var imgClock = document.createElement("img");                       //Skapa bild
            imgClock.src = "clock.svg";                                         //Ladda in bild
            imgClock.alt = "Tid för meddelande";                                //Alt-text
            var linkClock = document.createElement("a");                        //Skapa länk
            linkClock.appendChild(imgClock);                                    //Lägg bild i länk
            linkClock.setAttribute("href", "#");
            p.insertBefore(linkClock, linkClose);
            linkClock.className = "link";
            
            linkClock.addEventListener("click", function(){
                var month = MessageBoard.messages[messageID].getDate().getMonth() + 1;
                alert("Meddelandet skapades:  " + MessageBoard.messages[messageID].getDate().getDate() + "/" + month 
                + " " + MessageBoard.messages[messageID].getDate().getFullYear() + " kl " + MessageBoard.messages[messageID].getDate().toLocaleTimeString());
            });
            
        },
        
        renderMessages: function(){
            
            document.getElementById("savedMessages").innerHTML = "";            //Ta bort meddelanden
            for (var i = 0; i < MessageBoard.messages.length; ++i){             //Loopa igenom alla meddelanden
                MessageBoard.renderMessage(i);
            }
        },
        
        removeMessages: function(messageID){
            MessageBoard.messages.splice(messageID, 1);                         //Radera ett meddelande på position messageID
            MessageBoard.renderMessages();                                      //Anropa sedan renderMessages
        },
        
        
};

window.onload = MessageBoard.init;