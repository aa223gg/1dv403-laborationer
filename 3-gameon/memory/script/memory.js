"use strict";

var Memory = {
    
    memoryNumbers: [],
    pictures: [],              
    numberOfTries: 0,
    numberOfPairs: 0,
    rows: 2,
    cols: 3,
    
    init: function(){
        
        Memory.memoryNumbers = RandomGenerator.getPictureArray(Memory.rows, Memory.cols);   //Array med slumpade nummer
        
        Memory.createTable(Memory.rows, Memory.cols);
    },   
       
    createTable: function(rows, cols){   
       var index = 0;                                               //Håller reda på vilket nummer i arrayen
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
                       Memory.pictures.push(img);                               //Bilden läggs till i arrayen
                    }
                    
                    if (Memory.pictures.length <= 2){                           //Så länge det finns en eller två bilder i arrayen vänds bilden
                        img.src = turnedPiece;                                  
                    }
                    
                    if (Memory.pictures.length === 2){                          //Antal försök räknas
                        Memory.numberOfTries += 1;
                        var result = document.getElementById("result");
                        result.innerHTML = "Antal försök: " + Memory.numberOfTries;
                        
                        if (Memory.pictures[0].src === Memory.pictures[1].src){     //Antal par räknas
                            Memory.numberOfPairs += 1;
                            console.log(Memory.numberOfPairs);
                            if (Memory.numberOfPairs === (Memory.rows * Memory.cols)/2){
                                Memory.gameOver(Memory.numberOfTries);
                            }
                            Memory.pictures = [];
                        }
                        else {
                            setTimeout(function() {                             //Om bilderna inte är lika vänds de tillbaka
                                Memory.pictures[0].src = "pics/0.png";
                                Memory.pictures[1].src = "pics/0.png";
                                Memory.pictures = [];
                            }, 1000);
                        }
                    }
                };
    },
    
    gameOver: function(numberOfTries){
        
        var finalResult = document.getElementById("result");                    //Resultatet redovisas
        finalResult.innerHTML = ("Grattis! Du behövde " + numberOfTries + " försök för att klara spelet.");
    }
};

window.onload = Memory.init;