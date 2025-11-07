const switchModeButton = document.getElementById("switchModeBtn");
const body = document.body;

// Khi load trang: đọc trạng thái dark mode từ localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  if (switchModeButton) switchModeButton.checked = true;
}

// Khi toggle nút
if (switchModeButton) {
  switchModeButton.addEventListener("change", () => {
    if (switchModeButton.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
}
