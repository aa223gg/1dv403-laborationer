{"changed":true,"filter":false,"title":"memory.js","tooltip":"/3-gameon/memory/script/memory.js","value":"\"use strict\";\n\nvar Memory = {\n    \n    memoryNumbers: [],\n    pictures: [],              \n    numberOfTries: 0,\n    numberOfPairs: 0,\n    rows: 3,\n    cols: 4,\n    \n    init: function(){\n        \n        Memory.memoryNumbers = RandomGenerator.getPictureArray(Memory.rows, Memory.cols);   //Array med slumpade nummer\n        \n        Memory.createTable(Memory.rows, Memory.cols);\n    },   \n       \n    createTable: function(rows, cols){   \n       var index = 0;                                               //Håller reda på vilket nummer i arrayen\n       var table = document.createElement(\"table\");                 //Skapa tabell\n        \n        for (var i = 1; i <= rows; i += 1){\n            var row = document.createElement(\"tr\");                 //Skapa tabellrad\n            table.appendChild(row);                                 //Lägg rad i tabell\n            \n            for (var j = 1; j <= cols; j += 1){\n                var cell = document.createElement(\"td\");            //Skapa celler\n                row.appendChild(cell);                              //Lägg celler i raden\n               \n                var img = document.createElement(\"img\");            //Skapa bild\n                img.src = \"pics/0.png\";                             //Hämta baksidebilden\n                \n                var a = document.createElement(\"a\");                //Skapa a-tagg\n                a.setAttribute(\"href\", \"#\");\n                a.appendChild(img);                                 //Lägg bilden i a-taggen\n               \n                cell.appendChild(a);                               //Lägg a-taggen i cellen\n                \n                var boardgame = document.getElementById(\"boardgame\");\n                boardgame.appendChild(table);\n                \n                Memory.turnPiece(index, a, img);\n                index += 1;\n            }\n            }\n         },\n        \n    turnPiece: function(index, a, img){\n        \n        var turnedPiece = \"pics/\" + Memory.memoryNumbers[index] + \".png\";  \n        \n                a.onclick = function(){ \n               \n                    if (img.getAttribute(\"src\") === \"pics/0.png\"){              \n                       Memory.pictures.push(img);                               //Bilden läggs till i arrayen\n                    }\n                    \n                    if (Memory.pictures.length <= 2){                           //Så länge det finns en eller två bilder i arrayen vänds bilden\n                        img.src = turnedPiece;                                  \n                    }\n                    \n                    if (Memory.pictures.length === 2){                          //Antal försök räknas\n                        Memory.numberOfTries += 1;\n                        var result = document.getElementById(\"result\");\n                        result.innerHTML = \"Antal försök: \" + Memory.numberOfTries;\n                        \n                        if (Memory.pictures[0].src === Memory.pictures[1].src){     //Antal par räknas\n                            Memory.numberOfPairs += 1;\n                            console.log(Memory.numberOfPairs);\n                            if (Memory.numberOfPairs === (Memory.rows * Memory.cols)/2){\n                                Memory.gameOver(Memory.numberOfTries);\n                            }\n                            Memory.pictures = [];\n                        }\n                        else {\n                            setTimeout(function() {                             //Om bilderna inte är lika vänds de tillbaka\n                                Memory.pictures[0].src = \"pics/0.png\";\n                                Memory.pictures[1].src = \"pics/0.png\";\n                                Memory.pictures = [];\n                            }, 1000);\n                        }\n                    }\n                };\n    },\n    \n    gameOver: function(numberOfTries){\n        \n        var finalResult = document.getElementById(\"result\");                    //Resultatet redovisas\n        finalResult.innerHTML = (\"Grattis! Du behövde \" + numberOfTries + \" försök för att klara spelet.\");\n    }\n};\n\nwindow.onload = Memory.init;","undoManager":{"mark":-1,"position":7,"stack":[[{"group":"doc","deltas":[{"start":{"row":13,"column":8},"end":{"row":13,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":9},"end":{"row":13,"column":10},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":8},"end":{"row":15,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":9},"end":{"row":15,"column":10},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":9},"end":{"row":15,"column":10},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":8},"end":{"row":15,"column":9},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":9},"end":{"row":13,"column":10},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":8},"end":{"row":13,"column":9},"action":"remove","lines":["/"]}]}]]},"ace":{"folds":[],"scrolltop":90,"scrollleft":0,"selection":{"start":{"row":13,"column":8},"end":{"row":13,"column":8},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":17,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1417777222000}