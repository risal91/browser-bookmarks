const chrome = require('./browsers/chrome');

/**
 * Retrieves Chrome bookmarks
 *
 * @return {Object[]} - An array of bookmark objects
 */

  const getChrome = async () => {
    try {
      const directories = chrome.getDirectoryChrome(process.platform); // Array of Directorys
      const bookmarks = [];

      for (const directory of directories) {
        const directoryBookmarks = await chrome.extractBookmarks(directory);
        bookmarks.push(...directoryBookmarks);
      }
      return bookmarks;
    } catch (error) {
      console.error('Error retrieving Chrome bookmarks:', error);
      return [];
    }
  };
  const getEdge = async () => {
    try {
      const directories = chrome.getDirectoryEdge(process.platform); // Array of Directorys
      const bookmarks = [];

      for (const directory of directories) {
        const directoryBookmarks = await chrome.extractBookmarks(directory);
        bookmarks.push(...directoryBookmarks);
      }
      return bookmarks;
    } catch (error) {
      console.error('Error retrieving Chrome bookmarks:', error);
      return [];
    }
  };
  const getOpera = async () => {
    try {
      const directories = chrome.getDirectoryOpera(process.platform); // Array of Directorys
      const bookmarks = [];

      for (const directory of directories) {
        const directoryBookmarks = await chrome.extractBookmarks(directory);
        bookmarks.push(...directoryBookmarks);
      }
      return bookmarks;
    } catch (error) {
      console.error('Error retrieving Chrome bookmarks:', error);
      return [];
    }
  };
  const getOperaGX = async () => {
    try {
      const directories = chrome.getDirectoryOperaGX(process.platform); // Array of Directorys
      const bookmarks = [];

      for (const directory of directories) {
        const directoryBookmarks = await chrome.extractBookmarks(directory);
        bookmarks.push(...directoryBookmarks);
      }
      return bookmarks;
    } catch (error) {
      console.error('Error retrieving Chrome bookmarks:', error);
      return [];
    }
  };
  const getBrave = async () => {
    try {
      const directories = chrome.getDirectoryBrave(process.platform); // Array of Directorys
      const bookmarks = [];

      for (const directory of directories) {
        const directoryBookmarks = await chrome.extractBookmarks(directory);
        bookmarks.push(...directoryBookmarks);
      }
      return bookmarks;
    } catch (error) {
      console.error('Error retrieving Chrome bookmarks:', error);
      return [];
    }
  };
  const getVivaldi = async () => {
    try {
      const directories = chrome.getDirectoryVivaldi(process.platform); // Array of Directorys
      const bookmarks = [];

      for (const directory of directories) {
        const directoryBookmarks = await chrome.extractBookmarks(directory);
        bookmarks.push(...directoryBookmarks);
      }
      return bookmarks;
    } catch (error) {
      console.error('Error retrieving Chrome bookmarks:', error);
      return [];
    }
  };


module.exports = {
  getChrome,
  getEdge,
  getOpera,
  getOperaGX,
  getBrave,
  getVivaldi,
};
