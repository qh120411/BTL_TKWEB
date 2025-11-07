const body = document.body;
const switchModeButton = document.getElementById("switchModeBtn");
const mode = document.querySelector(".mode-name");
const handleChangeMode = () => {
  if (switchModeButton.checked) {
    body.classList.add("dark-mode");
    mode.innerHTML("dark mode");
  } else {
    body.classList.remove("dark-mode");
    mode.innerHTML = "light mode";
  }
};
switchModeButton.addEventListener("change", handleChangeMode);
