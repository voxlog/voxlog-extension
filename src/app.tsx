import { 
  createVoxMenu, createVoxBackdrop, createVoxUrlInput, createVoxTokenInput,
  createVoxSaveBtn, createVoxErrorMsg, createVoxCloseBtn
} from "./uiBuilder";

// Front-end functions
function createFrontend() {
    // Create voxlog's popup menu
    const voxMenu = createVoxMenu();

    // A black backdrop for the popup menu
    const voxBackdrop = createVoxBackdrop();
  
    // voxlog instance url input
    createVoxUrlInput(voxMenu);
  
    // The token input
    createVoxTokenInput(voxMenu);
  
    // Save button
    createVoxSaveBtn(voxMenu, saveVoxLogSettings);
  
    // Close button
    createVoxCloseBtn(voxMenu, hideVoxLogMenu);
  
    // Error message
    createVoxErrorMsg(voxMenu);
  
    // Add it to the UI
    document.body.appendChild(voxBackdrop);
    document.body.appendChild(voxMenu);
  
    // Button to open voxlog settings.
    // Attached to Spotify's settings menu.
    const voxBtn = new Spicetify.Menu.Item("voxlog", false, () => showVoxLogMenu());
    voxBtn.register();
}

function showVoxLogMenu(){
  // Get the url and token from local storage
  const voxUrl = Spicetify.LocalStorage.get("voxUrl");
  const voxToken = Spicetify.LocalStorage.get("voxToken");
  // Set the url and token in the input fields
  // @ts-ignore
  document.querySelector(".voxUrlInput").value = voxUrl;
  // @ts-ignore
  document.querySelector(".voxTokenInput").value = voxToken;
  // @ts-ignore
  document.getElementById("voxBackdrop").style.display = "block";
  // @ts-ignore
  document.getElementById("voxMenu").style.display = "block";
}

function hideVoxLogMenu(){
  // Hide error message
  // @ts-ignore
  document.querySelector(".voxErrorMsg").style.display = "none";
  // @ts-ignore
  document.getElementById("voxBackdrop").style.display = "none";
  // @ts-ignore
  document.getElementById("voxMenu").style.display = "none";
}

function saveVoxLogSettings(){
  // @ts-ignore
  const voxUrl = document.querySelector(".voxUrlInput").value;
  // @ts-ignore
  const voxToken = document.querySelector(".voxTokenInput").value;
  // @ts-ignore
  const voxErrorMsg = document.querySelector(".voxErrorMsg");
  
  // If the url or token is empty
  if(voxUrl == "" || voxToken == ""){
    // @ts-ignore
    voxErrorMsg.innerHTML = ("Please fill all the fields");
    // @ts-ignore
    voxErrorMsg.style.display = "block";
    return;
  }

  // If the url is not a valid url
  // Check with regex
  if(!voxUrl.match(/^(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/)){
    // @ts-ignore
    voxErrorMsg.innerHTML = ("Please enter a valid url");
    // @ts-ignore
    voxErrorMsg.style.display = "block";
    return;
  }

  // @ts-ignore
  voxErrorMsg.style.display = "none";

  // If the url is valid
  // Save the url and token
  Spicetify.LocalStorage.set("voxUrl", voxUrl);
  Spicetify.LocalStorage.set("voxToken", voxToken);

  // Hide the menu
  hideVoxLogMenu();
}

function main() {
  createFrontend();
}

export default main;
