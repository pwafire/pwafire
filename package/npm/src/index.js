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
  // Web Share...
  Share(element, data) {
    element.addEventListener(`click`, () => {
      // Check if web share is supported
      if (navigator.share) {
        navigator.share(data)
          .then(() => console.log(`Successful share`))
          .catch((error) => console.log(`Error sharing`, error));
      } else {
        console.log(`Web share not supported on desktop...`);
      }
    })
  }
  // Contacts Picker...
  Contacts(element, props, options) {
    element.addEventListener("click", async () => {
      try {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return contacts;
      } catch (error) {
        // Handle any errors here...
        alert(error);
      }
    });
  }
  // Connectivity...
  Connectivity(online, offline) {
    // Once the DOM is loaded, check for connectivity...
    document.addEventListener('DOMContentLoaded', event => {
      if (!navigator.onLine) {
        goOffline();
      }
      // Offline Event...
      function goOffline() {
         offline()
         return `You are offline...`;
      }
      // Online Event...
      window.addEventListener("online", () => {
         online();
         return `You are back online...`;
      });

    });
  }

  // Payment...
  Payment(element) {
    // Initiate Payment UI on click...
    element.addEventListener("click", event => {
      event.preventDefault();
      const paymentRequest = new PaymentRequest(
        paymentMethods,
        paymentDetails,
        options
      );
      // Initiate user interface...
      paymentRequest
        .show()
        .then(paymentResponse => {
          // Validate with backend...
          return paymentResponse
        })
        .catch(err => {
          // API error or user cancelled the payment
          console.log("Error:", err);
        });
    });
  }

}
// Create an instance of a PWA
exports.pwa = new PWA();
