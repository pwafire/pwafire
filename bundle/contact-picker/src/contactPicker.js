const getContactsButton = document.getElementById("contact-picker");
const props = ["name", "email", "tel"];
const opts = { multiple: true };

getContactsButton.addEventListener("click", async () => {
  try {
    const contacts = await navigator.contacts.select(props, opts);
    console.log(contacts);
  } catch (error) {
    // Handle any errors here.
    alert(error);
  }
});
