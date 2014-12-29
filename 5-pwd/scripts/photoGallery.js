"use strict"; 


var PhotoGallery = {
    
   table: null,
   heading: null,
   headerIcon: null,
    
    createPhotoGallery: function(positionLeft, positionTop){
        console.log("testa createPhotoGallery");
        NewWindow.createNewWindow(positionLeft, positionTop);
        PhotoGallery.getPictures();
        
    },
    
    createTable: function(imageArray){
    
        var row;
        var cell;
        var i;
        var j;
        var thumbNail;
        var thumbURL;
        var a;
        var index = 0;
        // var thumbWidthArray = [];
        // var thumbHeightArray = [];
        // var maxWidth;
        // var maxHeight;
        
        // for (i = 0; i <=imageArray.length -1; i += 1){
        //     thumbWidthArray.push(imageArray[i].thumbWidth);
        //     thumbHeightArray.push(imageArray[i].thumbHeight);
        //     maxWidth = Math.max.apply(Math, thumbWidthArray) + 10;
        //     maxHeight = Math.max.apply(Math, thumbHeightArray) + 10;
        // }
        
            
        
        PhotoGallery.table = document.createElement("table");
        
        for (i = 1; i <= imageArray.length/3; i += 1){
            row = document.createElement("tr");
            PhotoGallery.table.appendChild(row);
            for (j = 1; j <= 3; j += 1){
                cell = document.createElement("td");
                row.appendChild(cell);
                
                cell.className = "cell";
                thumbNail = document.createElement("img");
                a = document.createElement("a");
                a.setAttribute("href", "#");
                thumbURL = imageArray[index].thumbURL;
                thumbNail.src = thumbURL;
                a.appendChild(thumbNail);
                cell.appendChild(a);
                
                cell.style.backgroundColor = "#b8b8b8";
                cell.style.border = "solid 5px #b8b8b8";
                //cell.style.width = maxWidth;
                //cell.style.height = maxHeight;
                // cell.style.alignContent = "center";         
                
                index += 1;
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
        
        
    }
};

