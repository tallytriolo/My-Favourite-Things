// imports goes first
import { getData } from "./modules/dataMiner.js";

// JS starts here
(() => {

    // get a reference to the template's contents and the target container
    // into which we'll clone a copy of the markup
let theTemplate = document.querySelector("#things-template").content,
    theFavThings = document.querySelector(".content-things"),
    buttonContainer = document.querySelector('.query-controls'),
    hobbiesList;
 
    // Adding buttons to show data
    function thingsButtons(data) {  
        console.log(data.things);
        // this is a container to conect with the element "things"
        let container = new DocumentFragment();
        hobbiesList = data.things;
        data.things.forEach(thing => { 
            let thingsBtn = document.createElement('button'); 
            thingsBtn.className = 'favButton'; // add a class to HTML 'favButton'
            // the id will conect with each object and name is the name of each button
            thingsBtn.dataset.thing = thing.hobbies.id;
            thingsBtn.textContent = thing.hobbies.name;


            thingsBtn.addEventListener('click', buttonEvent) 
            container.appendChild(thingsBtn);
        });

        buttonContainer.appendChild(container);

    }
  
    // Function to show content when we click on the button
    function buttonEvent(){ 
        theFavThings.textContent = '';
        hobbiesList.forEach(thing => { 
            if(thing.hobbies.id == this.dataset.thing) {
                let panel = theTemplate.cloneNode(true), 
                containers = panel.firstElementChild.children;

                containers[0].querySelector('img').src = 'images/' + thing.hobbies.image; 
                containers[1].textContent = thing.hobbies.name;
                containers[2].textContent = thing.hobbies.description;
                containers[3].textContent = thing.hobbies.curiosity;
                containers[4].textContent = thing.hobbies.frequency;

                theFavThings.appendChild(panel); 
            }
        });
    }

    // retrieve our fav things data, and then build out the content
    getData("./data.json", thingsButtons);

})();