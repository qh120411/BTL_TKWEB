
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
document.getElementById('xemChiTiet').onclick = function () {
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
      document.getElementById("parking-body").innerHTML =
        `<tr><td colspan="6" style="text-align:center;color:red">Không thể tải dữ liệu.</td></tr>`;
      return;
    }
    const p = paths[0];
    fetch(p)
      .then(r => { if (!r.ok) throw new Error(p + " not ok"); return r.json(); })
      .then(data => {
        const top4 = (Array.isArray(data) ? data : []).slice(0, 4);
        const tbody = document.getElementById("parking-body");
        if (!tbody) return;

        tbody.innerHTML = top4.map(item => `
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
        `).join("");
      })
      .catch(() => tryFetch(paths.slice(1))); // thử path khác nếu fail
  };

  tryFetch(CANDIDATE_PATHS);
})();

//link ấn ds
document.getElementById('xemds').onclick = function () {
  setTimeout(() => {
    window.location.href = "../html/garage.html";
  }, 500);
};


//js 

// Vẽ biểu đồ tròn với Chart.js
const piectx = document.getElementById("piechart").getContext("2d");
new Chart(piectx, {
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

        piectx.save();
        piectx.font = "bold 16px 'Segoe UI'";
        piectx.fillStyle = "#06053C"; // màu chữ
        piectx.textAlign = "center";
        piectx.textBaseline = "middle";
        piectx.fillText("Tổng: 15M VND", x, y); // Vẽ chữ ở giữa
        piectx.restore();
      },
    },
  ],
});

//link ấn doanhthu
document.getElementById('xemdthu').onclick = function () {
  setTimeout(() => {
    window.location.href = "../html/revenue_statistics.html";
  }, 500);
};