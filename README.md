# CodeMorph Chrome Extension

CodeMorph is a Chrome extension that allows you to intercept JavaScript files, modify their content, and apply the changes on-the-fly. It provides a user-friendly interface with the Monaco Editor for editing the intercepted JavaScript files, giving you control over the code that is executed on web pages.

## Features

- Intercept JavaScript files based on URL patterns
- Modify the content of intercepted JavaScript files using the Monaco Editor
- Apply changes in real-time
- Save and clear modifications easily

## Installation

1. Clone the repository:

```
git clone https://github.com/mzbac/codemorph
```

2. Change to the `codemorph` directory:

```
cd codemorph
```

3. Install the dependencies:

```
npm install
```

4. Build the extension:

```
npm run build
```

5. Load the extension in Chrome:

- Open the Chrome browser and navigate to `chrome://extensions`
- Enable "Developer mode" in the top right corner
- Click on "Load unpacked" and select the `codemorph/dist` directory

## Usage

1. Open the CodeMorph extension by clicking on its icon in the Chrome toolbar.
2. Enter a URL pattern for the JavaScript files you want to intercept (e.g., `*://*.example.com/*.js`).
3. The intercepted JavaScript file will be loaded in the Monaco Editor for editing.
4. Modify the code as needed and click "Save Changes" to apply the modifications.
5. If you want to disable the interception and clear the modifications, click "Clear".
