# 📸 SnagShot - The Ultimate Snipping Tool

SnagShot is a lightweight and powerful browser extension designed for developers, designers, and students to capture, edit, and share screenshots directly from their web browser. Say goodbye to cumbersome desktop tools and hello to instant, in-browser screen capturing.

---

## 🚀 Live Demo

*(A short GIF of the extension in action is the best way to showcase your project! I've left a placeholder for you to add one later.)*



---

## ✨ Features

* **Multiple Capture Modes:**
    * 🖼️ **Full Page:** Capture an entire webpage from top to bottom.
    * 🖥️ **Visible Area:** Instantly grab what you currently see in your browser window.
    * ✂️ **Snip & Snip (Selected Area):** Draw a box around the exact area you want to capture.
* **Basic Editing Tools:**
    * Annotate your screenshots with simple drawing and text tools. *(A great feature to add!)*
* **Easy Export:**
    * Download your captures as PNG or JPG files.
    * Copy screenshots directly to your clipboard.

---

## 💻 Tech Stack

SnagShot is built with modern web technologies, leveraging the power of browser APIs.

* **Core:** Vanilla **JavaScript (ES6+)**, **HTML5**, **CSS3**
* **Browser APIs:** **WebExtensions API** (`chrome.tabs`, `chrome.runtime`) for core extension functionality.
* **Configuration:** **`manifest.json`** to define the extension's permissions, UI, and scripts.

---

## 🛠️ Installation & Setup

To install and test this extension locally, follow these steps:

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/Mallika-coder/SnagShot.git](https://github.com/Mallika-coder/SnagShot.git)
    ```

2.  **Load the Extension in Your Browser**
    * Open Google Chrome (or any Chromium-based browser like Edge).
    * Navigate to the extensions page by typing `chrome://extensions` in your address bar.
    * Turn on **"Developer mode"** using the toggle switch in the top-right corner.
    * Click the **"Load unpacked"** button that appears.
    * Select the `SnagShot` folder that you just cloned.

3.  **Ready to Use!**
    The SnagShot camera icon will now appear in your browser's extension toolbar. Pin it for easy access!

---

## 💡 How to Use

1.  Click the SnagShot icon in your browser toolbar.
2.  A popup will appear with different capture options.
3.  Select your desired capture mode (Full Page, Visible Area, or Selected Area).
4.  Your screenshot will open in a new tab where you can make edits and download it.