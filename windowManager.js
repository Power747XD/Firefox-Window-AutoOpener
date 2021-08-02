async function getWindowsData(){
    let savedWindows = await browser.storage.local.get("savedWindows")
    if (Object.keys(savedWindows).length==0){
        browser.storage.local.set(defaultWindows)
        savedWindows = await browser.storage.local.get("savedWindows")
    }
    return savedWindows
}
console.log(getWindowsData())

async function loadPage(){
    let savedWindows = await getWindowsData()
    for (pendingWindow of savedWindows["savedWindows"]){
        let url = pendingWindow.createData.tabs.url
        let width = pendingWindow.updateData.width
        let height = pendingWindow.updateData.height
        let x = pendingWindow.updateData.left
        let y = pendingWindow.updateData.top
            browser.windows.create({"type":"popup","url":url}).then((w)=>{
            browser.windows.update(w.id,{"width":width,"height":height,"left":x,"top":y})});
    }
    }

async function addPage() {
    let toBeAddedWindow = await browser.tabs.query({"active":true,"currentWindow":true})
    if (toBeAddedWindow.length==1){
        browser.windows.create({"type":"popup","url":toBeAddedWindow[0].url,"width":400,"height":400})
    } else {
        console.log("An error occurred while trying to convert this page into a popup.")
    }
}

async function savePage() {
    let windowData=await browser.windows.getAll({populate:true,windowTypes:["popup"]})
    let dataToStore=new Array;
    let arrayCounter=0
        for (pendingWindow of windowData){
            dataToStore[arrayCounter]={"createData":{"tabs":{"url":pendingWindow.tabs[0].url}},
        "updateData":{"width":pendingWindow.width,
        "height":pendingWindow.height,
        "left":pendingWindow.left,
        "top":pendingWindow.top}}
        arrayCounter=arrayCounter+1
        }
    arrayCounter=0
    browser.storage.local.set({"savedWindows":dataToStore})
}

async function reloadPages(){
    let windowData=await browser.windows.getAll({windowTypes:["popup"]})
    for (w of windowData){
        browser.windows.remove(w.id)
    }
    loadPage()
}

async function resetStorage() {
    browser.storage.local.set(defaultWindows)
}
