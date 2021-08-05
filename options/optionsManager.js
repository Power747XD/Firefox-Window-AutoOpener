async function saveSettings(){
    let x_offset = parseInt(document.getElementById("x-offset").value)
    let y_offset = parseInt(document.getElementById("y-offset").value)
    let settingsToLoad = {
        "x_offset":x_offset,
        "y_offset":y_offset
    }
    await browser.storage.local.set({"settings":settingsToLoad})
}
document.getElementById("save-changes").addEventListener("click", saveSettings)

async function loadSettings() {
    let { settings } = await browser.storage.local.get({settings: {x_offset: 0, y_offset: 0}})
    document.getElementById("x-offset").value = settings.x_offset
    document.getElementById("y-offset").value = settings.y_offset
}
loadSettings()