// Asynchronous Clipboard API...
export class Copy {
  // Copy text...
  Text(element, text) {
    p.addEventListener("dblclick", async event => {
        try {
            await navigator.clipboard.writeText(url);
            // Feel free to comment this out....
            element.innerText = `Text copied...now <b>paste to share</b>.`;
          } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
          }
    })
}
}
