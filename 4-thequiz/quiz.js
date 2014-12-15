"use strict";

var Quiz = {
    
    questionNumber: 1,
    numberOfTries: 1,
    answerURL: null,
    input: null,
    answerID: null,
    questionResult: [],
    
    startGame : function(){
       
        document.getElementById("button").addEventListener("click", function(){     //Onclick på startknappen
        Quiz.getQuestion("http://vhost3.lnu.se:20080/question/1");
        });
    },
    
    getQuestion: function(questionURL){
        
        var xhr = new XMLHttpRequest();                                         //Hämta frågan
        
        xhr.onreadystatechange = function() {
           
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var text = JSON.parse(xhr.responseText);                    //Sträng med texten vi fick från servern
                    document.getElementById("question").innerHTML = text.question;
                    document.getElementById("start").innerHTML = "";                                                             
                    document.getElementById("questionNumber").innerHTML = "Fråga nr: " + Quiz.questionNumber;
                    Quiz.answerURL = text.nextURL;
                    Quiz.answerID = text.id;
                    
                    Quiz.createResponseArea(); 
                }
            }
         };
         
        xhr.open("GET", questionURL, true);
        xhr.send(null);
    },
    
    createResponseArea: function() {  
        
        Quiz.input = document.createElement("input");                            //Skapa textruta för svar
            Quiz.input.type = "text";
            var response = document.getElementById("answer");
            response.innerHTML = "";
            response.appendChild(Quiz.input);
            Quiz.input.focus();                                                 
            
            var sendButton = document.createElement("input");                   //Skapa knapp "Svara"
            sendButton.type = "button";
            sendButton.value = "Svara";
            var a = document.createElement("a");
            a.appendChild(sendButton);
            response.appendChild(a);
            
            sendButton.addEventListener("click", function(e){                    //Oncklick på "Svara"
                e.preventDefault();
                Quiz.sendAnswer(); 
            });
            
            Quiz.input.addEventListener("keypress", function(e){                //Svara med enter
                if(!e) e = window.event;
                if (e.keyCode === 13){
                    Quiz.sendAnswer(); 
                }
            });
    },
    
    sendAnswer: function(){     
        
        var xhrAnswer = new XMLHttpRequest();                                   //Skicka svaret
         
                xhrAnswer.onreadystatechange = function() {
           
                    if (xhrAnswer.readyState === 4){
                        if (xhrAnswer.status === 200){                          //Vid rätt svar anropas correctAnswer och nextURL skickas med
                            var answerText = JSON.parse(xhrAnswer.responseText);
                            Quiz.correctAnswer(answerText.nextURL); 
                        }
                        else {
                            Quiz.numberOfTries += 1;                            //Vid fel svar ökas antal försök med ett och wrongAnswer anropas
                            Quiz.wrongAnswer();  
                        }
                    }
                };
        
                xhrAnswer.open("POST", Quiz.answerURL, true);                                  
                xhrAnswer.setRequestHeader("Content-Type", "application/json");
        
                var answer = {answer: Quiz.input.value};
                xhrAnswer.send(JSON.stringify(answer));
    },
    
    correctAnswer: function(nextQuestionURL){  
                     
        document.getElementById("answer").innerHTML = "";                       //Text vid rätt svar
        document.getElementById("question").innerHTML = "Rätt svar!";
        
        var resultObject = {tries: Quiz.numberOfTries, number: Quiz.questionNumber};    //Skapa resultatobjekt med antal försök och frågans nummer och lägg i arrayen
        Quiz.questionResult.push(resultObject);
           
        Quiz.numberOfTries = 1;                                                 //Återställ antal försök till 1 inför nästa fråga
        
        var nextQuestion = document.createElement("input");                     //Skapa knapp "Nästa fråga"
        nextQuestion.type = "button";
        nextQuestion.value = "Nästa fråga";
        var aNext = document.createElement("a");
        aNext.appendChild(nextQuestion);
        document.getElementById("answer").appendChild(aNext);
          
        nextQuestion.addEventListener("click", function(e){                     //Oncklick på "Nästa fråga"
            e.preventDefault();
            if (nextQuestionURL === undefined){
                Quiz.gameOver();
            }
            else {
                Quiz.questionNumber += 1;
                Quiz.getQuestion(nextQuestionURL);
            }
        });
    },
    
    wrongAnswer: function(){  
    
        document.getElementById("answer").innerHTML = "";                       //Text vid fel svar
        document.getElementById("question").innerHTML = "Fel.";
            
        var tryAgain = document.createElement("input");                         //Skapa knapp "Försök igen"
        tryAgain.type = "button";
        tryAgain.value = "Försök igen";
        var aNext = document.createElement("a");
        aNext.appendChild(tryAgain);
        document.getElementById("answer").appendChild(aNext);
            
        tryAgain.addEventListener("click", function(e){                         //Oncklick på "Försök igen"
            e.preventDefault();
            Quiz.getQuestion("http://vhost3.lnu.se:20080/question/" + Quiz.answerID);
        });
    },
    
    gameOver: function() {
        document.getElementById("start").innerHTML = "";                        //Text när man klarat alla frågor
        document.getElementById("question").innerHTML = "Grattis! Du har klarat alla frågor!";
        document.getElementById("answer").innerHTML = "";
            
        for (var i = 0; i < Quiz.questionNumber; i += 1){                       //Resultatet med antal försök per fråga redovisas
            var resultPerQuestion = document.createTextNode("Du klarade fråga " + Quiz.questionResult[i].number + " på " + Quiz.questionResult[i].tries + " försök.");
            var result = document.getElementById("result");
            var br = document.createElement("br");
            result.appendChild(br);
            result.appendChild(resultPerQuestion);
        }
            
        var start = document.getElementById("result");
        var startAgain = document.createElement("input");                       //Skapa knapp "Starta ny omgång"
        startAgain.type = "button";
        startAgain.value = "Starta ny omgång";
        var aNew = document.createElement("a");
        aNew.appendChild(startAgain);
        start.appendChild(aNew);
            
        startAgain.addEventListener("click", function(e){                       //Oncklick på "Starta ny omgång"
            e.preventDefault();
            document.getElementById("result").innerHTML = "";
            Quiz.questionNumber = 1; 
            Quiz.numberOfTries = 1;
            Quiz.questionResult = [];
            Quiz.getQuestion("http://vhost3.lnu.se:20080/question/1");
        });
    }
    
};

window.onload = Quiz.startGame();