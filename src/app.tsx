function showVoxLogMenu(){
  // Get the url and token from local storage
  let voxUrl = Spicetify.LocalStorage.get("voxUrl");
  let voxToken = Spicetify.LocalStorage.get("voxToken");
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
  // @ts-ignore
  document.getElementById("voxBackdrop").style.display = "none";
  // @ts-ignore
  document.getElementById("voxMenu").style.display = "none";
}

function saveVoxLogSettings(){
  // @ts-ignore
  let voxUrl = document.querySelector(".voxUrlInput").value;
  // @ts-ignore
  let voxToken = document.querySelector(".voxTokenInput").value;
  // @ts-ignore
  let voxErrorMsg = document.querySelector(".voxErrorMsg");
  
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
  // Check local storage for voxlog settings
  let voxUrl = Spicetify.LocalStorage.get("voxUrl");
  let voxToken = Spicetify.LocalStorage.get("voxToken");
  console.log("VOX DATA", voxUrl, voxToken);

  // Create voxlog's popup menu
  let voxMenu = document.createElement("div");
  voxMenu.innerHTML = `
    <h2>voxlog</h2>
  `;
  voxMenu.style.display = "none";

  // A black backdrop
  let voxBackdrop = document.createElement("div");
  voxBackdrop.style.position = "fixed";
  voxBackdrop.style.top = "0";
  voxBackdrop.style.left = "0";
  voxBackdrop.style.width = "100%";
  voxBackdrop.style.height = "100%";
  voxBackdrop.style.background = "rgba(0, 0, 0, 0.5)";
  voxBackdrop.style.zIndex = "1";
  voxBackdrop.id = "voxBackdrop";
  voxBackdrop.style.display = "none";

  voxMenu.style.position = "absolute";
  voxMenu.style.top = "50%";
  voxMenu.style.left = "50%";
  voxMenu.style.transform = "translate(-50%, -50%)";
  voxMenu.style.width = "300px";
  voxMenu.style.background = "#121212";
  voxMenu.style.borderRadius = "10px";
  voxMenu.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";
  voxMenu.style.zIndex = "2";
  voxMenu.style.padding = "20px";
  voxMenu.style.color = "#fff";
  voxMenu.id = "voxMenu";

  // voxlog instance url input
  let voxUrlInput = document.createElement("input");
  voxUrlInput.type = "text";
  voxUrlInput.style.width = "100%";
  voxUrlInput.style.padding = "10px";
  voxUrlInput.style.borderRadius = "5px";
  voxUrlInput.style.border = "none";
  voxUrlInput.style.height = "40px";
  voxUrlInput.placeholder = "Instance URL here";
  voxUrlInput.style.marginBottom = "10px";
  voxUrlInput.style.marginTop = "10px";
  voxUrlInput.className = "voxUrlInput";

  // The token input
  let voxTokenInput = document.createElement("input");
  voxTokenInput.type = "text";
  voxTokenInput.style.width = "100%";
  voxTokenInput.style.padding = "10px";
  voxTokenInput.style.borderRadius = "5px";
  voxTokenInput.style.border = "none";
  voxTokenInput.style.height = "40px";
  voxTokenInput.placeholder = "Your token here";
  voxTokenInput.className = "voxTokenInput";

  // Save button
  let voxSaveBtn = document.createElement("button");
  voxSaveBtn.style.width = "40%";
  voxSaveBtn.style.float = "right";
  voxSaveBtn.style.padding = "10px";
  voxSaveBtn.style.borderRadius = "20px";
  voxSaveBtn.style.border = "none";
  voxSaveBtn.style.height = "40px";
  voxSaveBtn.style.background = "#1db954";
  voxSaveBtn.style.color = "#fff";
  voxSaveBtn.style.marginTop = "10px";
  voxSaveBtn.innerHTML = "Save";
  // On button hover
  voxSaveBtn.onmouseover = () => {
    voxSaveBtn.style.background = "#1ed760";
  };
  // On button unhover
  voxSaveBtn.onmouseout = () => {
    voxSaveBtn.style.background = "#1db954";
  };
  // Cursor pointer
  voxSaveBtn.style.cursor = "pointer";

  // Close button
  let voxCloseBtn = document.createElement("div");
  voxCloseBtn.innerHTML = `
    <svg role="img" height="16" width="16" aria-hidden="true" aria-label="Fechar" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"></path></svg>
  `;
  voxCloseBtn.style.width = "32px";
  voxCloseBtn.style.height = "32px";
  voxCloseBtn.style.borderRadius = "50%";
  voxCloseBtn.style.position = "absolute";
  voxCloseBtn.style.top = "16px";
  voxCloseBtn.style.right = "16px";
  voxCloseBtn.style.cursor = "pointer";
  voxCloseBtn.style.textAlign = "center";
  voxCloseBtn.style.display = "flex";
  voxCloseBtn.style.justifyContent = "center";
  voxCloseBtn.style.alignItems = "center";
  // On hover
  voxCloseBtn.onmouseover = () => {
    voxCloseBtn.style.background = "hsla(0,0%,100%,.1)";
  };
  // On unhover
  voxCloseBtn.onmouseout = () => {
    voxCloseBtn.style.background = "transparent";
  };

  // Error message
  let voxErrorMsg = document.createElement("div");
  voxErrorMsg.className = "voxErrorMsg";
  voxErrorMsg.style.color = "#ff0000";
  voxErrorMsg.style.marginTop = "10px";
  voxErrorMsg.style.display = "none";

  voxMenu.appendChild(voxUrlInput);
  voxMenu.appendChild(voxTokenInput);
  voxMenu.appendChild(voxSaveBtn);
  voxMenu.appendChild(voxCloseBtn);
  voxMenu.appendChild(voxErrorMsg);

  // Add it to the UI
  document.body.appendChild(voxBackdrop);
  document.body.appendChild(voxMenu);

  let voxBtn = new Spicetify.Menu.Item("voxlog", false, () => showVoxLogMenu());
  voxBtn.register();

  // Button to close (event)
  voxCloseBtn.onclick = () => {
    hideVoxLogMenu();
  };

  // Button to save (event)
  voxSaveBtn.onclick = () => {
    saveVoxLogSettings();
  };
}

export default main;
