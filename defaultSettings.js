function makeDiv(){
    div = document.createElement("div");

    divform = document.createElement("form");
    divform.id = "divform";
    divform.addEventListener("submit", (event) => {
        event.preventDefault();

        var callsign = document.getElementById("callsign").value;
        var band = document.getElementById("band").value;
        var mode = document.getElementById("mode").value;

        if(document.querySelector('input[name = "timeFormat"]:checked') != null){
            var timeFormat = document.querySelector('input[name = "timeFormat"]:checked').value;

            if(timeFormat == "local"){
                var utcoffset = document.getElementById("utcoffset").value;
            } else {
                var utcoffset = null;
            }

        } else {
            var timeFormat = null;
        }

        var settings = {callsign: callsign, timeFormat:timeFormat, offset: utcoffset, band: band, mode: mode}; 
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

    divformtimeformatlabel = document.createElement("p");
    divformtimeformatlabel.innerHTML = "Default Time Format";

    divformtimeformatutc = document.createElement("input");
    divformtimeformatutc.setAttribute("type", "radio");
    divformtimeformatutc.setAttribute("id", "radioUtc");
    divformtimeformatutc.setAttribute("name", "timeFormat");
    divformtimeformatutc.setAttribute("value", "utc");
    divformtimeformatutc.setAttribute("checked", true);
    divformtimeformatutc.addEventListener("change", function (){
        if(document.querySelector('input[name = "timeFormat"]:checked').value == this.value){
            divformutcoffset.setAttribute("disabled", true);
        }
    })
    divformtimeformatutclabel = document.createElement("label");
    divformtimeformatutclabel.setAttribute("for", "utc");
    divformtimeformatutclabel.innerHTML = "UTC";

    divformtimeformatlocal = document.createElement("input");
    divformtimeformatlocal.setAttribute("type", "radio");
    divformtimeformatlocal.setAttribute("id", "radioLocal");
    divformtimeformatlocal.setAttribute("name", "timeFormat");
    divformtimeformatlocal.setAttribute("value", "local");
    divformtimeformatlocal.addEventListener("change", function (){
        if(document.querySelector('input[name = "timeFormat"]:checked').value == this.value){
            divformutcoffset.removeAttribute("disabled");
        }
    })
    divformtimeformatlocallabel = document.createElement("label");
    divformtimeformatlocallabel.setAttribute("for", "local");
    divformtimeformatlocallabel.innerHTML = "Local";

    divformutcoffset = document.createElement("select");
    divformutcoffset.setAttribute("id", "utcoffset");
    divformutcoffset.setAttribute("disabled", true);

    divformutcoffsetoptions = ["UTC", "UTC+1", "UTC+2"];
    divformutcoffsetvalues = [0, -1, -2];
    for(var i = 0; i < divformutcoffsetoptions.length; i++){
        option = document.createElement("option");
        option.value = divformutcoffsetvalues[i];
        option.text = divformutcoffsetoptions[i];
        divformutcoffset.add(option);
        if(divformutcoffsetoptions[i] == "UTC"){
            option.setAttribute("selected", true);
        }
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
    divform.appendChild(br.cloneNode());
    divform.appendChild(divformtimeformatlabel);
    divform.appendChild(divformtimeformatutc);
    divform.appendChild(divformtimeformatutclabel);
    divform.appendChild(divformtimeformatlocal);
    divform.appendChild(divformtimeformatlocallabel);
    divform.appendChild(divformutcoffset);
    divform.appendChild(br.cloneNode());
    divform.appendChild(br.cloneNode());
    divform.appendChild(divformsubmit);

    div.appendChild(divform);
    div.appendChild(divdiscard);
    div.id = "sota-autofill-plugin";

    return div;
}

var localDateTime = new Date("0000-01-01T00:00:00");
var utcDateTime = new Date("0000-01-01T00:00:00");

const observer = new MutationObserver(() => {

    
    mainbuttons = document.querySelectorAll("button");
    for (i = 0; i < mainbuttons.length; i++){
        if(mainbuttons[i].innerText == "Add Chaser QSO" && !mainbuttons[i].id){
            mainbuttons[i].id = "chaseraddbutton";
        }
    }

    const modal = document.querySelector("app-chaser-modal");

    if(modal && !document.getElementById("sota-autofill-plugin")){
        modal.appendChild(makeDiv());

        headerdiv = document.querySelector(".modal-header");
        closebutton = headerdiv.querySelector("button")
        if(!closebutton.id){
            closebutton.id = "chaserclosebutton"
        }

        parentdiv = document.querySelector(".modal-body");

        parentdiv.querySelectorAll(".col-8")[1].querySelectorAll("input")[0].id = "originalcallsign";
        parentdiv.querySelectorAll(".col-8")[4].children[0].id = "originaldate";
        
        parentdiv.querySelectorAll(".col-8")[5].querySelectorAll("input")[0].id = "originaltime";
        parentdiv.querySelectorAll(".form-select")[0].id = "originalband";
        parentdiv.querySelectorAll(".form-select")[1].id = "originalmode";
        
        sotadataautofill_loadSettings(false);

        input = document.getElementById("originaltime");
        input.addEventListener("input", (event) => {
            if(input.value.search(/^[0-9]{1}:[0-9]{2}/) >= 0){
                sotadataautofill_setTextValue(input, "0" + input.value);

                if(input.id == "localtime"){
                    sotadataautofill_setTextValue(document.getElementById("originaltime"), input.value);
                }
            }
        })

        localDateTime.setTime(-62167224120000);
        utcDateTime.setTime(-62167224120000);
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

            if(item.settings.timeFormat){
                if(item.settings.timeFormat == "local"){
                    document.getElementById("radioLocal").checked = true;
                }       
            }

            if(item.settings.timeFormat != null){
                document.getElementById("divform").elements["timeFormat"].value = item.settings.timeFormat;

                if(item.settings.timeFormat == "local"){
                    document.getElementById("originaltime").setAttribute("type", "hidden");
                    document.getElementById("originaldate").setAttribute("style", "display: none");
                    document.getElementById("originaldate").querySelectorAll("input")[0].addEventListener("click", () => {
                        sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], "2026-04-01");
                    })

                    localinput = document.createElement("input");
                    localinput.setAttribute("id", "localtime");
                    localinput.setAttribute("placeholder", "hh:mm");
                    localinput.setAttribute("class", "form-control form-control-sm ms-1");
                    localinput.addEventListener("input", (event) => {
                        if(localinput.value.search(/^[0-9]{1}:[0-9]{2}/) >= 0){
                            sotadataautofill_setTextValue(localinput, "0" + localinput.value);
                            sotadataautofill_setTextValue(document.getElementById("originaltime"), localinput.value);
                        } else {
                            sotadataautofill_setTextValue(document.getElementById("originaltime"), localinput.value);
                        }
                        
                        if(localinput.value.search(/^[0-9]{2}:[0-9]{2}/) >= 0){
                            var timesplit = localinput.value.split(":");
                            localDateTime.setHours(Number(timesplit[0]), Number(timesplit[1]));
                            localDateTime.setSeconds(10);

                            if(localDateTime.getSeconds() != 0 || localDateTime.getFullYear() != "0000"){
                                utcDateTime.setTime(localDateTime.getTime() + item.settings.offset * 3600000)
                                
                                var y = utcDateTime.getFullYear();
                                var m = utcDateTime.getMonth();
                                var m = utcDateTime.getMonth().toString().length == 1 ? "0" + utcDateTime.getMonth() : utcDateTime.getMonth();
                                var d = utcDateTime.getDate().toString().length == 1 ? "0" + utcDateTime.getDate() : utcDateTime.getDate();
                                var h = utcDateTime.getHours().toString().length == 1 ? "0" + utcDateTime.getHours() : utcDateTime.getHours();
                                var mi = utcDateTime.getMinutes().toString().length == 1 ? "0" + utcDateTime.getMinutes() : utcDateTime.getMinutes();
                                sotadataautofill_setTextValue(document.getElementById("originaltime"), h + ":" + mi);
                                sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], y + "-" + m + "-" + d);
                            }
                        }
                        
                    })

                    document.getElementById("originaltime").parentElement.appendChild(localinput);
                    
                    localinput2 = document.createElement("input");
                    localinput2.setAttribute("id", "localdate");
                    localinput2.setAttribute("type", "date");
                    localinput2.setAttribute("class", "form-control form-control-sm ms-1");
                    
                    localinput2.addEventListener("input", () => {
                        sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], localinput2.value)

                        var timesplit = localinput2.value.split("-");
                        localDateTime.setFullYear(timesplit[0])
                        localDateTime.setMonth(timesplit[1]);
                        localDateTime.setDate(timesplit[2]);

                        if(localDateTime.getSeconds() != 0 || localDateTime.getFullYear() != "0000"){
                            utcDateTime.setTime(localDateTime.getTime() + item.settings.offset * 3600000)

                            var y = utcDateTime.getFullYear();
                            var m = utcDateTime.getMonth();
                            var m = utcDateTime.getMonth().toString().length == 1 ? "0" + utcDateTime.getMonth() : utcDateTime.getMonth();
                            var d = utcDateTime.getDate().toString().length == 1 ? "0" + utcDateTime.getDate() : utcDateTime.getDate();
                            var h = utcDateTime.getHours().toString().length == 1 ? "0" + utcDateTime.getHours() : utcDateTime.getHours();
                            var mi = utcDateTime.getMinutes().toString().length == 1 ? "0" + utcDateTime.getMinutes() : utcDateTime.getMinutes();
                            sotadataautofill_setTextValue(document.getElementById("originaltime"), h + ":" + mi);
                            sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], y + "-" + m + "-" + d);
                        }
                        
                    })

                    document.getElementById("originaldate").parentElement.appendChild(localinput2)
                    
                    document.getElementById("utcoffset").removeAttribute("disabled");
                } else {
                    document.getElementById("utcoffset").setAttribute("disabled", true);
                }
            } else {
               document.getElementById("divform").elements["timeFormat"].value = "utc";
            }

            if(item.settings.offset != null){
                document.getElementById("utcoffset").value = item.settings.offset;
            }

            if(update){
                document.getElementById("chaserclosebutton").dispatchEvent(new Event("click", {bubbles: true}));
                document.getElementById("chaseraddbutton").dispatchEvent(new Event("click", {bubbles: true}));
            }
        }  
    });
}

function sotadataautofill_setTextValue(element, value) {
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

    nativeSetter.call(element, value);

    element.dispatchEvent(new Event("input", {bubbles: true }));
}