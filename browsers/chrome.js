const fs = require('fs');
const os = require('os');
const path = require('path');
const utils = require('../utils');

/**
 * Retrieve the directory to the Google Chrome default profile.
 *
 * https://www.chromium.org/user-experience/user-data-directory
 *
 * @param {String} profile - The profile name (default: "Default")
 * @return {String} - The directory to the Google Chrome profile
 */
const getDirectoryChrome = (platform) => {
  return getProfileChrome(platform)
};
const getDirectoryEdge = (platform) => {
  return getProfileEdge(platform)
};
const getDirectoryOpera = (platform) => {
  return getProfileOpera(platform)
};
const getDirectoryOperaGX = (platform) => {
  return getProfileOperaGX(platform)
};
const getDirectoryVivaldi = (platform) => {
  return getProfileVivaldi(platform)
};
const getDirectoryBrave = (platform) => {
  return getProfileBrave(platform)
};

function getProfileChrome(platform){
  let targetPath;
  switch (platform) {
    case 'darwin':
      targetPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Google',
        'Chrome',
      );
      break;
    case 'win32':
      targetPath = path.join(
        process.env.LOCALAPPDATA,
        'Google',
        'Chrome',
        'User Data',
      );
      break;
    case 'linux':
      targetPath = path.join(
        os.homedir(),
        '.config',
        'google-chrome',
      );
      break;
    }
  return findFolders(targetPath)
}
function getProfileEdge(platform){
  let targetPath;
  switch (platform) {
    case 'darwin':
      targetPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Microsoft Edge',
      );
      break;
    case 'win32':
      targetPath = path.join(
        process.env.LOCALAPPDATA,
        'Microsoft',
        'Edge',
        'User Data',
      );
      break;
    case 'linux':
      targetPath = path.join(
        os.homedir(),
        '.config',
        'microsoft-edge',
      );
      break;
    }
  return findFolders(targetPath)
}
function getProfileOpera(platform){
  let targetPath;
  switch (platform) {
    case 'darwin':
      targetPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'com.operasoftware.Opera',
      );
      break;
    case 'win32':
      targetPath = path.join(
        process.env.APPDATA,
        'Opera Software',
        'Opera Stable',
      );
      break;
    case 'linux':
      targetPath = path.join(
        os.homedir(),
        '.config',
        'opera',
      );
      break;
    }
  return findFolders(targetPath)
}
function getProfileOperaGX(platform){
  let targetPath;
  switch (platform) {
    case 'darwin':
      targetPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'com.operasoftware.Opera',
      );
      break;
    case 'win32':
      targetPath = path.join(
        process.env.APPDATA,
        'Opera Software',
        'Opera GX Stable',
      );
      break;
    case 'linux':
      targetPath = path.join(
        os.homedir(),
        '.config',
        'opera',
      );
      break;
    }
  return findFolders(targetPath)
}
function getProfileVivaldi(platform){
  let targetPath;
  switch (platform) {
    case 'darwin':
      targetPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'vivaldi',
      );
      break;
    case 'win32':
      targetPath = path.join(
        process.env.LOCALAPPDATA,
        'Vivaldi',
        'User Data',
      );
      break;
    case 'linux':
      targetPath = path.join(
        os.homedir(),
        '.config',
        'vivaldi',
      );
      break;
    }
  return findFolders(targetPath)
}
function getProfileBrave(platform){
  let targetPath;
  switch (platform) {
    case 'darwin':
      targetPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'BraveSoftware',
        'Brave-Browser',

      );
      break;
    case 'win32':
      targetPath = path.join(
        process.env.LOCALAPPDATA,
        'BraveSoftware',
        'Brave-Browser',
        'User Data',
      );
      break;
    case 'linux':
      targetPath = path.join(
        os.homedir(),
        '.config',
        'BraveSoftware',
        'Brave-Browser'
      );
      break;
    }
  return findFolders(targetPath)
}

function filterList(list){
  return list.filter(item => item.includes("Default") || item.includes("Bookmarks") || item.includes("Profile"));
};
function findFolders(directory){
  let results = [];
  let list = fs.readdirSync(directory)
    list = filterList(list);
    console.log(list);

  list.forEach(file => {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath)

    //if(stats.isDirectory()){
      if(file.includes('Default') ||  file.includes('Profile')){
        const bookmarkPath = path.join(fullPath, 'Bookmarks');
        results.push(bookmarkPath);
      } else if (file === 'Bookmarks') {
        results.push(fullPath);
      }
    //}
  })
  let i = 0
  results.forEach(element => {
    i++
    console.log(i +":"+ element)
  });
  return results;
}

/**
 * Normalizes the Chrome bookmark item to our bookmark model.
 *
 * @param {Object} item
 * @return {Object}
 */
const normalize = item => ({
  title: item.name,
  url: item.url,
  favicon: utils.getFavicon(item.url),
  folder: item.folder || '',
});

/**
 * Recursively retrieve a list of child nodes of bookmark objects.
 * Flattens the tree and appends a new "folder" property for reference.
 *
 * @param {Object[]}
 * @return {Object[]}
 */
const getChildren = (children) => {
  // build the bookmarks list
  let bookmarks = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 'folder') {
      const gc = getChildren(child.children);
      for (let j = 0; j < gc.length; j++) {
        const fgc = Object.assign({}, gc[j], {
          folder: child.name,
        });
        bookmarks.push(fgc);
      }
    } else {
      bookmarks.push(child);
    }
  }
  return bookmarks;
};

/**
 * Reads the file and extract the bookmarks.
 *
 * @param {String} file - The path to the bookmarks file
 * @return {Promise} - An array of bookmark objects
 */
const extractBookmarks = file => new Promise((resolve) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      resolve([]);
    } else {
      const dataJson = JSON.parse(data);
      if (dataJson.roots) {
        // build the bookmarks list
        let bookmarks = [];
        let keys = Object.keys(dataJson.roots);
        for (let i = 0; i < keys.length; i++) {
          const folder = keys[i];
          const rootObject = dataJson.roots[folder];
          // retrieve child nodes in each root folder
          // and concatenate to global collection
          const children = rootObject.children ? getChildren(rootObject.children) : [];
          if (children.length) {
            for (let j = 0; j < children.length; j++) {
              bookmarks.push(children[j]);
            }
          }
        }
        const nb = new Array(bookmarks.length);
        for (let i = 0; i < bookmarks.length; i++) {
          nb[i] = normalize(bookmarks[i]);
        }
        resolve(nb);
      } else {
        resolve([]);
      }
    }
  });
});

module.exports = {
  getDirectoryChrome,
  getDirectoryEdge,
  getDirectoryBrave,
  getDirectoryOpera,
  getDirectoryOperaGX,
  getDirectoryVivaldi,
  getChildren,
  extractBookmarks,
  normalize,
};
