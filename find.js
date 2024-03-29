const {readFile, writeFile, promises: fsPromises} = require('fs');
const path = require('path');
const fs = require('fs');

const FontAwesomeMigrations = [
  { font5: 'fab fa-amazon-pay', font6: 'fa-brands fa-amazon-pay'},
  { font5: 'fab fa-cloudversify', font6: 'fa-brands fa-cloudversify'},
  { font5: 'fas fa-grin-tongue-wink', font6: 'fa-regular fa-face-grin-tongue-wink'},
  { font5: 'far fa-angry', font6: 'fa-regular fa-face-angry'},
  { font5: 'far fa-chart-bar', font6: 'fa-regular fa-chart-bar'},
  { font5: 'far fa-copy', font6: 'fa-regular fa-copy'},
  { font5: 'far fa-eye-slash', font6: 'fa-regular fa-eye-slash'},
  { font5: 'far fa-file-alt', font6: 'fa-regular fa-file-lines'},
  { font5: 'far fa-file-archive', font6: 'fa-regular fa-file-zipper'},
  { font5: 'far fa-file-audio', font6: 'fa-regular fa-file-audio'},
  { font5: 'far fa-file-excel', font6: 'fa-regular fa-file-excel'},
  { font5: 'far fa-file-pdf', font6: 'fa-regular fa-file-pdf'},
  { font5: 'far fa-file-powerpoint', font6: 'fa-regular fa-file-powerpoint'},
  { font5: 'far fa-file-video', font6: 'fa-regular fa-file-video'},
  { font5: 'far fa-file-word', font6: 'fa-regular fa-file-word'},
  { font5: 'far fa-file', font6: 'fa-regular fa-file'},
  { font5: 'far fa-folder-open', font6: 'fa-regular fa-folder-open'},
  { font5: 'far fa-folder', font6: 'fa-regular fa-folder'},
  { font5: 'far fa-hdd', font6: 'fa-regular fa-hard-drive'},
  { font5: 'far fa-meh', font6: 'fa-regular fa-face-meh'},
  { font5: 'far fa-question-circle', font6: 'fa-regular fa-circle-question'},
  { font5: 'fas fa-question', font6: 'fa-regular fa-question'},
  { font5: 'far fa-star', font6: 'fa-regular fa-star'},
  { font5: 'fas fa-tree', font6: 'fa-solid fa-tree'},
  { font5: 'fas fa-angle-double-down', font6: 'fa-solid fa-angles-down'},
  { font5: 'fas fa-angle-double-up', font6: 'fa-solid fa-angles-up'},
  { font5: 'fas fa-angle-down', font6: 'fa-solid fa-angle-down'},
  { font5: 'fas fa-angle-left', font6: 'fa-solid fa-angle-left'},
  { font5: 'fas fa-angle-up', font6: 'fa-solid fa-angle-up'},
  { font5: 'fas fa-archive', font6: 'fa-solid fa-box-archive'},
  { font5: 'fas fa-bars', font6: 'fa-solid fa-bars'},
  { font5: 'fas fa-biohazard', font6: 'fa-solid fa-biohazard'},
  { font5: 'fas fa-bug', font6: 'fa-solid fa-bug' },
  { font5: 'fas fa-candy-cane', font6: 'fa-solid fa-candy-cane'},
  { font5: 'fas fa-cash-register', font6: 'fa-solid fa-cash-register'},
  { font5: 'fas fa-charging-station', font6: 'fa-solid fa-charging-station'},
  { font5: 'fas fa-check-circle', font6: 'fa-regular fa-circle-check' },
  { font5: 'fas fa-check-double', font6: 'fa-solid fa-check-double' },
  { font5: 'fas fa-check', font6: 'fa-solid fa-check' },
  { font5: 'fas fa-chevron-down', font6: 'fa-solid fa-chevron-down'},
  { font5: 'fas fa-chevron-right', font6: 'fa-solid fa-chevron-right'},
  { font5: 'fas fa-circle-notch', font6: 'fa-solid fa-circle-notch'},
  { font5: 'fas fa-code', font6: 'fa-solid fa-code'},
  { font5: 'fas fa-coffee', font6: 'fa-solid fa-mug-saucer'},
  { font5: 'fas fa-edit', font6: 'fa-regular fa-pen-to-square' },
  { font5: 'fas fa-ellipsis-h', font6: 'fa-solid fa-ellipsis'},
  { font5: 'fas fa-external-link-alt', font6: 'fa-solid fa-up-right-from-square'},
  { font5: 'fas fa-hamburger', font6: 'fa-solid fa-burger'},
  { font5: 'fas fa-inbox', font6: 'fa-solid fa-inbox'},
  { font5: 'fas fa-lightbulb', font6: 'fa-regular fa-lightbulb'},
  { font5: 'fas fa-map-pin', font6: 'fa-solid fa-map-pin'},
  { font5: 'fas fa-pizza-slice', font6: 'fa-solid fa-pizza-slice'},
  { font5: 'fas fa-plus', font6: 'fa-regular fa-plus' },
  { font5: 'fas fa-redo', font6: 'fa-solid fa-rotate-right'},
  { font5: 'fas fa-search-plus', font6: 'fa-solid fa-magnifying-glass-plus'},
  { font5: 'fas fa-search', font6: 'fa-solid fa-magnifying-glass'},
  { font5: 'fas fa-share', font6: 'fa-solid fa-share'},
  { font5: 'fas fa-sort-alpha-down-alt', font6: 'fa-solid fa-arrow-down-z-a'},
  { font5: 'fas fa-sort-alpha-up', font6: 'fa-solid fa-arrow-up-a-z'},
  { font5: 'fas fa-sort', font6: 'fa-solid fa-sort'},
  { font5: 'fas fa-spinner', font6: 'fa-solid fa-spinner'},
  { font5: 'fas fa-sync', font6: 'fa-solid fa-rotate'},
  { font5: 'fas fa-times', font6: 'fa-solid fa-xmark' },
  { font5: 'fas fa-toggle-off', font6: 'fa-solid fa-toggle-off'},
  { font5: 'fas fa-toggle-on', font6: 'fa-solid fa-toggle-on'},
  { font5: 'fas fa-trash-alt', font6: 'fa-regular fa-trash-can' },
  { font5: 'fas fa-trash', font6: 'fa-solid fa-trash'},
  { font5: 'fas fa-user-circle', font6: 'fa-regular fa-circle-user'},
  { font5: 'fas fa-wifi', font6: 'fa-solid fa-wifi' },
  { font5: 'fas fa-window-maximize', font6: 'fa-regular fa-window-maximize' },
  { font5: 'fas fa-window-minimize', font6: 'fa-regular fa-window-minimize' },
  { font5: 'fas fa-window-restore', font6: 'fa-regular fa-window-restore' },
];

async function replaceInFile(filename, regex, replacement) {

    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');

      const match = new RegExp(regex).exec(contents);

      if (match != null) {
        const count = match.length;
        console.log(`${regex} > ${filename} (${count})`);
        const replaced = contents.replace(regex, replacement);
        await fsPromises.writeFile(filename, replaced);
      }

    } catch (err) {
      console.log(err);
    }

}

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {

      const filename = path.join(__dirname, dirPath, "/", file);

      if (filename.endsWith("ts") || filename.endsWith("html")) {
        if (!filename.includes("fontawesome-migration.ts")) {
          arrayOfFiles.push(filename)
        }

      }

    }
  })

  return arrayOfFiles
}

async function run() {
  try {
    const allFilePaths = getAllFiles("./projects/ngx-smz-ui");

    console.log(`Iterating into ${allFilePaths.length} files.`);

    allFilePaths.forEach(function(file) {

        FontAwesomeMigrations.forEach(function(migration) {
          replaceInFile(file, new RegExp(migration.font5, 'g'), migration.font6);
        })

    })

  } catch (err) {
    console.log(err);
  }
}

run();