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
    windContent: null,

    createNewWindow: function(positionLeft, positionTop, icon, header) {

        NewWindow.content = document.getElementById("content");

        NewWindow.windowDiv = document.createElement("div");                    //Skapa nytt fönster, ange position
        NewWindow.windowDiv.className = "windowDiv";
        NewWindow.windowDiv.style.left = positionLeft + "px";
        NewWindow.windowDiv.style.top = positionTop + "px";

        NewWindow.windowDivHeader = document.createElement("header");           //Skapa header
        NewWindow.windowDivHeader.className = "windowDivHeader";
        NewWindow.windowDivHeader.appendChild(icon);
        NewWindow.windowDivHeader.appendChild(header);

        NewWindow.windContent = document.createElement("div");                  //Skapa div för innehåll
        NewWindow.windContent.className = "windContent";

        NewWindow.windowDiv.appendChild(NewWindow.windowDivHeader);             //Lägg header och innehåll i WindowDiv
        NewWindow.windowDiv.appendChild(NewWindow.windContent);

        NewWindow.iconClose = document.createElement("img");                    //Skapa close-ikon och lägg i header
        NewWindow.iconClose.src = "pics/close-icon.svg";
        NewWindow.iconClose.className = "iconClose";
        NewWindow.aClose = document.createElement("a");
        NewWindow.aClose.setAttribute("href", "#");
        NewWindow.aClose.appendChild(NewWindow.iconClose);
        NewWindow.windowDivHeader.appendChild(NewWindow.aClose);

        NewWindow.aClose.addEventListener("click", function() {                 //Onclick på close-ikonen
            NewWindow.content.removeChild(NewWindow.windowDiv);
        });

        NewWindow.windowDivFooter = document.createElement("footer");           //Skapa footer med loading-ikon
        NewWindow.windowDivFooter.className = "windowDivFooter";
        NewWindow.loading = document.createElement("img");
        NewWindow.loading.src = "pics/ajax-loader.gif";
        NewWindow.loading.className = "right";
        NewWindow.windowDivFooter.appendChild(NewWindow.loading);
        NewWindow.windowDiv.appendChild(NewWindow.windowDivFooter);

        NewWindow.line = document.getElementById("line");
        NewWindow.content.insertBefore(NewWindow.windowDiv, NewWindow.line);    //Lägg in windowDiv före line

    },

    
    insertContent: function(windowContent) {                                    //lägg in innehåll 
        NewWindow.windContent.appendChild(windowContent);
    },
    
    
    hideFooter: function() {                                                    //Göm footer när bilderna laddats in
        NewWindow.windowDivFooter.className = "hide";
    }

};
