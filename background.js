browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action == "getSessionStorage"){
        
        browser.storage.session.get().then(function(sessionItem){
            if(sessionItem.chaseSave){
                sendResponse({sessionStorageData:sessionItem.chaseSave.savedDate})
            }
        });
        
        return true;

    } else if(request.action == "setSessionStorage"){
        var chaseSave = {savedDate: request.data}
        browser.storage.session.set({chaseSave});
    }
});