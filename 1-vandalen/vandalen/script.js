"use strict";

var makePerson = function(persArr){
    
    var names = [];
    var ages = [];
    var maxAge;
    var minAge;
    var agesSum;
    var averageAge;
    
    names = persArr.map(function(person){return person.name});      //Hämtar ut namnen från arrayen och sorterar i ny array
    names.sort(function (a,b){return a.localeCompare(b, 'sv');});   //Sorterar i bokstavsordning
    
    ages = persArr.map(function(person){return person.age}); 
    ages.sort();
    
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
    
    
    
    
    
    
    
    
    



