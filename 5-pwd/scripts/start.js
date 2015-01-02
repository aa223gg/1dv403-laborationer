"use strict";

var start = {
    
    positionLeft: 0,
    positionTop: 0,
    
    
    openWindow: function(positionLeft, positionTop) {
        
        var iconPhoto;
        positionLeft = 220;
        positionTop = 70;
        
        iconPhoto = document.getElementById("icon");
        iconPhoto.addEventListener("click", function(){ 
            
            //positionLeft += 20;
            //positionTop += 20;
            
            PhotoGallery.createPhotoGallery(positionLeft, positionTop);
            
        });
    }
};

window.onload = start.openWindow();