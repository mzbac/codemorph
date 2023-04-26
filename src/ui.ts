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

  saveChangesButton.addEventListener("click", async () => {
    if(!editor.getValue()){
      const response = await fetch(urlPatternInput.value);
      const jsContent = await response.text();

      editor.setValue(jsContent);
    }

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
}

initUI();
