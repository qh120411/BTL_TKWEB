//tạo biểu đồ
const ctx = document.getElementById("canvas").getContext("2d");

const gradientIN = ctx.createLinearGradient(0, 0, 0, 400);
gradientIN.addColorStop(0, "rgba(219, 163, 98, 0.1)");
gradientIN.addColorStop(1, "rgba(219, 163, 98, 0.02)");

const gradientOUT = ctx.createLinearGradient(0, 0, 0, 400);
gradientOUT.addColorStop(0, "rgba( 182, 211, 250, 0.1)");
gradientOUT.addColorStop(1, "rgba( 182, 211, 250, 0.02)");
async function fetchChartData() {
  const response = await fetch("../chartdata.json");
  return await response.json();
}

async function main() {
  const data = await fetchChartData();

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.timelist,
      datasets: [
        {
          label: "Lượng xe vào",
          data: data.xevao,
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
          label: "Lượng xe ra",
          data: data.xera,
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
          align: "center",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            color: "#111",
            font: {
              size: 16,
              family: "Arial, sans-serif",
            },
            padding: 40,
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
}
main();
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
async function loadGarageData() {
  try {
    const response = await fetch("../garagedata.json");
    const data = await response.json();

    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = "";

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.STT}</td>
        <td>${item.Chuxe}</td>
        <td>${item.MSV}</td>
        <td>${item.Bienso}</td>
        <td>${item.Thoigianvao}</td>
        <td>${item.Thoigianra}</td>
        <td>${item.Loaixe}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

// Gọi hàm khi trang load
document.addEventListener("DOMContentLoaded", loadGarageData);

function getDataTable() {
  const rows = document.querySelectorAll("#data-table tbody tr");
  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    const obj = {
      STT: cells[0].innerText,
      Chuxe: cells[1].innerText,
      MSV: cells[2].innerText,
      Bienso: cells[3].innerText,
      Thoigianvao: cells[4].innerText,
      Thoigianra: cells[5].innerText,
      Loaixe: cells[6].innerText,
    };
    data.push(obj);
  }

  return data;
}

function SearchIntable() {
  let find = document.getElementById("search").value.toLowerCase();
  let data = getDataTable();
  let table = document.getElementById("data-table");
  let resultArea = document.getElementById("result");

  // Nếu không nhập gì thì hiện lại bảng gốc
  if (find.trim().length === 0) {
    table.style.display = "table";
    resultArea.style.display = "none";
    return;
  }

  // Lọc dữ liệu
  const result = data.filter((item) =>
    Object.values(item).some((val) => val.toLowerCase().includes(find))
  );

  // Nếu có kết quả
  if (result.length > 0) {
    table.style.display = "none";
    resultArea.style.display = "block";
    resultArea.innerHTML = `
  <table>
    <thead>
      <tr>
        <th>STT</th>
        <th>Chủ xe</th>
        <th>MSV</th>
        <th>Biển số xe</th>
        <th>Thời gian vào</th>
        <th>Thời gian ra</th>
        <th>Loại xe</th>
      </tr>
    </thead>
    <tbody>
      ${result
        .map(
          (r) => `
        <tr>
          <td>${r.STT}</td>
          <td>${r.Chuxe}</td>
          <td>${r.MSV}</td>
          <td>${r.Bienso}</td>
          <td>${r.Thoigianvao}</td>
          <td>${r.Thoigianra}</td>
          <td>${r.Loaixe}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
`;
  } else {
    // Không tìm thấy
    resultArea.style.display = "block";
    resultArea.innerText = "❌ Không tìm thấy kết quả phù hợp!";
    table.style.display = "none";
  }
}
// const body = document.body;
// const switchModeButton = document.getElementById("switchModeBtn");
// const mode = document.querySelector(".mode-name");
// const handleChangeMode = () => {
//   if (switchModeButton.checked) {
//     body.classList.add("dark-mode");
//     mode.innerHTML("dark mode");
//   } else {
//     body.classList.remove("dark-mode");
//     mode.innerHTML = "light mode";
//   }
// };
// switchModeButton.addEventListener("change", handleChangeMode);
