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

        var chasersettings = {callsign: callsign, timeFormat:timeFormat, offset: utcoffset, band: band, mode: mode}; 
        browser.storage.local.set({chasersettings});
        
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

function makeActivationDiv(){
    div = document.createElement("div");

    divform = document.createElement("form");
    divform.id = "activationDivForm";
    divform.addEventListener("submit", (event) => {
        event.preventDefault();

        var callsign = document.getElementById("activatorCallsign").value;
        var band = document.getElementById("activatorBand").value;
        var mode = document.getElementById("activatorMode").value;

        if(document.querySelector('input[name = "activatorTimeFormat"]:checked') != null){
            var timeFormat = document.querySelector('input[name = "activatorTimeFormat"]:checked').value;

            if(timeFormat == "local"){
                var utcoffset = document.getElementById("activationUtcOffset").value;
            } else {
                var utcoffset = null;
            }

        } else {
            var timeFormat = null;
        }

        var activatorsettings = {callsign: callsign, timeFormat:timeFormat, offset: utcoffset, band: band, mode: mode}; 
        browser.storage.local.set({activatorsettings});
        
        sotadataautofill_loadActivationSettings(true);
    });

    divformlabelactivatorcallsign = document.createElement("label");
    divformlabelactivatorcallsign.setAttribute("for", "activatorCallsign");
    divformlabelactivatorcallsign.innerHTML = "Default Callsign";

    divformactivatorcallsign = document.createElement("input");
    divformactivatorcallsign.setAttribute("id", "activatorCallsign");
    divformactivatorcallsign.setAttribute("type", "text");
    divformactivatorcallsign.setAttribute("size", "25");
    divformactivatorcallsign.setAttribute("maxlenght", "20");
    divformactivatorcallsign.addEventListener("change", function(){
        let string = this.value;
        this.value = string.toUpperCase();
    })

    divformlabelband = document.createElement("label");
    divformlabelband.setAttribute("for", "activatorBand")
    divformlabelband.innerHTML = "Default Band";

    divformband = document.createElement("select");         //nastavi, da se prikaže samo toliko možnosti kot se jih na originalni strani
    divformband.setAttribute("id", "activatorBand");

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
    divformmodelabel.setAttribute("for", "activatorMode");
    divformmodelabel.innerHTML = "Default Mode";

    divformmode = document.createElement("select");
    divformmode.setAttribute("id", "activatorMode");

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
    divformtimeformatutc.setAttribute("id", "activatorRadioUtc");
    divformtimeformatutc.setAttribute("name", "activatorTimeFormat");
    divformtimeformatutc.setAttribute("value", "utc");
    divformtimeformatutc.setAttribute("checked", true);
    divformtimeformatutc.addEventListener("change", function (){
        if(document.querySelector('input[name = "timeFormat"]:checked').value == this.value){
            divformutcoffset.setAttribute("disabled", true);
        }
    })
    divformtimeformatutclabel = document.createElement("label");
    divformtimeformatutclabel.setAttribute("for", "activatorRadioUtc");
    divformtimeformatutclabel.innerHTML = "UTC";

    divformtimeformatlocal = document.createElement("input");
    divformtimeformatlocal.setAttribute("type", "radio");
    divformtimeformatlocal.setAttribute("id", "activatorRadioLocal");
    divformtimeformatlocal.setAttribute("name", "activatorTimeFormat");
    divformtimeformatlocal.setAttribute("value", "local");
    divformtimeformatlocal.addEventListener("change", function (){
        if(document.querySelector('input[name = "activatorTimeFormat"]:checked').value == this.value){
            divformutcoffset.removeAttribute("disabled");
        }
    })
    divformtimeformatlocallabel = document.createElement("label");
    divformtimeformatlocallabel.setAttribute("for", "local");
    divformtimeformatlocallabel.innerHTML = "Local";

    divformutcoffset = document.createElement("select");
    divformutcoffset.setAttribute("id", "activationUtcOffset");
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
        sotadataautofill_loadActivationSettings(true);
    });

    br = document.createElement("br");

    divform.appendChild(divformlabelactivatorcallsign);
    divform.appendChild(divformactivatorcallsign);
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
        } else if (mainbuttons[i].innerText == "Add Activation" && !mainbuttons[i].id){
            mainbuttons[i].id = "activationaddbutton"
        }
    }

    const modal = document.querySelector("app-chaser-modal");
    const modalactivation = document.querySelector("app-activation-modal")

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
            }
        })

        localDateTime.setTime(-62167224120000);
        utcDateTime.setTime(-62167224120000);
    }

    if(modalactivation && !document.getElementById("sota-autofill-plugin")){
        modalactivation.appendChild(makeActivationDiv());

        headerdiv = document.querySelector(".modal-header");
        closebutton = headerdiv.querySelector("button")
        if(!closebutton.id){
            closebutton.id = "activationCloseButton"
        }

        parentdiv = document.querySelector(".modal-body");

        parentdiv.querySelectorAll(".col-12")[0].querySelectorAll("input")[0].id = "activationOriginalCallsign";
        parentdiv.querySelectorAll(".col-12")[2].querySelectorAll("input")[0].id = "activationOriginalDate";

        var nrows = parentdiv.querySelectorAll(".row").length;
        var nbuttons = parentdiv.querySelectorAll(".row")[nrows - 1].querySelectorAll("button").length;
        parentdiv.querySelectorAll(".row")[nrows - 1].querySelectorAll("button")[nbuttons - 1].id = "addActivationButton";

        sotadataautofill_loadActivationSettings(false);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

function sotadataautofill_loadSettings(update){
    browser.storage.local.get("chasersettings").then(function(item){
        if(item.chasersettings){
            document.getElementById("callsign").value = item.chasersettings.callsign;
            sotadataautofill_setTextValue(document.getElementById("originalcallsign"), item.chasersettings.callsign);
            
            document.getElementById("band").value = document.getElementById("originalband").value = item.chasersettings.band;
            document.getElementById("originalband").dispatchEvent(new Event('change', {bubbles: true }));

            document.getElementById("mode").value = document.getElementById("originalmode").value = item.chasersettings.mode;
            document.getElementById("originalmode").dispatchEvent(new Event('change', {bubbles: true }));
            
            if(item.chasersettings.timeFormat != null){
                document.getElementById("divform").elements["timeFormat"].value = item.chasersettings.timeFormat;

                if(item.chasersettings.timeFormat == "local"){
                    document.getElementById("originaltime").setAttribute("type", "hidden");
                    document.getElementById("originaldate").setAttribute("style", "display: none");

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

                            if(localDateTime.getSeconds() != 0 && localDateTime.getFullYear() != "0000"){
                                utcDateTime.setTime(localDateTime.getTime() + item.chasersettings.offset * 3600000)
                                
                                var y = utcDateTime.getFullYear();
                                var m = (utcDateTime.getMonth() + 1).toString().length == 1 ? "0" + (utcDateTime.getMonth() + 1) : (utcDateTime.getMonth() + 1);
                                var d = utcDateTime.getDate().toString().length == 1 ? "0" + utcDateTime.getDate() : utcDateTime.getDate();
                                var h = utcDateTime.getHours().toString().length == 1 ? "0" + utcDateTime.getHours() : utcDateTime.getHours();
                                var mi = utcDateTime.getMinutes().toString().length == 1 ? "0" + utcDateTime.getMinutes() : utcDateTime.getMinutes();
                                sotadataautofill_setTextValue(document.getElementById("originaltime"), h + ":" + mi);
                                sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], y + "-" + m + "-" + d);
                                
                                browser.runtime.sendMessage({action: "setChaserSessionStorage", data: y + "-" + m + "-" + d});
                            }
                        } 
                    });

                    document.getElementById("originaltime").parentElement.appendChild(localinput);
                    
                    var maxdateobj = new Date();
                    var maxyear = maxdateobj.getFullYear();
                    var maxmonth = (maxdateobj.getMonth() + 1).toString().length == 1 ? "0" + (maxdateobj.getMonth() + 1) : (maxdateobj.getMonth() + 1);
                    var maxdate = maxdateobj.getDate().toString().length == 1 ? "0" + maxdateobj.getDate() : maxdateobj.getDate();

                    localinput2 = document.createElement("input");
                    localinput2.setAttribute("id", "localdate");
                    localinput2.setAttribute("type", "date");
                    localinput2.setAttribute("min", "2002-03-02")
                    localinput2.setAttribute("max", maxyear + "-" + maxmonth + "-" + maxdate)
                    localinput2.setAttribute("class", "form-control form-control-sm ms-1");
                    
                    localinput2.addEventListener("input", () => {
                        sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], localinput2.value)

                        var timesplit = localinput2.value.split("-");
                        localDateTime.setFullYear(timesplit[0])
                        localDateTime.setMonth(timesplit[1] - 1);
                        localDateTime.setDate(timesplit[2]);
                        
                        if(localDateTime.getSeconds() != 0 && localDateTime.getFullYear() != "0000"){
                            utcDateTime.setTime(localDateTime.getTime() + item.chasersettings.offset * 3600000)

                            var y = utcDateTime.getFullYear();
                            var m = (utcDateTime.getMonth() + 1).toString().length == 1 ? "0" + (utcDateTime.getMonth() + 1) : (utcDateTime.getMonth() + 1);
                            var d = utcDateTime.getDate().toString().length == 1 ? "0" + utcDateTime.getDate() : utcDateTime.getDate();
                            var h = utcDateTime.getHours().toString().length == 1 ? "0" + utcDateTime.getHours() : utcDateTime.getHours();
                            var mi = utcDateTime.getMinutes().toString().length == 1 ? "0" + utcDateTime.getMinutes() : utcDateTime.getMinutes();
                            sotadataautofill_setTextValue(document.getElementById("originaltime"), h + ":" + mi);
                            sotadataautofill_setTextValue(document.getElementById("originaldate").querySelectorAll("input")[0], y + "-" + m + "-" + d);
                            
                            browser.runtime.sendMessage({action: "setChaserSessionStorage", data: y + "-" + m + "-" + d});
                        } 
                    });

                    document.getElementById("originaldate").parentElement.appendChild(localinput2);
                    
                    message = browser.runtime.sendMessage({action: "getSessionStorage"})
                    message.then(function(response){
                        if(response.sessionStorageData != null){
                            sotadataautofill_setTextValue(localinput2, response.sessionStorageData);
                        }
                    });
                    
                    document.getElementById("utcoffset").removeAttribute("disabled");
                    document.getElementById("radioLocal").checked = true;
                } else {
                    document.getElementById("utcoffset").setAttribute("disabled", true);
                    
                    document.getElementById("originaldate").querySelector("button").addEventListener("click", () => {
                        document.getElementById("originaldate").querySelector("ngb-datepicker").addEventListener("click", () => {
                            browser.runtime.sendMessage({action: "setChaserSessionStorage", data: document.getElementById("originaldate").children[0].value});
                        });
                    });

                    browser.runtime.sendMessage({action: "getSessionStorage"}).then(function(response){
                        if(response.sessionStorageData != null){
                            sotadataautofill_setTextValue(document.getElementById("originaldate").children[0], response.sessionStorageData);
                        }
                    });
                }
            } else {
                document.getElementById("divform").elements["timeFormat"].value = "utc";

                document.getElementById("originaldate").querySelector("button").addEventListener("click", () => {
                        document.getElementById("originaldate").querySelector("ngb-datepicker").addEventListener("click", () => {
                            browser.runtime.sendMessage({action: "setChaserSessionStorage", data: document.getElementById("originaldate").children[0].value});
                        });
                    });

                browser.runtime.sendMessage({action: "getSessionStorage"}).then(function(response){
                    if(response.sessionStorageData != null){
                            sotadataautofill_setTextValue(document.getElementById("originaldate").children[0], response.sessionStorageData);
                    }
                });
            }

            if(item.chasersettings.offset != null){
                document.getElementById("utcoffset").value = item.chasersettings.offset;
            }

            if(update){
                document.getElementById("chaserclosebutton").dispatchEvent(new Event("click", {bubbles: true}));
                document.getElementById("chaseraddbutton").dispatchEvent(new Event("click", {bubbles: true}));
            }
        }  
    });
}

