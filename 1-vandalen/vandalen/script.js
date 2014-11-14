"use strict";

var makePerson = function(persArr){
    
    var names = [];
    var ages = [];
    var maxAge;
    var minAge;
    var agesSum;
    var averageAge;
    
    names = persArr.map(function(person){          //Hämtar ut värden från arrayen och skapar en ny array
        if (typeof person.name === "string"){       //Felhantering
            return person.name;
        }
        else{
            throw new Error("Namnet kan inte betraktas som en sträng.");
        }
    });
    
    names.sort(function (a,b){return a.localeCompare(b, 'sv');});   //Sorterar i bokstavsordning
    
    ages = persArr.map(function(person){
        if (isNaN(person.age)){
            throw new Error("Åldern kan inte betraktas som ett heltal.");
        }
        else{
            return person.age;
            }
    }); 
    
    maxAge = Math.max.apply(Math, ages);
    minAge = Math.min.apply(Math, ages);
    
    agesSum = ages.reduce(function(a, b){return a + b;});
    averageAge = Math.round(agesSum / ages.length); 
    
    return {
        minAge: minAge, 
        maxAge: maxAge, 
        averageAge: averageAge, 
        names: names.join(", ")}; 
};
    
    
    
    
    
    
    
    
    



