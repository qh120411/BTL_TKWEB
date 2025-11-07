// biểu đồ js
const linectx = document.getElementById("linechart").getContext("2d");

const gradientIN = linectx.createLinearGradient(0, 0, 0, 400);
gradientIN.addColorStop(0, "rgba(219, 163, 98, 0.1)");
gradientIN.addColorStop(1, "rgba(219, 163, 98, 0.02)");

const gradientOUT = linectx.createLinearGradient(0, 0, 0, 400);
gradientOUT.addColorStop(0, "rgba( 182, 211, 250, 0.1)");
gradientOUT.addColorStop(1, "rgba( 182, 211, 250, 0.02)");

const myChart = new Chart(linectx, {
  type: "line",
  data: {
    labels: ["0h", "7h", "9h", "11h", "13h", "15h", "17h", "19h", "21h", "22h"],
    datasets: [
      {
        label: "Luợng xe vào",
        data: [0, 200, 800, 1000, 1500, 2000, 1500, 600, 200, 0],
        borderColor: "rgba( 219, 163, 98, 1)",
        backgroundColor: gradientIN,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(219, 163, 98, 1)",
        borderWidth: 2,
        fill: true,
      },

      {
        label: "Luợng xe ra",
        data: [0, 0, 200, 600, 700, 0, 200, 1000, 200, 0],
        borderColor: "rgba( 182, 211, 250, 1)",
        backgroundColor: gradientOUT,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba( 182, 211, 250, 1)",
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#111",
          font: {
            size: 16,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(227, 237, 249, 0.95)",
        titleColor: "#000000ff",
        bodyColor: "#000000ff",
        borderColor: "#ccc",
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
        ticks: {
          color: "#111",
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },

      x: {
        ticks: {
          color: "#111",
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  },
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
        ctx.fillStyle = "#06053C";
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
            backgroundColor: ["#DBA362", "#CEDEF2", "#9FD3C7"],
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
