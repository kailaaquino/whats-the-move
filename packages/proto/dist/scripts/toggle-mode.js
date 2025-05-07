/* relayEvent: stops the default change and customizes the event */
function relayEvent(event, name, detail = {}){
  event.stopPropagation();

  const customEvent = new CustomEvent(name, {
    bubbles: true,
    detail: detail,
  });
  event.target.dispatchEvent(customEvent);
}


/* Listens for the label */
const toggleLabel = document.getElementById("theme-toggle-label");

toggleLabel.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  relayEvent(event, "theme:toggle", {checked: isChecked});
});

/* After event is relayed, add functionality to change to lightmode */
document.body.addEventListener("theme:toggle", (event) => {
  const isChecked = event.detail.checked;
  document.body.classList.toggle("light-mode", isChecked);
})

