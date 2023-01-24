/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)


    // JULIA TESTING
    WA.room.onEnterLayer('clockZone').subscribe(() => {
        
        currentPopup = WA.ui.openPopup("clockPopup","Hello This is Julia's test",[{
            label: "Wikipedia",
            className: "primary",
            callback: () => {
                // Close the popup when the "Close" button is pressed.
                WA.ui.website.open({
                    url: "https://wikipedia.org",
                    position: {
                        vertical: "middle",
                        horizontal: "middle",
                    },
                    size: {
                        height: "50vh",
                        width: "50vw",
                    },
                });
                
            }
        }]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)
    
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

WA.room.onEnterLayer("floor").subscribe(() => {
    WA.room.hideLayer("roof");
    WA.room.hideLayer("walls-bg-front");
    WA.room.hideLayer("signs");
  });
  
WA.room.onLeaveLayer("floor").subscribe(() => {
    WA.room.showLayer("roof");
    WA.room.showLayer("walls-bg-front");
    WA.room.showLayer("signs");
  });
function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
