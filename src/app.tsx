function sayHi(){
  Spicetify.showNotification("Hello, world!");
}

async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Create voxlog's popup menu

  let voxBtn = new Spicetify.Menu.Item("voxlog", false, () => sayHi());
  voxBtn.register();
}

export default main;
