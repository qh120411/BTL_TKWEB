//tạo biểu đồ
const ctx = document.getElementById("canvas").getContext("2d");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["0", "7h", "9h", "11h", "13h", "15h", "17h", "19h", "20h"],
    datasets: [
      {
        label: "lượng xe vào",
        backgroundColor: "rgba(151,249,190,0.5)",
        borderColor: "rgba(42, 162, 184, 1)",
        pointBackgroundColor: "rgba(42, 162, 184, 1)",
        tension: 0.35,
        data: [0, 400, 600, 2500, 2000, 1600, 1000, 800, 500],

        pointRadius: 2,
      },
      {
        label: "Lượng xe ra",
        backgroundColor: "rgba(252,147,65,0.5)",
        borderColor: "rgba(172, 45, 45, 1)",
        pointBackgroundColor: "rgba(172, 45, 45, 1)",
        tension: 0.35,
        data: [0, 100, 200, 100, 150, 200, 1000, 200, 300],
        pointRadius: 2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#000000ff",
          font: { size: 20 },
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#000000ff", font: { size: 17 } },
      },
      x: {
        ticks: { color: "#000000ff", font: { size: 17 } },
      },
    },
  },
});
// ngày mặc định
let currentDate = new Date("2025-10-15");

// ==================== KHỞI TẠO ====================
document.addEventListener("DOMContentLoaded", function () {
  initDatePicker();
  initAddButton();
});

// ==================== XỬ LÝ NGÀY THÁNG ====================
function initDatePicker() {
  const dateInput = document.querySelector('input[type="date"]');
  const prevBtn = document.querySelector(".date-control button:first-child");
  const nextBtn = document.querySelector(".date-control button:last-child");

  if (!dateInput || !prevBtn || !nextBtn) {
    console.error("Không tìm thấy date picker elements");
    return;
  }

  // Nút lùi ngày
  prevBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 1);
    dateInput.value = formatDate(currentDate);
    console.log("Lùi ngày:", dateInput.value);
  });

  // Nút tiến ngày
  nextBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 1);
    dateInput.value = formatDate(currentDate);
    console.log("Tiến ngày:", dateInput.value);
  });

  // Khi người dùng chọn ngày
  dateInput.addEventListener("change", (e) => {
    currentDate = new Date(e.target.value);
    console.log("Chọn ngày:", e.target.value);
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
