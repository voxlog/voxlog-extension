function sayHi(){
  Spicetify.showNotification("Hello, world!");
}

async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Create voxlog's popup menu
  let voxMenu = document.createElement("div");
  voxMenu.innerHTML = `
    <h2>voxlog</h2>
  `;

  // A black backdrop
  let voxBackdrop = document.createElement("div");
  voxBackdrop.style.display = "block";
  voxBackdrop.style.position = "fixed";
  voxBackdrop.style.top = "0";
  voxBackdrop.style.left = "0";
  voxBackdrop.style.width = "100%";
  voxBackdrop.style.height = "100%";
  voxBackdrop.style.background = "rgba(0, 0, 0, 0.5)";
  voxBackdrop.style.zIndex = "9998";

  voxMenu.style.display = "block";
  voxMenu.style.position = "absolute";
  voxMenu.style.top = "50%";
  voxMenu.style.left = "50%";
  voxMenu.style.transform = "translate(-50%, -50%)";
  voxMenu.style.width = "300px";
  voxMenu.style.background = "#121212";
  voxMenu.style.borderRadius = "10px";
  voxMenu.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";
  voxMenu.style.zIndex = "9999";
  voxMenu.style.padding = "20px";
  voxMenu.style.color = "#fff";

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

  // The token input
  let voxTokenInput = document.createElement("input");
  voxTokenInput.type = "text";
  voxTokenInput.style.width = "100%";
  voxTokenInput.style.padding = "10px";
  voxTokenInput.style.borderRadius = "5px";
  voxTokenInput.style.border = "none";
  voxTokenInput.style.height = "40px";
  voxTokenInput.placeholder = "Your token here";

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


  /*
      width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    text-align: center;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    */
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

  voxMenu.appendChild(voxUrlInput);
  voxMenu.appendChild(voxTokenInput);
  voxMenu.appendChild(voxSaveBtn);
  voxMenu.appendChild(voxCloseBtn);

  // Add it to the UI
  document.body.appendChild(voxBackdrop);
  document.body.appendChild(voxMenu);

  let voxBtn = new Spicetify.Menu.Item("voxlog", false, () => sayHi());
  voxBtn.register();
}

export default main;
