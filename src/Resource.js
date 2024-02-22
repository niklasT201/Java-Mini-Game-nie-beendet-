class Resources {
    constructor() {

      //Bilder die geladen werden sollen
      this.toLoad = {
        sky: "/sprites/sky.png",
        ground: "/sprites/ground.png",
        hero: "/sprites/hero-sheet.png",
        shadow: "/sprites/shadow.png",
        rod: "/sprites/rod.png",
      };
  
      // Alle Bilder in einem
      this.images = {};
  
      // Laden aller Bilder
      Object.keys(this.toLoad).forEach(key => {
        const img = new Image();
        img.src = this.toLoad[key];
        this.images[key] = {
          image: img,
          isLoaded: false
        }
        img.onload = () => {
          this.images[key].isLoaded = true;
        }
      })
    }
  }
  
  // Create one instance for the whole app to use
  export const resources = new Resources();
  