browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action == "getSessionStorage"){
        
        browser.storage.session.get().then(function(sessionItem){
            if(sessionItem.chaseSave){
                sendResponse({sessionStorageData:sessionItem.chaseSave.savedDate})
            }
        });
        
        return true;

    } else if (request.action == "getActivatorSessionStorage"){
        browser.storage.session.get().then(function(sessionItem){
            if(sessionItem.activationSave){
                sendResponse({sessionStorageData:sessionItem.activationSave.savedDate})
            }
        });
        
        return true;

    } else if(request.action == "setChaserSessionStorage"){
        var chaseSave = {savedDate: request.data}
        browser.storage.session.set({chaseSave});
    } else if (request.action == "setActivatorSessionStorage"){
        var activationSave = {savedDate: request.data}
        browser.storage.session.set({activationSave});
    }
});