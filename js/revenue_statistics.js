document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById("pieChart")?.getContext("2d");
  const tbody = document.querySelector("#garageTable tbody");

  try {
    const response = await fetch("../garagedata.json");
    const data = await response.json();

    let xeDap = 0,
      xeMay = 0,
      xeDien = 0;
    let tongDoanhThu = 0;

    // Đổ bảng + tính toán
    data.forEach((item, index) => {
      const loaixe = (item.Loaixe || item["Loại xe"] || "").toLowerCase();
      let doanhThu = 0;

      // ⚡ Kiểm tra "điện" trước "đạp"
      if (loaixe.includes("điện")) {
        doanhThu = 3000;
        xeDien++;
      } else if (loaixe.includes("máy")) {
        doanhThu = 3000;
        xeMay++;
      } else if (loaixe.includes("đạp")) {
        doanhThu = 2000;
        xeDap++;
      }

      tongDoanhThu += doanhThu;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.Chuxe || item["Chủ xe"] || "Không rõ"}</td>
        <td>${item.MSV || item["Mã sinh viên"] || "Không rõ"}</td>
        <td>${item.Bienso || item["BSX"] || "Không rõ"}</td>
        <td>${item.Loaixe || item["Loại xe"] || "Không rõ"}</td>
        <td>${item.Trangthai || item["Trạng thái"] || "Vé ngày"}</td>
        <td>+${doanhThu.toLocaleString("vi-VN")}đ</td>
      `;
      tbody.appendChild(row);
    });

    // Tính tổng các loại xe
    const tongXe = xeDap + xeMay + xeDien;

    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [xeDap, xeMay, xeDien], // ⚡ Dùng số lượng, không dùng %
              backgroundColor: ["#c57a25ff", "#3272c0ff", "#20cea5ff"],
              hoverBackgroundColor: ["#ff8800ff", "#00aeffff", "#00ffc8ff"],
              borderWidth: 0,
              hoverOffset: 20,
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: true, position: "bottom" },
          },
          cutout: "75%",
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
              ctx.fillStyle = "#a13333ff";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(
                `Tổng: ${tongDoanhThu.toLocaleString("vi-VN")} đ`,
                x,
                y
              );
              ctx.restore();
            },
          },
        ],
      });
    }
  } catch (error) {
    console.error("Lỗi khi tải JSON hoặc vẽ biểu đồ:", error);
  }

  // Nút điều khiển ngày tháng
  let currentDate = new Date("2025-10-15");

  function initDatePicker() {
    const dateInput = document.querySelector(
      '.date-control input[type="date"]'
    );
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
