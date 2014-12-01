"use strict";

var Memory = {
    
    //Skapa en egenskap på ditt objekt som senare kommer att referera till den utslumpade arrayen. (jmfr. messages-arrayen i Laboration 2)
    memoryNumbers: [],
    
    init: function(){
        //I init-metoden anropar du arrayslumpsmetoden och sparar resultatet i egenskapen du skapade i 4an.
        var rows = 4;
        var cols = 4;
        Memory.memoryNumbers = RandomGenerator.getPictureArray(rows, cols);
        
        Memory.createTable(rows, cols, Memory.memoryNumbers);
    },   
       
    createTable: function(rows, cols, memoryNumbers){   
       var k = 0;
       var table = document.createElement("table");                 //Skapa tabell
        
        for (var i = 1; i <= rows; i += 1){
            var row = document.createElement("tr");                 //Skapa tabellrad
            table.appendChild(row);                                 //Lägg rad i tabell
            
            for (var j = 1; j <= cols; j += 1){
                var cell = document.createElement("td");            //Skapa celler
                row.appendChild(cell);                              //Lägg celler i raden
               
                var img = document.createElement("img");            //Skapa bild
                img.src = "pics/0.png";                             //Hämta baksidebilden
                
                var a = document.createElement("a");                //Skapa a-tagg
                a.setAttribute("href", "#");
                a.appendChild(img);                                 //Lägg bilden i a-taggen
               
                cell.appendChild(a);                               //Lägg a-taggen i cellen
                
                var boardgame = document.getElementById("boardgame");
                boardgame.appendChild(table);
                
                a.addEventListener("click", Memory.turnPiece);
                }
            }
         },
        
    turnPiece: function(){
               
    },
};


window.onload = Memory.init;