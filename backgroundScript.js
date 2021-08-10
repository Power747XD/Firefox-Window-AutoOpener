browser.runtime.onStartup.addListener(loadPage)

browser.commands.onCommand.addListener((command)=>{
    if (command==="reload-windows-keyboard"){
        reloadPages()
    }
    else if (command==="save-windows-keyboard"){
        savePage()
    }
    else if (command==="convert-windows-keyboard"){
        addPage()
    }
})

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "loadPage":
            loadPage()
            break
        case "addPage":
            addPage()
            break
        case "savePage":
            savePage()
            break
        case "reloadPages":
            reloadPages()
            break
        case "resetStorage":
            resetStorage()
            break
    }
})

browser.contextMenus.create({id:"current-to-popup",title:"Convert this page into a popup",contexts:["all"]})
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId=="current-to-popup"){
        addPage()
    }
})