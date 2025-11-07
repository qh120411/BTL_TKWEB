let myChart = null;

async function fetchChartData() {
  const res = await fetch("../chartdata.json");
  return await res.json();
}

function getCSSVar(name) {
  // lấy theo body để nhận dark-mode variables
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function getChartColors(ctx) {
  const gradientIN = ctx.createLinearGradient(0, 0, 0, 400);
  gradientIN.addColorStop(0, getCSSVar("--chart-in-bg-top"));
  gradientIN.addColorStop(1, getCSSVar("--chart-in-bg-bottom"));

  const gradientOUT = ctx.createLinearGradient(0, 0, 0, 400);
  gradientOUT.addColorStop(0, getCSSVar("--chart-out-bg-top"));
  gradientOUT.addColorStop(1, getCSSVar("--chart-out-bg-bottom"));

  return {
    inColor: getCSSVar("--chart-in-color"),
    outColor: getCSSVar("--chart-out-color"),
    textColor: getCSSVar("--chart-text-color"),
    gridColor: getCSSVar("--chart-grid-color"),
    tooltipBg: getCSSVar("--tooltip-bg"),
    tooltipText: getCSSVar("--tooltip-text"),
    gradientIN,
    gradientOUT,
  };
}

async function createChartIfCanvasExists() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const colors = getChartColors(ctx);
  const data = await fetchChartData();

  // Nếu chart đã tồn tại => update màu, không tạo mới
  if (myChart) {
    myChart.data.datasets[0].borderColor = colors.inColor;
    myChart.data.datasets[0].backgroundColor = colors.gradientIN;
    myChart.data.datasets[1].borderColor = colors.outColor;
    myChart.data.datasets[1].backgroundColor = colors.gradientOUT;

    myChart.options.plugins.legend.labels.color = colors.textColor;
    myChart.options.scales.x.ticks.color = colors.textColor;
    myChart.options.scales.y.ticks.color = colors.textColor;
    myChart.options.scales.y.grid.color = colors.gridColor;
    myChart.options.plugins.tooltip.backgroundColor = colors.tooltipBg;
    myChart.options.plugins.tooltip.bodyColor = colors.tooltipText;
    myChart.options.plugins.tooltip.titleColor = colors.tooltipText;
    myChart.update();
    return;
  }

  // Nếu chưa có chart, tạo mới
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.timelist,
      datasets: [
        {
          label: "Lượng xe vào",
          data: data.xevao,
          borderColor: colors.inColor,
          backgroundColor: colors.gradientIN,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: colors.inColor,
          borderWidth: 2,
          fill: true,
        },
        {
          label: "Lượng xe ra",
          data: data.xera,
          borderColor: colors.outColor,
          backgroundColor: colors.gradientOUT,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: colors.outColor,
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 1200, easing: "easeOutQuart" },
      interaction: { mode: "nearest", axis: "x", intersect: false },
      plugins: {
        legend: {
          position: "bottom",
          align: "center",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            color: colors.textColor,
            font: { size: 16, family: "Arial, sans-serif" },
            padding: 40,
          },
        },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.gridColor,
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          usePointStyle: true,
          callbacks: {
            label: (c) => ` ${c.dataset.label}: ${c.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        y: {
          ticks: { color: colors.textColor, font: { size: 14 } },
          grid: { color: colors.gridColor },
        },
        x: {
          ticks: { color: colors.textColor, font: { size: 14 } },
          grid: { display: false },
        },
      },
    },
  });
}
document.addEventListener("DOMContentLoaded", () => {
  createChartIfCanvasExists();
});

//link ấn trên chart 1
document.getElementById("xemChiTiet").onclick = function () {
  setTimeout(() => {
    window.location.href = "../html/garage.html";
  }, 500);
};

// ===== Danh sách xe ra/vào hôm nay (lấy 4 người đầu từ data.json) =====
(function loadTop4FromJSON() {
  // chỉnh đường dẫn phù hợp dự án của bạn: "../data.json" hoặc "./data.json"
  const CANDIDATE_PATHS = ["../data.json", "./data.json", "/data.json"];

  const tryFetch = (paths) => {
    if (!paths.length) {
      console.error("Không tìm thấy file data.json ở các đường dẫn đã thử.");
      document.getElementById(
        "parking-body"
      ).innerHTML = `<tr><td colspan="6" style="text-align:center;color:red">Không thể tải dữ liệu.</td></tr>`;
      return;
    }
    const p = paths[0];
    fetch(p)
      .then((r) => {
        if (!r.ok) throw new Error(p + " not ok");
        return r.json();
      })
      .then((data) => {
        const top4 = (Array.isArray(data) ? data : []).slice(0, 4);
        const tbody = document.getElementById("parking-body");
        if (!tbody) return;

        tbody.innerHTML = top4
          .map(
            (item) => `
          <tr>
            <td>${item.chuXe ?? ""}</td>
            <td>${item.maSinhVien ?? ""}</td>
            <td>${item.bsx && item.bsx.trim() !== "" ? item.bsx : "—"}</td>
            <td>${item.loaiXe ?? ""}</td>
            <td>
              <span class="time in">${item.gioVao ?? ""}</span>
              <span class="time out">${item.gioRa ?? ""}</span>
            </td>
            <td>${item.nhaXe ?? ""}</td>
          </tr>
        `
          )
          .join("");
      })
      .catch(() => tryFetch(paths.slice(1))); // thử path khác nếu fail
  };

  tryFetch(CANDIDATE_PATHS);
})();

//link ấn ds
document.getElementById("xemds").onclick = function () {
  setTimeout(() => {
    window.location.href = "../html/garage.html";
  }, 500);
};

//js

// Vẽ biểu đồ tròn với Chart.js
(async function renderPieChart() {
  const canvas = document.getElementById("piechart");
  if (!canvas) return; // không có canvas thì bỏ qua
  const piectx = canvas.getContext("2d");

  try {
    const response = await fetch("../garagedata.json");
    const data = await response.json();
    let xeDap = 0,
      xeMay = 0,
      xeDien = 0;
    let tongDoanhThu = 0;

    // (tuỳ trang) nếu không có bảng thì bỏ qua phần đổ bảng
    const garageTbody = document.querySelector("#garageTable tbody");

    data.forEach((item, index) => {
      const loaixe = (item.Loaixe || item["Loại xe"] || "").toLowerCase();
      let doanhThu = 0;

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

      if (garageTbody) {
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
        garageTbody.appendChild(row);
      }
    });

    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const x = (chartArea.left + chartArea.right) / 2;
        const y = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.font = "bold 16px 'Segoe UI'";
        ctx.fillStyle = "#a13333ff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Tổng: ${tongDoanhThu.toLocaleString("vi-VN")} đ`, x, y);
        ctx.restore();
      },
    };

    new Chart(piectx, {
      type: "doughnut",
      data: {
        // labels: ["Xe đạp", "Xe máy", "Xe điện"],xấu quá nên đã thay bằng html
        datasets: [
          {
            data: [xeDap, xeMay, xeDien],
            backgroundColor: ["#c57a25ff", "#3272c0ff", "#20cea5ff"],
            hoverBackgroundColor: ["#ff8800ff", "#00aeffff", "#00ffc8ff"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { display: true, position: "bottom" } },
        cutout: "70%",
      },
      plugins: [centerTextPlugin],
    });
  } catch (error) {
    console.error("Lỗi khi tải JSON hoặc vẽ biểu đồ:", error);
  }
})();

//link ấn doanhthu
document.getElementById("xemdthu").onclick = function () {
  setTimeout(() => {
    window.location.href = "../html/revenue_statistics.html";
  }, 500);
};
