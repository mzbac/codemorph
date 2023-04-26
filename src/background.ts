let urlPattern: string | null = null;
let modifiedCode: string | null = null;

const modifyJavaScript = async () => {
  const ruleId = 1;

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [ruleId],
  });

  if (urlPattern && modifiedCode) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: ruleId,
          priority: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: {
              url: "data:application/javascript," + encodeURIComponent(modifiedCode),
            },
          },
          condition: {
            urlFilter: urlPattern,
            resourceTypes: [chrome.declarativeNetRequest.ResourceType.SCRIPT],
          },
        },
      ],
    });
  } 
};

chrome.action.onClicked.addListener(() => {
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
