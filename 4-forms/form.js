"use strict"; 

window.onload = function(){
    
   
    
    document.getElementById("button").addEventListener("click", function(){     //Onclick på startknappen
        getQuestion("http://vhost3.lnu.se:20080/question/1");
    });
        
    
    function getQuestion(questionURL){
        
        var xhr = new XMLHttpRequest();                                         //Hämta frågan
         
        xhr.onreadystatechange = function() {
           
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var text = JSON.parse(xhr.responseText);
                    document.getElementById("question").innerHTML = text.question;
                    
                    createResponseArea(text.nextURL);
                }
            }
         };
         
        xhr.open("GET", questionURL, true);
        xhr.send(null);
        
        
        
    }
    
        function createResponseArea(nextURL){
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
                sendAnswer(nextURL);
            });
            
            input.addEventListener("keypress", function(e){                         //Svara med enter
                if(!e) e = window.event;
                if (e.keyCode === 13){
                    sendAnswer(nextURL);
                }
        });
        
        function sendAnswer(nextURL){
            
            var xhrAnswer = new XMLHttpRequest();
         
                xhrAnswer.onreadystatechange = function() {
           
                    if (xhrAnswer.readyState === 4){
                        if (xhrAnswer.status === 200){
                            var answerText = JSON.parse(xhrAnswer.responseText);
                            correctAnswer(answerText.nextURL);
                            
                        }
                        else {
                            console.log(getQuestion.text);
                            wrongAnswer();
                        }
                    }
                };
        
                xhrAnswer.open("POST", nextURL, true);                                  //Skicka svaret
                xhrAnswer.setRequestHeader("Content-Type", "application/json");
        
                var answer = {answer: input.value};
                xhrAnswer.send(JSON.stringify(answer));
                
                
        }
        
        function correctAnswer(nextQuestionURL){
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("question").innerHTML = "Rätt svar!";
            
            var nextQuestion = document.createElement("input");                       //Skapa knapp "Nästa fråga"
            nextQuestion.type = "button";
            nextQuestion.value = "Nästa fråga";
            var aNext = document.createElement("a");
            aNext.appendChild(nextQuestion);
            document.getElementById("answer").appendChild(aNext);
            
            nextQuestion.addEventListener("click", function(e){                        //Oncklick på "Nästa fråga"
                e.preventDefault();
                
                
            });
            
        }
            
        function wrongAnswer(){
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("answer").innerHTML = "Fel. Försök igen.";
            
            //getQuestion(samma URL);
        }
        
        }
        
        
        
    };
    
