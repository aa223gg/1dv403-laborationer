"use strict"; 


var PhotoGallery = {
    
   
    
    createPhotoGallery: function(positionLeft, positionTop){
        console.log("testa createPhotoGallery");
        NewWindow.createNewWindow(positionLeft, positionTop);
        PhotoGallery.getPictures();
        
    },
    
    createTable: function(imageArray){
    
        var table;
        var row;
        var cell;
        var i;
        var j;
        var thumbNail;
        var thumbURL;
        var a;
        var index = 0;
        
        table = document.createElement("table");
        
        for (i = 1; i <= imageArray.length/3; i += 1){
            row = document.createElement("tr");
            table.appendChild(row);
            for (j = 1; j <= 3; j += 1){
                cell = document.createElement("td");
                row.appendChild(cell);
                
                thumbNail = document.createElement("img");
                a = document.createElement("a");
                a.setAttribute("href", "#");
                thumbURL = imageArray[index].thumbURL;
                thumbNail.src = thumbURL;
                a.appendChild(thumbNail);
                cell.appendChild(a);
                
                index += 1;
            }
        }
        
        
       NewWindow.insertContent(table);                      //lägg tabellen i windowDiv
        
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

