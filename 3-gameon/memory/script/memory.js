"use strict";

var Memory = {
    
    //Skapa en egenskap på ditt objekt som senare kommer att referera till den utslumpade arrayen. (jmfr. messages-arrayen i Laboration 2)
    memoryNumbers: [],
    
    init: function(){
        //I init-metoden anropar du arrayslumpsmetoden och sparar resultatet i egenskapen du skapade i 4an.
        var rows = 4;
        var cols = 4;
        var pictureArray = {};
        pictureArray = new RandomGenerator.getPictureArray(rows, cols);
        Memory.memoryNumbers.push(pictureArray);
        
       var table = document.createElement("table");
        
        for (var i = 0; i <= rows; i += 1){
            var row = document.createElement("tr");
            table.appendChild(row);
            for (var j = 0; j <= cols; j += 1){
                var cell = document.createElement("td");
                row.appendChild(cell);
                var img = document.createElement("img");
                img.src = "pics/0.png"; 
                cell.appendChild(img);
            }
        }
        console.log(table);
        
        
        var content = document.getElementById("content");
        content.appendChild(table);
    }
};

window.onload = Memory.init;