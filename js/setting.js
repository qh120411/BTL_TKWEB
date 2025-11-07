const switchModeButton = document.getElementById("switchModeBtn");

// Khi trang load, gán trạng thái nút đúng với localStorage
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    switchModeButton.checked = true;
    document.body.classList.add("dark-mode");
  } else {
    switchModeButton.checked = false;
    document.body.classList.remove("dark-mode");
  }
});

// Khi người dùng bật/tắt công tắc
switchModeButton.addEventListener("change", () => {
  if (switchModeButton.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
