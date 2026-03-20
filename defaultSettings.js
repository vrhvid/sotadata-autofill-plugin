div = document.createElement("div");

divform = document.createElement("form");
divform.addEventListener("submit", (event) => {
    event.preventDefault();

    var callsign = document.getElementById("callsign").value;
    var band = document.getElementById("band").value;
    var mode = document.getElementById("mode").value;

    var settings = {callsign: callsign, band: band, mode: mode}; 
    browser.storage.local.set({settings});

    sotadataautofill_loadSettings(true);
});

divformlabelcallsign = document.createElement("label");
divformlabelcallsign.setAttribute("for", "callsign");
divformlabelcallsign.innerHTML = "Default Callsign";

divformcallsign = document.createElement("input");
divformcallsign.setAttribute("id", "callsign");
divformcallsign.setAttribute("type", "text");
divformcallsign.setAttribute("size", "25");
divformcallsign.setAttribute("maxlenght", "20");
divformcallsign.addEventListener("change", function(){
    let string = this.value;
    this.value = string.toUpperCase();
})

divformlabelband = document.createElement("label");
divformlabelband.setAttribute("for", "band")
divformlabelband.innerHTML = "Default Band";

divformband = document.createElement("select");         //nastavi, da se prikaže samo toliko možnosti kot se jih na originalni strani
divformband.setAttribute("id", "band");

divformbandoptions = ["VLF", "1.8MHz", "3.5Mhz", "5MHz", "7MHz", "10MHz", "14MHz", "18MHz", "21MHz",
                      "24MHz", "28MHz", "40MHz", "50MHz", "60MHz", "70MHz", "144MHz", "220MHz", "433MHz",
                      "900MHz", "1240MHz", "2.3GHz", "3.4GHz", "5.6GHz", "10GHz", "24GHz", "Microwave"];
for(var i = 0; i < divformbandoptions.length; i++){
    option = document.createElement("option");
    option.value = divformbandoptions[i];
    option.text = divformbandoptions[i];
    divformband.add(option);
}

divformmodelabel = document.createElement("label");
divformmodelabel.setAttribute("for", "mode");
divformmodelabel.innerHTML = "Default Mode";

divformmode = document.createElement("select");
divformmode.setAttribute("id", "mode");

divformmodeoptions = ["AM", "CW", "DATA", "DV", "FM", "OTHER", "SSB"];
for(var i = 0; i < divformmodeoptions.length; i++){
    option = document.createElement("option");
    option.setAttribute("value", divformmodeoptions[i]);
    option.innerHTML = divformmodeoptions[i];
    divformmode.appendChild(option);
}

divformsubmit = document.createElement("input");
divformsubmit.setAttribute("type", "submit");
divformsubmit.setAttribute("value", "SAVE SETTINGS");

divdiscard = document.createElement("button");
divdiscard.innerHTML = "DISCARD CHANGES";
divdiscard.addEventListener("click", (event) => {
    sotadataautofill_loadSettings(true);
});

br = document.createElement("br");

divform.appendChild(divformlabelcallsign);
divform.appendChild(divformcallsign);
divform.appendChild(br.cloneNode());
divform.appendChild(br.cloneNode());
divform.appendChild(divformlabelband);
divform.appendChild(divformband);
divform.appendChild(br.cloneNode());
divform.appendChild(br.cloneNode());
divform.appendChild(divformmodelabel);
divform.appendChild(divformmode);
divform.appendChild(br.cloneNode());
divform.appendChild(br);
divform.appendChild(divformsubmit);

div.appendChild(divform);
div.appendChild(divdiscard);
div.id = "sota-autofill-plugin";

const observer = new MutationObserver(() => {

    mainbuttons = document.querySelectorAll("button");
    for (i = 0; i < mainbuttons.length; i++){
        if(mainbuttons[i].innerText == "Add Chaser QSO" && !mainbuttons[i].id){
            mainbuttons[i].id = "chaseraddbutton";
        }
    }

    const modal = document.querySelector("app-chaser-modal");

    if(modal && !document.getElementById("sota-autofill-plugin")){
        modal.appendChild(div);

        headerdiv = document.querySelector(".modal-header");
        closebutton = headerdiv.querySelector("button")
        if(!closebutton.id){
            closebutton.id = "chaserclosebutton"
        }

        parentdiv = document.querySelector(".modal-body");
        
        parentdiv.querySelectorAll(".col-8")[1].querySelectorAll("input")[0].id = "originalcallsign";
        parentdiv.querySelectorAll(".col-8")[5].querySelectorAll("input")[0].id = "originaltime";
        parentdiv.querySelectorAll(".form-select")[0].id = "originalband";
        parentdiv.querySelectorAll(".form-select")[1].id = "originalmode";
        
        input = document.getElementById("originaltime");
        input.addEventListener("input", (event) => {
            if(input.value.search(/^[0-9]{1}:[0-9]{2}/) >= 0){
                sotadataautofill_setTextValue(input, "0" + input.value);
            }
        })
        
        sotadataautofill_loadSettings(false);
    }

});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

function sotadataautofill_loadSettings(update){
    browser.storage.local.get("settings").then(function(item){
        if(item.settings){
            document.getElementById("callsign").value = item.settings.callsign;
            sotadataautofill_setTextValue(document.getElementById("originalcallsign"), item.settings.callsign);
            
            document.getElementById("band").value = document.getElementById("originalband").value = item.settings.band;
            document.getElementById("originalband").dispatchEvent(new Event('change', {bubbles: true }));

            document.getElementById("mode").value = document.getElementById("originalmode").value = item.settings.mode;
            document.getElementById("originalmode").dispatchEvent(new Event('change', {bubbles: true }));

            if(update){
                console.log("update!")
                document.getElementById("chaserclosebutton").dispatchEvent(new Event("click", {bubbles: true}));
                document.getElementById("chaseraddbutton").dispatchEvent(new Event("click", {bubbles: true}));
            }
        }  
    });
}

function sotadataautofill_setTextValue(element, value) {
    const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
    ).set;

    nativeSetter.call(element, value);

    element.dispatchEvent(new Event("input", {bubbles: true }));
}