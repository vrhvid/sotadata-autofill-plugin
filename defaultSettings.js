div = document.createElement("div");

divform = document.createElement("form");
divform.addEventListener("submit", (event) => {
    event.preventDefault();
    sotadataautofill_saveSettings();
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
divdiscard.addEventListener("submit", (event) => {
    sotadataautofill_loadSettings();
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

    const modal = document.querySelector("app-chaser-modal");

    if(modal && !document.getElementById("sota-autofill-plugin")){
        modal.appendChild(div);
        sotadataautofill_loadSettings();
    }

});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

function sotadataautofill_saveSettings(){
    var callsign = document.getElementById("callsign").value;
    var band = document.getElementById("band").value;
    var mode = document.getElementById("mode").value;

    var settings = {callsign: callsign, band: band, mode: mode}; 
    browser.storage.local.set({settings});
}

function sotadataautofill_loadSettings(){
    browser.storage.local.get("settings").then(function(item){
        document.getElementById("callsign").value = item.settings.callsign;
        document.getElementById("band").value = item.settings.band;
        document.getElementById("mode").value = item.settings.mode;
    });
}