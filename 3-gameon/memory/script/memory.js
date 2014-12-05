"use strict";

var Memory = {
    
    memoryNumbers: [],
    pairs: [],              
    numberOfTries: 0,
    numberOfPairs: 0,
    rows: 4,
    cols: 3,
    
    init: function(){
        
        Memory.memoryNumbers = RandomGenerator.getPictureArray(Memory.rows, Memory.cols);
        
        Memory.createTable(Memory.rows, Memory.cols);
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
                       Memory.pairs.push(img);
                    }
                    
                    if (Memory.pairs.length <= 2){
                        img.src = turnedPiece;
                    }
                    console.log(Memory.pairs[0]);
                    console.log(Memory.pairs[1]);
                    
                    if (Memory.pairs.length === 2){
                        Memory.numberOfTries += 1;
                        var result = document.getElementById("result");
                        result.innerHTML = "Antal försök: " + Memory.numberOfTries;
                        result.className = "result";
                    
                        if (Memory.pairs[0] === Memory.pairs[1]){
                            Memory.numberOfPairs += 1;
                            console.log(Memory.numberOfPairs);
                            if (Memory.numberOfPairs === (Memory.rows * Memory.cols)/2){
                                Memory.gameOver(Memory.numberOfTries);
                            }
                            Memory.pairs = [];
                        }
                        else {
                            setTimeout(function() {
                                Memory.pairs[0].src = "pics/0.png";
                                Memory.pairs[1].src = "pics/0.png";
                                Memory.pairs = [];
                            }, 1000);
                        }
                    }
                };
    },
    
    gameOver: function(numberOfTries){
        
        var finalResult = document.getElementById("result");
        finalResult.className = "result";
        finalResult.innerHTML = ("Grattis! Du behövde " + numberOfTries + " försök för att klara spelet.");
    }
};


window.onload = Memory.init;