// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("test");

// Create a new document in the collection.
db.spirits.insertMany([
  {
    Title: "LOUIS XIII : The Classic Decanter",
    distrillery: "Rémy Martin",
    category: "Brandy",
    image:
      "https://aem.lcbo.com/content/dam/lcbo/products/0/9/4/4/094433.jpg.thumb.1280.1280.jpg",
    desc: "The LOUIS XIII Classic decanter has remained the ultimate expression of our finest eaux-de-vie since 1874, an exquisite blend sourced from Grande Champagne terroir, the first cru of the Cognac region.",
    capacity: "700ml",
    alc: 40.0,
  },
  {
    Title: "Tatenokawa 18 Junmai Daiginjo Sake",
    distrillery: "Yamagata",
    category: "Sake",
    image:
      "https://ozawa.ca/wp-content/uploads/2019/08/AL-7405-Tatenokawa-18-JD-720-4.jpg",
    desc: "The crown jewel in the Tatenokawa line-up is made from rice that has been polished down to 18% and bottling only the best part of the sake pressing, nakadori (middle-cut). The aromas are fragrant and clean with flavours of melon, pear and apple fruit gliding through onto the silky sweet, rich palate. Serve with seafood.",
    capacity: "720ml",
    alc: 15.5,
  },
  {
    Title: "KWEICHOU MOUTAI CHIEW - FLYING FAIRY",
    distrillery: "Maotai ",
    category: "Sake",
    image:
      "https://www.bcliquorstores.com/sites/default/files/imagecache/height400px/44826.jpg",
    desc: "Moutai Flying Fairy is made from a base of quality sorghum, organic wheat and water.",
    capacity: "500ml",
    alc: 53,
  },

  {
    Title: "Cable Car Kriek",
    distrillery: "The Lost Abbey ",
    category: "Beer",
    image:
      "https://static.theceomagazine.net/wp-content/uploads/2019/11/27090718/lost-abbey.jpg",
    desc: "slight signs of old seepage 1750ml bottle",
    capacity: "750ml",
    alc: 7,
  },
]);
