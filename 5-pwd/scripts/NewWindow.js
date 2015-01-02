"use strict";


var NewWindow = {        
    
    windowDiv: null,
    windowDivHeader: null,
    windowDivFooter: null,
    content: null, 
    line: null,
    iconClose: null,
    aClose: null,
    loading: null,
        
createNewWindow: function(positionLeft, positionTop){
        
       NewWindow.windowDiv = document.createElement("div");                     //Skapa nytt fönster, ange storlek och position m.m.
       NewWindow.content = document.getElementById("content");
       NewWindow.windowDiv.style.width = "300px";                               
       NewWindow.windowDiv.style.height = "400px";
       NewWindow.windowDiv.style.position = "absolute";
       NewWindow.windowDiv.style.left = positionLeft + "px";                   
       NewWindow.windowDiv.style.top = positionTop + "px";                     
       NewWindow.windowDiv.style.backgroundColor = "#d8d8d8";
       NewWindow.windowDiv.style.border = "solid #989898";
       NewWindow.windowDiv.style.borderRadius = "5px";
       NewWindow.windowDiv.style.overflow = "scroll";
    
        NewWindow.windowDivHeader = document.createElement("header");           //Skapa header 
        NewWindow.windowDivHeader.className = "windowDivHeader";
        NewWindow.windowDiv.appendChild(NewWindow.windowDivHeader);
        
        NewWindow.iconClose = document.createElement("img");                    //Lägg in close-ikonen i header
        NewWindow.iconClose.src = "pics/close-icon.svg";
        NewWindow.iconClose.className = "iconClose";
        NewWindow.aClose = document.createElement("a");
        NewWindow.aClose.setAttribute("href", "#");
        NewWindow.aClose.appendChild(NewWindow.iconClose);     
        NewWindow.windowDivHeader.appendChild(NewWindow.aClose);
       
        NewWindow.aClose.addEventListener("click", function(){                  //Onclick på close-ikonen
            NewWindow.content.removeChild(NewWindow.windowDiv);            
        });
        
        NewWindow.windowDivFooter = document.createElement("footer");           //Skapa footer med loading-ikon
        NewWindow.windowDivFooter.className = "windowDivFooter";
        NewWindow.loading = document.createElement("img");
        NewWindow.loading.src = "pics/ajax-loader.gif";
        NewWindow.loading.className = "loading";
        NewWindow.windowDivFooter.appendChild(NewWindow.loading);
        NewWindow.windowDiv.appendChild(NewWindow.windowDivFooter);
        NewWindow.windowDivFooter.style.position = "absolute";               
        NewWindow.windowDivFooter.style.bottom = "0px";
        NewWindow.windowDivFooter.style.width = "100%";
    
       NewWindow.line = document.getElementById("line");
       NewWindow.content.insertBefore(NewWindow.windowDiv, NewWindow.line);     //Lägg in windowDiv före line
       
    },
    
    hideFooter: function(){                                                     //Göm footer när bilderna laddats in
        NewWindow.windowDivFooter.className = "hide";
    },
    
    
    insertHeaderContent: function(headerIcon, heading){                         //Lägg till innehåll i header (ikon och text)
        NewWindow.windowDivHeader.insertBefore(heading, NewWindow.aClose);
        NewWindow.windowDivHeader.insertBefore(headerIcon, heading);
    },
    
    insertContent: function(windowContent){                                     //Lägg in fotogalleri i windowDiv
        NewWindow.windowDiv.insertBefore(windowContent, NewWindow.windowDivFooter);
    }
};
    
    
    
    
