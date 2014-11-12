"use strict";

window.onload = function(){

	
	var birthday = function(date){
		
			// Din kod här.
		var birthdayDate = new Date(date);			//Skapa nytt datumobjekt när användaren fyller år
		if (isNaN(birthdayDate.valueOf()))			//Kontrollera så att datumet är skrivet i rätt format.
 		{
  			throw new Error("Skriv in datum i formen 'ÅÅÅÅ-MM-DD'");
 		}  
		
		var now = new Date();							//Skapa nytt datumobjekt med dagens datum
		now.setHours(0);								//Sätt dagens timmar till 0
		birthdayDate.setFullYear(now.getFullYear());    //Ändra inläst år till nuvarande år
			console.log(birthdayDate);
			
		if ((birthdayDate.getTime() - now.getTime()) < 0){		//Om antalet dagar kvar är mindre än 0 har användaren redan fyllt år
			birthdayDate.setFullYear(now.getFullYear()+1);		//Ändra året till nästkommande år
		}
		
		var msLeft = birthdayDate.getTime() - now.getTime();	//Antalet millisekunder kvar till födelsedagen
		var daysLeft = msLeft/(1000 * 60 * 60 * 24);			//Omvandla till dagar
		var daysLeftRounded = Math.round(daysLeft);				//Avrunda till heltal
		
		return daysLeftRounded;
		
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};