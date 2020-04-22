// All PWA Fire Bundle Features as ES6 Module
const copyStyles = `
    display: inline-block;
    padding: 2px 6px;
    font-size: 12px;
    color: #165c26;
    background-color: #dcffe4;
    border-radius: 3px;`;
// Declare the PWA Features class...
class PWA {
  // Copy text...
  copyText(element) {
    element.addEventListener("click", async event => {
      let html = element.innerHTML;
      let text = element.innerText;
      try {
        await navigator.clipboard.writeText(text);
        // Show success message...
        element.innerHTML = `<span style="${copyStyles}">
                Copied to clipboard!</span>`;
        // Show previous text...
        setTimeout(() => {
          element.innerHTML = html;
        }, 3000);
      } catch (err) {
        console.error("Failed to copy to clipboard", err);
      }
    });
  }
}
// Create an instance of a PWA
exports.pwa = new PWA();
