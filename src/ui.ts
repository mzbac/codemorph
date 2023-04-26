import * as monaco from "monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";

async function initUI() {
  const editor = monaco.editor.create(document.getElementById("editor")!, {
    value: "",
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    wordWrap: "on", 
  });

  const urlPatternInput = document.getElementById(
    "urlPattern"
  ) as HTMLInputElement;
  const saveChangesButton = document.getElementById(
    "saveChanges"
  ) as HTMLButtonElement;
  const clearButton = document.getElementById("clear") as HTMLButtonElement;

  saveChangesButton.addEventListener("click", () => {
    // Send the modified code and URL pattern to the background script
    chrome.runtime.sendMessage({
      type: "modifiedCode",
      urlPattern: urlPatternInput.value,
      code: editor.getValue(),
    });
  });

  clearButton.addEventListener("click", () => {
    // Clear the editor content and URL pattern input
    editor.setValue("");
    urlPatternInput.value = "";

    // Send a message to the background script to disable the interception
    chrome.runtime.sendMessage({
      type: "disableInterception",
    });
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(async (message) => {
    if (message.type === "jsUrl") {
      const response = await fetch(message.url);
      const jsContent = await response.text();

      // Set the fetched JS content as the editor content
      editor.setValue(jsContent);
    }
  });
}

initUI();
