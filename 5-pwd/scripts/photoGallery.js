"use strict"; 


var PhotoGallery = {
    
   table: null,
   heading: null,
   headerIcon: null,
   a: null,
   row: null,
   cell: null,
   thumbNail: null,
   thumbURL: null,
   thumbWidthArray: [],
   thumbHeightArray: [],
   maxWidth: null, 
   maxHeight: null,
   
    
    createPhotoGallery: function(positionLeft, positionTop){
        
        NewWindow.createNewWindow(positionLeft, positionTop);
        PhotoGallery.getPictures();
    },
    
    
     getPictures: function() {                                                 // Läser in bilderna
        
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
    
        var i;
        var j;
        var index = 0;
        
        
        for (i = 0; i <=imageArray.length -1; i += 1){                          //Räkna ut största bredd resp största höjd
            PhotoGallery.thumbWidthArray.push(imageArray[i].thumbWidth);
            PhotoGallery.thumbHeightArray.push(imageArray[i].thumbHeight);
            PhotoGallery.maxWidth = Math.max.apply(Math, PhotoGallery.thumbWidthArray) + 15 + "px";
            PhotoGallery.maxHeight = Math.max.apply(Math, PhotoGallery.thumbHeightArray) + 15 + "px";
        }
        
        PhotoGallery.table = document.createElement("table");                   //Skapa tabell
        
        for (i = 1; i <= imageArray.length/3; i += 1){
            PhotoGallery.row = document.createElement("tr");
            PhotoGallery.table.appendChild(PhotoGallery.row);
            for (j = 1; j <= 3; j += 1){
                PhotoGallery.cell = document.createElement("td");
                PhotoGallery.row.appendChild(PhotoGallery.cell);
                
               
                PhotoGallery.thumbNail = document.createElement("img");         //Skapa thumbNails
                PhotoGallery.thumbNail.className = "thumbNail";
                PhotoGallery.a = document.createElement("a");
                PhotoGallery.a.setAttribute("href", "#");
                PhotoGallery.thumbURL = imageArray[index].thumbURL;             
                PhotoGallery.thumbNail.src = PhotoGallery.thumbURL;
                PhotoGallery.a.appendChild(PhotoGallery.thumbNail);
                PhotoGallery.cell.appendChild(PhotoGallery.a);
                
                PhotoGallery.cell.style.backgroundColor = "#b8b8b8";            //Skapa bakgrundsbox för bilden
                PhotoGallery.cell.style.width = PhotoGallery.maxWidth;
                PhotoGallery.cell.style.height = PhotoGallery.maxHeight;
                
                PhotoGallery.clickThumbNail(imageArray[index].URL);
                
                index += 1;
            }
        }
        
        PhotoGallery.getContent();
    },
    
    
    clickThumbNail: function(image) {
        
        PhotoGallery.a.addEventListener("click", function(){                    //Onclick på bilderna som ändrar bakgrunden
            PhotoGallery.setBackground(image);
        });
    },
    
    
    getContent: function() {
        PhotoGallery.headerIcon = document.createElement("img");                //Skapa ikon och text för header
        PhotoGallery.headerIcon.src = "pics/icon.png";
        PhotoGallery.headerIcon.className = "left";
        PhotoGallery.heading = document.createTextNode("Fotogalleri");
        
        NewWindow.insertHeaderContent(PhotoGallery.headerIcon, PhotoGallery.heading);
        
        NewWindow.insertContent(PhotoGallery.table);                            
        
        NewWindow.hideFooter();
    },
    
   
    setBackground: function(image) {
       
        var background;
        background = document.getElementById("content");
        
        background.style.backgroundImage = "url("+image+")";                    //Ändra bakgrundsbild
    }
};

