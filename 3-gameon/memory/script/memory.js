"use strict";

var Memory = {
    
    
    memoryNumbers: [],
    pairs: [],              //array för paren
    numberOfTries: 0,
    numberOfPairs: 0,
    
    init: function(){
        
        var rows = 4;
        var cols = 4;
       
        Memory.memoryNumbers = RandomGenerator.getPictureArray(rows, cols);
        
        Memory.createTable(rows, cols);
    },   
       
    createTable: function(rows, cols){   
       var index = 0;                                               //Håller reda på vilken bild i arrayen
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
                
                Memory.turnPiece(index, a, img);
                index += 1;
            }
            }
         },
        
    turnPiece: function(index, a, img){
        
        var turnedPiece = "pics/" + Memory.memoryNumbers[index] + ".png";
               
                a.onclick = function(){ 
               
                    if (img.getAttribute("src") === "pics/0.png"){
                        Memory.pairs.push(a); 
                    }
                    
                    if (Memory.pairs.length <= 2){
                       img.setAttribute("src", turnedPiece);
                    }
                    
                    
               if (Memory.pairs.length === 2){
                    Memory.numberOfTries += 1;
                    var result = document.getElementById("result");
                    result.innerHTML = "Antal försök: " + Memory.numberOfTries;
                    
                    if(Memory.pairs[0] === Memory.pairs[1]){    //if(Memory.pairs[0].src === Memory.pairs[1].src){   ??? Funkar ej!
                      Memory.numberOfPairs += 1;
                      console.log(Memory.numberOfPairs);
                    }
                    
                    else {
                        console.log("inget par");
                        setTimeout(function() {
                            //img.src = "pics/0.png";   //Vänder endast sista bilden
                            
                         Memory.pairs[0].src = "pics/0.png";        //funkar inte alls
                      Memory.pairs[1].src = "pics/0.png";
                      Memory.pairs = [];
                        }, 1000);
                   }
                   
                   
               
                    
              }
               
               
               
              
               };
               
    },
};


window.onload = Memory.init;