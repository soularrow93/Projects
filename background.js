// Add background tasks here, if needed.
// Listen for the context menu item click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'uploadContextMenuItem') {
    // Implement your logic to handle the context menu item click event here
    // For example, you can display a file upload dialog or start the upload process directly
    // You'll need to access the active tab's DOM and interact with the file input and other elements
  }
});

// Create a context menu item for the extension
chrome.contextMenus.create({
  id: 'uploadContextMenuItem',
  title: 'Upload File to ChatGPT',
  contexts: ['all'],
});

// Handle the extension button click event
chrome.browserAction.onClicked.addListener((tab) => {
  // Implement your logic for the extension button click event here
  // For example, you can display a file upload dialog or start the upload process directly
  // You'll need to access the active tab's DOM and interact with the file input and other elements
});
