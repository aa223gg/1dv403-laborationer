"use strict";

var makePerson = function(persArr){
    
    var names = [];
    var ages = [];
     
    
    names = persArr.map(function(person){return person.name}); 
    names.sort(function (a,b){return a.localeCompare(b, 'sv');});
    
    ages = persArr.map(function(person){return person.ages}); 
    ages.sort(function (a,b) {return a-b});
    
    
    var maxAge = Math.max.apply(Math, ages);
    var minAge = Math.min.apply(Math, ages);
    
    var averageAge;
    
   
    return {
        minAge: minAge, 
        maxAge: maxAge, 
        averageAge: averageAge, 
        names: names.join(", ")}; 
    
};
    
    
    
    
    
    
    
    
    



