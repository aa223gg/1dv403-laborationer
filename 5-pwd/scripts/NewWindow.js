"use strict";


var NewWindow = {        
    
    windowDiv: null,
    windowDivHeader: null,
    windowDivFooter: null,
    content: null, 
    line: null,
        
createNewWindow: function(positionLeft, positionTop){
        console.log("testa createNewWindow");
    
       NewWindow.windowDiv = document.createElement("div");            //skapa div-tagg
       NewWindow.content = document.getElementById("content");
       NewWindow.windowDiv.style.width = "300px";
       NewWindow.windowDiv.style.height = "400px";
       NewWindow.windowDiv.style.position = "absolute";
       NewWindow.windowDiv.style.left = positionLeft + "px";                   
       NewWindow.windowDiv.style.top = positionTop + "px";                     
       NewWindow.windowDiv.style.backgroundColor = "yellow";
       NewWindow.windowDiv.style.border = "solid #989898";
       NewWindow.windowDiv.style.borderRadius = "5px";
       NewWindow.windowDiv.style.overflow = "scroll";
    
        NewWindow.windowDivHeader = document.createElement("header");     //skapa header
        NewWindow.windowDivHeader.className = "imageDivHeader";
        NewWindow.windowDivHeader.innerHTML = "Fotogalleri";
        NewWindow.windowDiv.appendChild(NewWindow.windowDivHeader);
        
        NewWindow.windowDivFooter = document.createElement("footer");     //skapa footer-div
        NewWindow.windowDivFooter.className = "imageDivFooter";
        NewWindow.windowDivFooter.innerHTML = "footer";
        NewWindow.windowDiv.appendChild(NewWindow.windowDivFooter);
        //NewWindow.windowDivFooter.style.position = "static";
       // NewWindow.windowDivFooter.style.bottom = "400px";
    
       NewWindow.line = document.getElementById("line");
       NewWindow.content.insertBefore(NewWindow.windowDiv, NewWindow.line);                //lägg in windowDiv före line
    },
    
    insertContent: function(windowContent){                                                 //lägg in fotogalleri i windowDiv
            NewWindow.windowDiv.insertBefore(windowContent, NewWindow.windowDivFooter);
        }
};
    
    
    
    
