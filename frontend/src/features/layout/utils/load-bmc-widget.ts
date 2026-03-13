export function loadBMCWidget() {
  if (document.getElementById("bmc-wjs")) return;

  const script = document.createElement("script");
  script.id = "bmc-wjs";
  script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
  script.setAttribute("data-name", "BMC-Widget");
  script.setAttribute("data-cfasync", "false");
  script.setAttribute("data-id", "req___");
  script.setAttribute("data-description", "Support me on Buy me a coffee!");
  script.setAttribute("data-message", "Buy me a slice 🍕");
  script.setAttribute("data-color", "#FF5F5F");
  script.setAttribute("data-position", "Right");
  script.setAttribute("data-x_margin", "18");
  script.setAttribute("data-y_margin", "18");
  script.async = true;

  script.onload = function () {
    const evt = document.createEvent("Event");
    evt.initEvent("DOMContentLoaded", false, false);
    window.dispatchEvent(evt);
  };

  document.body.appendChild(script);
}
