let urlPattern: string | null = null;
let modifiedCode: string | null = null;

const modifyJavaScript = () => {
  if (!urlPattern) {
    return;
  }

  const filter = {
    urls: [urlPattern],
    types: ["script" as const],
  };

  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (modifiedCode) {
        return {
          redirectUrl:
            "data:application/javascript," + encodeURIComponent(modifiedCode),
        };
      } else {
        chrome.runtime.sendMessage({ type: "jsUrl", url: details.url });
      }
    },
    filter,
    ["blocking"]
  );
};

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: "index.html" });
});

// Listen for messages from the UI
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "modifiedCode") {
    urlPattern = message.urlPattern;
    modifiedCode = message.code;
    modifyJavaScript();
  } else if (message.type === "disableInterception") {
    // Reset the urlPattern and modifiedCode variables
    urlPattern = null;
    modifiedCode = null;

    // Update the modifyJavaScript function to disable the interception
    modifyJavaScript();
  }
});
