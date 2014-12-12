"use strict"; 

window.onload = function(){
    
   
    
    document.getElementById("button").addEventListener("click", function(){     //Onclick på startknappen
        getQuestion("http://vhost3.lnu.se:20080/question/1");
    });
        
    var questionNumber = 0;
    var numberOfTries = 1;
    
    function getQuestion(questionURL){
        
        var xhr = new XMLHttpRequest();                                         //Hämta frågan
        
        xhr.onreadystatechange = function() {
           
           
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var text = JSON.parse(xhr.responseText);
                    document.getElementById("question").innerHTML = text.question;
                    questionNumber +=1;
                    document.getElementById("start").innerHTML = "Fråga nr: " + questionNumber;
                    
                    createResponseArea(text.nextURL, text.id, questionNumber);
                }
            }
         };
         
        xhr.open("GET", questionURL, true);
        xhr.send(null);
        
        
        
    }
    
        function createResponseArea(nextURL, answerID, questionNumber){
            var input = document.createElement("input");                            //Skapa textruta för svar
            input.type = "text";
            var response = document.getElementById("answer");
            response.innerHTML = "";
            response.appendChild(input);
            response.focus();                                                       //FUNKAR EJ
            
            var sendButton = document.createElement("input");                       //Skapa knapp "Svara"
            sendButton.type = "button";
            sendButton.value = "Svara";
            var a = document.createElement("a");
            a.appendChild(sendButton);
            response.appendChild(a);
            
            
            sendButton.addEventListener("click", function(e){                        //Oncklick på "Svara"
                e.preventDefault();
                sendAnswer(nextURL, answerID, questionNumber);
            });
            
            input.addEventListener("keypress", function(e){                         //Svara med enter
                if(!e) e = window.event;
                if (e.keyCode === 13){
                    sendAnswer(nextURL, answerID, questionNumber);
                }
        });
        
        function sendAnswer(nextURL, answerID, questionNumber){
            
            var xhrAnswer = new XMLHttpRequest();
         
                xhrAnswer.onreadystatechange = function() {
           
                    if (xhrAnswer.readyState === 4){
                        if (xhrAnswer.status === 200){
                            var answerText = JSON.parse(xhrAnswer.responseText);
                            correctAnswer(answerText.nextURL, numberOfTries, questionNumber);
                            
                        }
                        else {
                            
                            numberOfTries += 1;
                            wrongAnswer(answerID);
                        }
                    }
                };
        
                xhrAnswer.open("POST", nextURL, true);                                  //Skicka svaret
                xhrAnswer.setRequestHeader("Content-Type", "application/json");
        
                var answer = {answer: input.value};
                xhrAnswer.send(JSON.stringify(answer));
                
                
        }
        
        function correctAnswer(nextQuestionURL, numberOfTries, questionNumber){
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("question").innerHTML = "Rätt svar!";
            var result = document.getElementById("result");
            var resultPerQuestion = document.createTextNode("Du klarade fråga " + questionNumber + " på " + numberOfTries + " försök.");
            result.appendChild(resultPerQuestion);
            numberOfTries = 0;
            
            var nextQuestion = document.createElement("input");                       //Skapa knapp "Nästa fråga"
            nextQuestion.type = "button";
            nextQuestion.value = "Nästa fråga";
            var aNext = document.createElement("a");
            aNext.appendChild(nextQuestion);
            document.getElementById("answer").appendChild(aNext);
            
            nextQuestion.addEventListener("click", function(e){                        //Oncklick på "Nästa fråga"
                e.preventDefault();
                if (nextQuestionURL === undefined){
                    gameOver();
                }
                else {
                getQuestion(nextQuestionURL);
                }
                
            });
            
        }
            
        function wrongAnswer(answerID){
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("question").innerHTML = "Fel.";
            
            var tryAgain = document.createElement("input");                       //Skapa knapp "Försök igen"
            tryAgain.type = "button";
            tryAgain.value = "Försök igen";
            var aNext = document.createElement("a");
            aNext.appendChild(tryAgain);
            document.getElementById("answer").appendChild(aNext);
            
            tryAgain.addEventListener("click", function(e){                        //Oncklick på "Nästa fråga"
                e.preventDefault();
                getQuestion("http://vhost3.lnu.se:20080/question/" + answerID);
                
            });
        }
        
        function gameOver() {
            document.getElementById("question").innerHTML = "Grattis! Du har klarat alla frågor!";
            document.getElementById("answer").innerHTML = "";
        }
        
        }
        
        
        
    };
    
