"use strict"; 


var PhotoGallery = {
    
   table: null,
   heading: null,
   headerIcon: null,
   a: null,
   cell: null,
   thumbNail: null,
   index: 0,
    
    createPhotoGallery: function(positionLeft, positionTop){
        console.log("testa createPhotoGallery");
        NewWindow.createNewWindow(positionLeft, positionTop);
        PhotoGallery.getPictures();
    },
    
    createTable: function(imageArray){
    
        var row;
        //var cell;
        var i;
        var j;
        //var thumbNail;
        var thumbURL;
        //var a;
        //var index = 0;
        var thumbWidthArray = [];
        var thumbHeightArray = [];
        var maxWidth;
        var maxHeight;
        
        for (i = 0; i <=imageArray.length -1; i += 1){                      //Räkna ut största bredd resp största höjd
            thumbWidthArray.push(imageArray[i].thumbWidth);
            thumbHeightArray.push(imageArray[i].thumbHeight);
            maxWidth = Math.max.apply(Math, thumbWidthArray) + 15 + "px";
            maxHeight = Math.max.apply(Math, thumbHeightArray) + 15 + "px";
        }
        
        PhotoGallery.table = document.createElement("table");               //Skapa tabell
        
        for (i = 1; i <= imageArray.length/3; i += 1){
            row = document.createElement("tr");
            PhotoGallery.table.appendChild(row);
            for (j = 1; j <= 3; j += 1){
                PhotoGallery.cell = document.createElement("td");
                row.appendChild(PhotoGallery.cell);
                
                PhotoGallery.cell.className = "cell";
                PhotoGallery.thumbNail = document.createElement("img");
                PhotoGallery.a = document.createElement("a");
                PhotoGallery.a.setAttribute("href", "#");
                thumbURL = imageArray[PhotoGallery.index].thumbURL;             //????
                PhotoGallery.thumbNail.src = thumbURL;
                PhotoGallery.a.appendChild(PhotoGallery.thumbNail);
                PhotoGallery.cell.appendChild(PhotoGallery.a);
                
                PhotoGallery.cell.style.backgroundColor = "#b8b8b8";                     //Skapa bakgrundsbox för bilden
                PhotoGallery.cell.style.width = maxWidth;
                PhotoGallery.cell.style.height = maxHeight;
                //cell.style.align = "center";                          //CENTRERA!
                //cell.style.valign = "middle";
                
                
                PhotoGallery.a.addEventListener("click", function(){
                    
                    PhotoGallery.setBackground(imageArray);
                });
                
                
                PhotoGallery.index += 1;
            }
        }
        PhotoGallery.getContent();
    },
    
    getContent: function() {
        PhotoGallery.headerIcon = document.createElement("img");
        PhotoGallery.headerIcon.src = "pics/icon.png";
        PhotoGallery.headerIcon.className = "left";
        PhotoGallery.heading = document.createTextNode("Fotogalleri");
        
        NewWindow.insertHeaderContent(PhotoGallery.headerIcon, PhotoGallery.heading);
        
        NewWindow.insertContent(PhotoGallery.table);                      //lägg tabellen i windowDiv
        
        NewWindow.hideLoadingIcon();
        
        
        
    },
    
    getPictures: function() {
        console.log("testa getPictures");
        
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
    
    setBackground: function(imageArray) {
        console.log("testa setBackground");
        
        var background;
        var i;
        var count = 0;
        
        background = document.getElementById("content");
        
        for (i = 0; i <= imageArray.length -1; i += 1){
            
            var URL = imageArray[count].URL;
            //console.log(URL);
            count += 1;
            background.style.backgroundImage = "url(http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/pics/1050509.jpg)";  //test
        }
        
        
        
    }
};

