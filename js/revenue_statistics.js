document.addEventListener("DOMContentLoaded", function () {
  // Vẽ biểu đồ tròn với Chart.js
  const ctx = document.getElementById("pieChart")?.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Xe đạp", "Xe máy"],
        datasets: [
          {
            data: [10, 90],
            backgroundColor: ["#DBA362", "#CEDEF2"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        cutout: "70%", // tạo lỗ tròn ở giữa
      },
      plugins: [
        {
          id: "centerText",
          afterDraw(chart) {
            const { ctx, chartArea } = chart;
            const x = chartArea.left + (chartArea.right - chartArea.left) / 2;
            const y = chartArea.top + (chartArea.bottom - chartArea.top) / 2;

            ctx.save();
            ctx.font = "bold 16px 'Segoe UI'";
            ctx.fillStyle = "#06053cff"; // màu cam giống tiêu đề
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Tổng:15M VND", x, y);// Vẽ chữ ở giữa
            ctx.restore();
          },
        },
      ],
    });
  }

  // Hiệu ứng active cho sidebar
  const sidebarButtons = document.querySelectorAll(".sidebar button");
  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sidebarButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Nút điều khiển ngày tháng
  let currentDate = new Date("2025-10-15");

  function initDatePicker() {
    const dateInput = document.querySelector('.date-control input[type="date"]');
    const prevBtn = document.querySelector(".date-control button:first-child");
    const nextBtn = document.querySelector(".date-control button:last-child");

    prevBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() - 1);
      dateInput.value = formatDate(currentDate);
    });

    nextBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() + 1);
      dateInput.value = formatDate(currentDate);
    });

    dateInput.addEventListener("change", (e) => {
      currentDate = new Date(e.target.value);
    });
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  initDatePicker();
});
