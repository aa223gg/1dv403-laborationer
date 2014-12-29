"use strict";

var start = {
    
    openWindow: function() {
        
        var photoPositionLeft = 220;
        var photoPositionTop = 70;
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