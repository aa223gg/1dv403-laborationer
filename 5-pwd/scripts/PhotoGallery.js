"use strict"; 


var PhotoGallery = {
    
    createPhotoGallery: function(positionLeft, positionTop){
        
        var headerIcon;
        var heading;
        
        headerIcon = document.createElement("img");                             //Skapa ikon och text för header
        headerIcon.src = "pics/icon.png";
        headerIcon.className = "left";
        heading = document.createTextNode("Fotogalleri");
        
        NewWindow.createNewWindow(positionLeft, positionTop, headerIcon, heading);
        PhotoGallery.getPictures();
        
    },
    
    
     getPictures: function() {                                                  // Läser in bilderna
        
       var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var imageArray = JSON.parse(xhr.responseText);
                    
                    PhotoGallery.createTable(imageArray);
                }
            }
        };
        
        xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
        xhr.send(null);
    },
    
    
    createTable: function(imageArray){
    
        var thumbWidthArray = [];
        var thumbHeightArray = [];
        var maxWidth;
        var maxHeight;
        var table;
        var i;
        var j;
        var row;
        var cell;
        var a;
        var thumbNail;
        var thumbURL;
        var index = 0;
        
       
        for (i = 0; i <=imageArray.length -1; i += 1){                          //Räkna ut största bredd resp största höjd på thumbNail
            thumbWidthArray.push(imageArray[i].thumbWidth);
            thumbHeightArray.push(imageArray[i].thumbHeight);
            maxWidth = Math.max.apply(Math, thumbWidthArray) + 15 + "px";
            maxHeight = Math.max.apply(Math, thumbHeightArray) + 15 + "px";
        }
        
        table = document.createElement("table");                                //Skapa tabell
        
        for (i = 1; i <= imageArray.length/3; i += 1){
            row = document.createElement("tr");
            table.appendChild(row);
            for (j = 1; j <= 3; j += 1){
                cell = document.createElement("td");
                row.appendChild(cell);
               
                thumbNail = document.createElement("img");                      //Skapa thumbNails
                thumbNail.className = "thumbNail";
                a = document.createElement("a");
                a.setAttribute("href", "#");
                thumbURL = imageArray[index].thumbURL;             
                thumbNail.src = thumbURL;
                a.appendChild(thumbNail);
                cell.appendChild(a);
                
                cell.style.backgroundColor = "#b8b8b8";                         //Skapa bakgrundsbox för bilden
                cell.style.width = maxWidth;
                cell.style.height = maxHeight;
                
                PhotoGallery.clickThumbNail(imageArray[index].URL, a);
                
                index += 1;
            }
        }
        
        PhotoGallery.getContent(table);
    },
    
    
    clickThumbNail: function(image, a) {
        
        a.addEventListener("click", function(){                                 //Onclick på bilderna som ändrar bakgrunden
            PhotoGallery.setBackground(image);
        });
    },
    
    
    getContent: function(table) {
        
        NewWindow.insertContent(table);                            
        
        NewWindow.hideFooter();
    },
    
   
    setBackground: function(image) {
       
        var background;
        background = document.getElementById("content");
        
        background.style.backgroundImage = "url("+image+")";                    //Ändra bakgrundsbild
    }
};

