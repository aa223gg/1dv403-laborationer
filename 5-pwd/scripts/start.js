"use strict";

var start = {
    
    openWindow: function() {
        
        var photoPositionLeft = 250;
        var photoPositionTop = 100;
        var iconPhoto;
        
        iconPhoto = document.getElementById("icon");
        iconPhoto.addEventListener("click", function(){ 
            
            photoPositionLeft += 20;
            photoPositionTop += 20;
            
            PhotoGallery.createPhotoGallery(photoPositionLeft, photoPositionTop);
            
        });
    }
};

window.onload = start.openWindow();