async function getSettings(){
    let data = await browser.storage.local.get(defaultValues)
    return data["settings"]
}

async function getWindowsData(){
    let data = await browser.storage.local.get(defaultValues)
    return data["savedWindows"]
}

async function loadPage(){
    let savedWindows = await getWindowsData()
    let settings = await getSettings()
    for (let pendingWindow of savedWindows){
        let url = pendingWindow.createData.tabs.url
        let width = pendingWindow.updateData.width
        let height = pendingWindow.updateData.height
        let x = pendingWindow.updateData.left
        let y = pendingWindow.updateData.top
        let w = await browser.windows.create({"type":"popup","url":url})
        await browser.windows.update(w.id,{"width":width,"height":height, "left":x + settings.x_offset,"top":y + settings.y_offset})
    }
}

async function addPage() {
    let toBeAddedWindow = await browser.tabs.query({"active":true,"currentWindow":true})
    if (toBeAddedWindow.length==1){
        await browser.windows.create({"type":"popup","url":toBeAddedWindow[0].url,"width":400,"height":400})
    } else {
        console.error("An error occurred while trying to convert this page into a popup.")
    }
}

async function savePage() {
    let windowData=await browser.windows.getAll({populate:true,windowTypes:["popup"]})

    let dataToStore=[]
    for (pendingWindow of windowData){
        dataToStore.push({
            "createData":{
                "tabs":{"url":pendingWindow.tabs[0].url}
            },
            "updateData":{
                "width":pendingWindow.width,
                "height":pendingWindow.height,
                "left":pendingWindow.left,
                "top":pendingWindow.top
            }
        })
    }

    await browser.storage.local.set({"savedWindows":dataToStore})
}

async function reloadPages(){
    let windowData=await browser.windows.getAll({windowTypes:["popup"]})
    for (let w of windowData){
        await browser.windows.remove(w.id)
    }
    await loadPage()
}

async function resetStorage() {
    await browser.storage.local.set(defaultValues)
}
