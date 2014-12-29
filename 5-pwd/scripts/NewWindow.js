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
        console.log("testa createNewWindow");
    
       NewWindow.windowDiv = document.createElement("div");            //skapa div-tagg
       NewWindow.content = document.getElementById("content");
       NewWindow.windowDiv.style.width = "285px";
       NewWindow.windowDiv.style.height = "400px";
       NewWindow.windowDiv.style.position = "absolute";
       NewWindow.windowDiv.style.left = positionLeft + "px";                   
       NewWindow.windowDiv.style.top = positionTop + "px";                     
       NewWindow.windowDiv.style.backgroundColor = "#d8d8d8";
       NewWindow.windowDiv.style.border = "solid #989898";
       NewWindow.windowDiv.style.borderRadius = "5px";
       NewWindow.windowDiv.style.overflow = "scroll";
    
        NewWindow.windowDivHeader = document.createElement("header");     //skapa header //FIXA POSITION!
        NewWindow.windowDivHeader.className = "windowDivHeader";
        NewWindow.windowDiv.appendChild(NewWindow.windowDivHeader);
        
        NewWindow.iconClose = document.createElement("img");                //lägg in close-ikonen
        NewWindow.iconClose.src = "pics/close-icon.svg";
        NewWindow.iconClose.className = "iconClose";
        NewWindow.aClose = document.createElement("a");
        NewWindow.aClose.setAttribute("href", "#");
        NewWindow.aClose.appendChild(NewWindow.iconClose);
        NewWindow.windowDivHeader.appendChild(NewWindow.aClose);
       
        NewWindow.aClose.addEventListener("click", function(){           //FUNKAR ENDAST PÅ ETT FÖNSTER
            NewWindow.content.removeChild(NewWindow.windowDiv);             //FLYTTA TILLBAKA FÖNSTRET
            //NewWindow.windowDiv.remove(NewWindow.windowDiv);
            //NewWindow.windowDiv.parentNode.removeChild(NewWindow.windowDiv);
        });
        
        NewWindow.windowDivFooter = document.createElement("footer");     //skapa footer-div
        NewWindow.windowDivFooter.className = "windowDivFooter";
        NewWindow.loading = document.createElement("img");
        NewWindow.loading.src = "pics/ajax-loader.gif";
        NewWindow.loading.className = "loading";
        NewWindow.windowDivFooter.appendChild(NewWindow.loading);
        NewWindow.windowDiv.appendChild(NewWindow.windowDivFooter);
        NewWindow.windowDivFooter.style.position = "absolute";               //FIXA!!
        NewWindow.windowDivFooter.style.bottom = "0px";
        NewWindow.windowDivFooter.style.left = "0px";
        NewWindow.windowDivFooter.style.right = "0px";
    
       NewWindow.line = document.getElementById("line");
       NewWindow.content.insertBefore(NewWindow.windowDiv, NewWindow.line);                //lägg in windowDiv före line
       
       
    },
    
    hideLoadingIcon: function(){
        NewWindow.loading.className = "hide";
    },
    
    insertHeaderContent: function(headerIcon, heading){
        NewWindow.windowDivHeader.insertBefore(heading, NewWindow.aClose);
        NewWindow.windowDivHeader.insertBefore(headerIcon, heading);
    },
    
    insertContent: function(windowContent){                                                 //lägg in fotogalleri i windowDiv
        NewWindow.windowDiv.insertBefore(windowContent, NewWindow.windowDivFooter);
    }
};
    
    
    
    
