"use strict"; 


var PhotoGallery = {
    
   
    
    createPhotoGallery: function(positionLeft, positionTop){
        console.log("testa createPhotoGallery");
        NewWindow.createNewWindow(positionLeft, positionTop);
        PhotoGallery.getPictures();
        
    },
    
    createTable: function(imageArray){
    
        var table;
        var rows = 5;           
        var cols = 4;
        var row;
        var cell;
        var i;
        var j;
        var img;
        var a;
        
        table = document.createElement("table");
        
        for (i = 1; i <= 10;i += 1){
            row = document.createElement("tr");
            table.appendChild(row);
            for (j = 1; j <= 3; j += 1){
                cell = document.createElement("td");
                row.appendChild(cell);
                
                var thumbNail = document.createElement("img");
                console.log(thumbURL);
                var thumbURL = imageArray[i].thumbURL;
                thumbNail.src = thumbURL;
                cell.appendChild(thumbNail);
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

