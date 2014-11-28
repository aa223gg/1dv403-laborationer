"use strict";

var MessageBoard = {
    
    messages: [],
    
    init: function(){
        
        var textarea = document.getElementById("textarea");
        var button = document.getElementById("submit");   
        
       
        button.addEventListener("click", function(e){                           //Skapar meddelande genom att klicka på "Skriv"
            e.preventDefault();
            MessageBoard.createMessage();
        });  
        
        textarea.addEventListener("keypress", function(e){                      //Skapar meddelande genom att trycka "enter"
            if(!e) e = window.event;
            if (e.keyCode === 13 && !e.shiftKey){
                e.preventDefault();
                MessageBoard.createMessage();
                }
        });
    },
            
    createMessage: function(){    
            
        var textarea = document.getElementById("textarea");
        var mess = {};
        mess = new Message(textarea.value, new Date());                 //Skapa nytt objekt
        MessageBoard.messages.push(mess);                                   //Lägg meddelandet i arrayen
            
        MessageBoard.renderMessages();
        //MessageBoard.renderMessage(MessageBoard.messages.length -1);
    },
    
    renderMessage: function(messageID){
       
            var savedMessages = document.getElementById("savedMessages");       
            var p = document.createElement("p");                                 
            var footer = document.createElement("footer");                      
            var numberOfMessages = document.getElementById("numberOfMessages"); 
            var sum = document.createTextNode(MessageBoard.messages.length);    //Variabel för antal meddelanden
            
            var time = document.createTextNode(MessageBoard.messages[messageID].getDateText());     
            
            var imgDelete = document.createElement("img");                       
            var linkDelete = document.createElement("a");                        
            var imgClock = document.createElement("img");                       
            var linkClock = document.createElement("a");                        
            
            document.getElementById("numberOfMessages").innerHTML = "";         //Rensa antal meddelanden
            document.getElementById("textarea").value = "";                     //Rensa textrutan
            
            p.innerHTML = MessageBoard.messages[messageID].getHTMLText();       //Skriver ut meddelande
            
            numberOfMessages.appendChild(sum);                                  
            savedMessages.appendChild(p);                                      
            p.appendChild(footer);                                              
            footer.appendChild(time);                                           
            footer.className = "footer";                                    
            
            imgDelete.src = "delete.svg";                                       
            imgDelete.alt = "Radera meddelande";                               
            imgDelete.className = "img";
            linkDelete.appendChild(imgDelete);                                  
            linkDelete.setAttribute("href", "#");                               
            savedMessages.insertBefore(linkDelete, p);               
            linkDelete.className = "link";                                      
            linkDelete.addEventListener("click", function(){                     //Anropa removeMessages vid klick
                var question = confirm("Vill du radera meddelandet?");
                if (question === true){
                    MessageBoard.removeMessages(messageID);
                }
            });
            
            imgClock.src = "clock.svg";                                         
            imgClock.alt = "Tid för meddelande";                                
            imgClock.className = "img";
            linkClock.appendChild(imgClock);                                    
            linkClock.setAttribute("href", "#");
            
            savedMessages.insertBefore(linkClock, linkDelete);                  
            linkClock.className = "link";
            
            linkClock.addEventListener("click", function(){
                var month = MessageBoard.messages[messageID].getDate().getMonth() + 1;
                alert("Meddelandet skapades:  " + MessageBoard.messages[messageID].getDate().getDate() + "/" + month 
                + " " + MessageBoard.messages[messageID].getDate().getFullYear() + " kl " + MessageBoard.messages[messageID].getDate().toLocaleTimeString());
            });
        },
        
        renderMessages: function(){
            
            document.getElementById("savedMessages").innerHTML = "";            //Ta bort meddelanden
            for (var i = 0; i < MessageBoard.messages.length; ++i){             
                MessageBoard.renderMessage(i);
            }
        },
        
        removeMessages: function(messageID){
            MessageBoard.messages.splice(messageID, 1);                         //Radera ett meddelande på position messageID
            if (MessageBoard.messages.length === 0){
                document.getElementById("numberOfMessages").innerHTML = "0";
            }
            MessageBoard.renderMessages();                                      
        }
};

window.onload = MessageBoard.init;