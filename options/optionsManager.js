async function saveSettings(){
    let x_offset = parseInt(document.getElementById("x-offset").value)
    let y_offset = parseInt(document.getElementById("y-offset").value)
    let settingsToLoad = {
        "x_offset":x_offset,
        "y_offset":y_offset
    }
    console.log(settingsToLoad)
    await browser.storage.local.set({"settings":settingsToLoad})
}

document.getElementById("save-changes").addEventListener("click", saveSettings)