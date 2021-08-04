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