function sotadataautofill_loadActivationSettings(update){
    var activationdate = null;
    browser.runtime.sendMessage({action: "getActivatorSessionStorage"}).then(function(response){
        if(response.sessionStorageData != null){
            sotadataautofill_setTextValue(document.getElementById("activationOriginalDate"), response.sessionStorageData);
            activationdate = response.sessionStorageData;
        }
    });

    browser.storage.local.get("activatorsettings").then(function(item){
        if(item.activatorsettings){
            if(item.activatorsettings.timeFormat == "local"){
                document.getElementById("activationUtcOffset").removeAttribute("disabled");
                document.getElementById("activatorRadioLocal").checked = true;
            }

            document.getElementById("activatorCallsign").value = item.activatorsettings.callsign;
            sotadataautofill_setTextValue(document.getElementById("activationOriginalCallsign"), item.activatorsettings.callsign);

            
            document.getElementById("activatorBand").value = item.activatorsettings.band;

            document.getElementById("activatorMode").value = item.activatorsettings.mode;

            document.getElementById("activationDivForm").elements["activatorTimeFormat"].value = item.activatorsettings.timeFormat;

            document.getElementById("addActivationButton").addEventListener("click", () => {
                document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[0].querySelectorAll(".col-6")[0].querySelectorAll("select")[0].value = item.activatorsettings.band;
                document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[0].querySelectorAll(".col-6")[0].querySelectorAll("select")[0].dispatchEvent(new Event('change', {bubbles: true }));
                
                document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[0].querySelectorAll(".col-6")[1].querySelectorAll("select")[0].value = item.activatorsettings.mode;
                document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[0].querySelectorAll(".col-6")[1].querySelectorAll("select")[0].dispatchEvent(new Event('change', {bubbles: true }));

                var activationdate = document.getElementById("activationOriginalDate").value;
                if(activationdate != null && activationdate != ""){
                    browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: activationdate});
                }
            }, {once: true});

            document.getElementById("addActivationButton").addEventListener("click", () => {
                var rownumber = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]").length - 2;
                parentrow = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber];

                timeinput = parentrow.querySelector(".col-5").querySelector(".form-control");
                dateinput = parentrow.querySelector(".col-7").querySelector(".form-control");
                
                if(item.activatorsettings.timeFormat == "local"){

                    timeinput.setAttribute("style", "display: none");
                    
                    localtimeinput = document.createElement("input");
                    localtimeinput.setAttribute("id", "activatorlocaltime");
                    localtimeinput.setAttribute("placeholder", "hh:mm");
                    localtimeinput.setAttribute("class", "form-control form-control-sm ms-1");

                    timeinput.parentElement.appendChild(localtimeinput);

                    var localdate = new Date("0000-01-01T00:00:00");
                    var utcdate = new Date("0000-01-01T00:00:00");

                    localtimeinput.addEventListener("input", () => {
                        if(localtimeinput.value.search(/^[0-9]{1}:[0-9]{2}/) >= 0){
                            sotadataautofill_setTextValue(localtimeinput, "0" + localtimeinput.value);
                            sotadataautofill_setTextValue(timeinput, localtimeinput.value);
                        } else {
                            sotadataautofill_setTextValue(timeinput, localtimeinput.value);
                        }

                        localtime = localtimeinput.value.split(":");

                        if(localtimeinput.value.search(/^[0-9]{2}:[0-9]{2}/) >= 0){
                            var localtime = localtimeinput.value.split(":");
                            localdate.setHours(Number(localtime[0]), Number(localtime[1]));
                            localdate.setSeconds(10);

                            if(localdate.getSeconds() != 0 && localdate.getFullYear() != "0000"){
                                utcdate.setTime(localdate.getTime() + item.activatorsettings.offset * 3600000)
                                
                                var y = utcdate.getFullYear();
                                var m = (utcdate.getMonth() + 1).toString().length == 1 ? "0" + (utcdate.getMonth() + 1) : (utcdate.getMonth() + 1);
                                var d = utcdate.getDate().toString().length == 1 ? "0" + utcdate.getDate() : utcdate.getDate();
                                var h = utcdate.getHours().toString().length == 1 ? "0" + utcdate.getHours() : utcdate.getHours();
                                var mi = utcdate.getMinutes().toString().length == 1 ? "0" + utcdate.getMinutes() : utcdate.getMinutes();
                                sotadataautofill_setTextValue(timeinput, h + ":" + mi);
                                sotadataautofill_setTextValue(dateinput, y + "-" + m + "-" + d);
                                browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: y + "-" + m + "-" + d});
                            }
                        }

                    });

                    var maxdateobj = new Date();
                    var maxyear = maxdateobj.getFullYear();
                    var maxmonth = (maxdateobj.getMonth() + 1).toString().length == 1 ? "0" + (maxdateobj.getMonth() + 1) : (maxdateobj.getMonth() + 1);
                    var maxdate = maxdateobj.getDate().toString().length == 1 ? "0" + maxdateobj.getDate() : maxdateobj.getDate();

                    localdateinput = document.createElement("input");
                    localdateinput.setAttribute("id", "activatorlocaldate");
                    localdateinput.setAttribute("type", "date");
                    localdateinput.setAttribute("min", "2002-03-02")
                    localdateinput.setAttribute("max", maxyear + "-" + maxmonth + "-" + maxdate)
                    localdateinput.setAttribute("class", "form-control form-control-sm ms-1");

                    dateinput.parentElement.setAttribute("style", "display: none");
                    dateinput.parentElement.parentElement.appendChild(localdateinput);
                    
                    
                    localdateinput.addEventListener("input", () => {
                        
                        var timesplit = localdateinput.value.split("-");
                        localdate.setFullYear(timesplit[0])
                        localdate.setMonth(timesplit[1] - 1);
                        localdate.setDate(timesplit[2]);
                        
                        if(localdate.getSeconds() != 0 && localdate.getFullYear() != "0000"){
                            utcdate.setTime(localdate.getTime() + item.activatorsettings.offset * 3600000)

                            var y = utcdate.getFullYear();
                            var m = (utcdate.getMonth() + 1).toString().length == 1 ? "0" + (utcdate.getMonth() + 1) : (utcdate.getMonth() + 1);
                            var d = utcdate.getDate().toString().length == 1 ? "0" + utcdate.getDate() : utcdate.getDate();
                            var h = utcdate.getHours().toString().length == 1 ? "0" + utcdate.getHours() : utcdate.getHours();
                            var mi = utcdate.getMinutes().toString().length == 1 ? "0" + utcdate.getMinutes() : utcdate.getMinutes();
                            sotadataautofill_setTextValue(timeinput, h + ":" + mi);
                            sotadataautofill_setTextValue(dateinput, y + "-" + m + "-" + d);  
                            browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: y + "-" + m + "-" + d});
                        } 
                    });

                    if(rownumber == 0){
                        if(activationdate != null){
                            sotadataautofill_setTextValue(localdateinput, activationdate);
                        } else {
                            sotadataautofill_setTextValue(localdateinput, document.getElementById("activationOriginalDate").value);
                        }
                    }

                    if(rownumber > 0){
                        prevtime = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber - 1].querySelector(".col-5").querySelectorAll(".form-control")[1].value
                        sotadataautofill_setTextValue(localtimeinput, prevtime);

                        prevdate = (document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber - 1].querySelector(".col-7").querySelectorAll(".form-control")[1]).value
                        sotadataautofill_setTextValue(localdateinput, prevdate);
                    }
                } else {
                   
                    var activationdate = document.getElementById("activationOriginalDate").value;
                    if(activationdate != null && activationdate != ""){
                        browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: activationdate});
                    }
                
                    timeinput.addEventListener("input", () => {
                        if(timeinput.value.search(/^[0-9]{1}:[0-9]{2}/) >= 0){
                            sotadataautofill_setTextValue(timeinput, "0" + timeinput.value);
                        }
                    });

                    if(rownumber > 0){
                        prevtime = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber - 1].querySelector(".col-5").querySelectorAll(".form-control")[0].value
                        sotadataautofill_setTextValue(document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber].querySelector(".col-5").querySelectorAll(".form-control")[0], prevtime);
                    }

                    currentdate = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber].querySelector(".col-7").querySelectorAll(".form-control")[0].value

                    browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: currentdate});
                
                    dateinput.parentElement.querySelector("button").addEventListener("click", () => {
                        dateinput.parentElement.querySelector("ngb-datepicker").addEventListener("click", () => {
                            browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: dateinput.value});
                        });
                    });

                    document.getElementById("activationDivForm").elements["activatorTimeFormat"].value = "utc";
                }
            });

            if(item.activatorsettings.offset != null){
                document.getElementById("activationUtcOffset").value = item.activatorsettings.offset;
            }

            if(update){
                document.getElementById("activationCloseButton").dispatchEvent(new Event("click", {bubbles: true}));
                document.getElementById("activationaddbutton").dispatchEvent(new Event("click", {bubbles: true}));
            }
        } else {
            var activationdate = document.getElementById("activationOriginalDate").value;
            if(activationdate != null && activationdate != ""){
                browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: activationdate});
            }
        
            timeinput.addEventListener("input", () => {
                if(timeinput.value.search(/^[0-9]{1}:[0-9]{2}/) >= 0){
                    sotadataautofill_setTextValue(timeinput, "0" + timeinput.value);
                }
            });

            if(rownumber > 0){
                prevtime = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber - 1].querySelector(".col-5").querySelectorAll(".form-control")[0].value
                sotadataautofill_setTextValue(document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber].querySelector(".col-5").querySelectorAll(".form-control")[0], prevtime);
            }

            currentdate = document.querySelector(".modal-body").querySelectorAll("div[class = \"row\"]")[rownumber].querySelector(".col-7").querySelectorAll(".form-control")[0].value

            browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: currentdate});
        
            dateinput.parentElement.querySelector("button").addEventListener("click", () => {
                dateinput.parentElement.querySelector("ngb-datepicker").addEventListener("click", () => {
                    browser.runtime.sendMessage({action: "setActivatorSessionStorage", data: dateinput.value});
                });
            });

            document.getElementById("activationDivForm").elements["activatorTimeFormat"].value = "utc";
        }
    });
}

function sotadataautofill_setTextValue(element, value) {
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

    nativeSetter.call(element, value);

    element.dispatchEvent(new Event("input", {bubbles: true }));
}