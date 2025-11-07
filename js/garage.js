// //tạo biểu đồ
// const ctx = document.getElementById("canvas").getContext("2d");

// const gradientIN = ctx.createLinearGradient(0, 0, 0, 400);
// gradientIN.addColorStop(0, "rgba(219, 163, 98, 0.1)");
// gradientIN.addColorStop(1, "rgba(219, 163, 98, 0.02)");

// const gradientOUT = ctx.createLinearGradient(0, 0, 0, 400);
// gradientOUT.addColorStop(0, "rgba( 182, 211, 250, 0.1)");
// gradientOUT.addColorStop(1, "rgba( 182, 211, 250, 0.02)");
// async function fetchChartData() {
//   const response = await fetch("../chartdata.json");
//   return await response.json();
// }

// async function main() {
//   const data = await fetchChartData();

//   const myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: data.timelist,
//       datasets: [
//         {
//           label: "Lượng xe vào",
//           data: data.xevao,
//           borderColor: "rgba( 219, 163, 98, 1)",
//           backgroundColor: gradientIN,
//           tension: 0.4,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//           pointHoverBackgroundColor: "rgba(219, 163, 98, 1)",
//           borderWidth: 2,
//           fill: true,
//         },

//         {
//           label: "Lượng xe ra",
//           data: data.xera,
//           borderColor: "rgba( 182, 211, 250, 1)",
//           backgroundColor: gradientOUT,
//           fill: true,
//           tension: 0.4,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//           pointHoverBackgroundColor: "rgba( 182, 211, 250, 1)",
//           borderWidth: 2,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       animation: {
//         duration: 1200,
//         easing: "easeOutQuart",
//       },
//       interaction: {
//         mode: "nearest",
//         axis: "x",
//         intersect: false,
//       },
//       plugins: {
//         legend: {
//           position: "bottom",
//           align: "center",
//           labels: {
//             usePointStyle: true,
//             pointStyle: "circle",
//             color: "#111",
//             font: {
//               size: 16,
//               family: "Arial, sans-serif",
//             },
//             padding: 40,
//           },
//         },
//         tooltip: {
//           backgroundColor: "rgba(227, 237, 249, 0.95)",
//           titleColor: "#000000ff",
//           bodyColor: "#000000ff",
//           borderColor: "#ccc",
//           borderWidth: 1,
//           padding: 10,
//           displayColors: true,
//           usePointStyle: true,
//           callbacks: {
//             label: (c) => ` ${c.dataset.label}: ${c.parsed.y.toLocaleString()}`,
//           },
//         },
//       },
//       scales: {
//         y: {
//           ticks: {
//             color: "#111",
//             font: {
//               size: 14,
//               family: "Arial, sans-serif",
//             },
//           },
//           grid: {
//             color: "rgba(0,0,0,0.05)",
//           },
//         },

//         x: {
//           ticks: {
//             color: "#111",
//             font: {
//               size: 14,
//               family: "Arial, sans-serif",
//             },
//           },
//           grid: {
//             display: false,
//           },
//         },
//       },
//     },
//   });
// }
// main();
// // ngày mặc định
// let currentDate = new Date("2025-10-15");

// // ==================== KHỞI TẠO ====================
// document.addEventListener("DOMContentLoaded", function () {
//   initDatePicker();
//   initAddButton();
// });

// // ==================== XỬ LÝ NGÀY THÁNG ====================
// function initDatePicker() {
//   const dateInput = document.querySelector('input[type="date"]');
//   const prevBtn = document.querySelector(".date-control button:first-child");
//   const nextBtn = document.querySelector(".date-control button:last-child");

//   if (!dateInput || !prevBtn || !nextBtn) {
//     console.error("Không tìm thấy date picker elements");
//     return;
//   }

//   // Nút lùi ngày
//   prevBtn.addEventListener("click", () => {
//     currentDate.setDate(currentDate.getDate() - 1);
//     dateInput.value = formatDate(currentDate);
//     console.log("Lùi ngày:", dateInput.value);
//   });

//   // Nút tiến ngày
//   nextBtn.addEventListener("click", () => {
//     currentDate.setDate(currentDate.getDate() + 1);
//     dateInput.value = formatDate(currentDate);
//     console.log("Tiến ngày:", dateInput.value);
//   });

//   // Khi người dùng chọn ngày
//   dateInput.addEventListener("change", (e) => {
//     currentDate = new Date(e.target.value);
//     console.log("Chọn ngày:", e.target.value);
//   });
// }

// function formatDate(date) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }
// const currentPage = 1;
// // data
// async function loadGarageData() {
//   try {
//     const itemsPerPage = 20;
//     const response = await fetch("../garagedata.json");
//     const data = await response.json();
//     const sotrang = parseFloat(data.length / 20);
//     const sotrangthat = Math.floor(sotrang);
//     const tbody = document.querySelector("#data-table tbody");
//     tbody.innerHTML = "";

//     data.forEach((item) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${item.STT}</td>
//         <td>${item.Chuxe}</td>
//         <td>${item.MSV}</td>
//         <td>${item.Bienso}</td>
//         <td>${item.Thoigianvao}</td>
//         <td>${item.Thoigianra}</td>
//         <td>${item.Loaixe}</td>
//       `;
//       tbody.appendChild(row);
//     });
//   } catch (error) {
//     console.error("Lỗi khi tải dữ liệu:", error);
//   }
// }

// // Gọi hàm khi trang load
// document.addEventListener("DOMContentLoaded", loadGarageData);

// function getDataTable() {
//   const rows = document.querySelectorAll("#data-table tbody tr");
//   const data = [];
//   for (let i = 0; i < rows.length; i++) {
//     const cells = rows[i].querySelectorAll("td");
//     const obj = {
//       STT: cells[0].innerText,
//       Chuxe: cells[1].innerText,
//       MSV: cells[2].innerText,
//       Bienso: cells[3].innerText,
//       Thoigianvao: cells[4].innerText,
//       Thoigianra: cells[5].innerText,
//       Loaixe: cells[6].innerText,
//     };
//     data.push(obj);
//   }

//   return data;
// }

// function SearchIntable() {
//   let find = document.getElementById("search").value.toLowerCase();
//   let data = getDataTable();
//   let table = document.getElementById("data-table");
//   let resultArea = document.getElementById("result");

//   // Nếu không nhập gì thì hiện lại bảng gốc
//   if (find.trim().length === 0) {
//     table.style.display = "table";
//     resultArea.style.display = "none";
//     return;
//   }

//   // Lọc dữ liệu
//   const result = data.filter((item) =>
//     Object.values(item).some((val) => val.toLowerCase().includes(find))
//   );

//   // Nếu có kết quả
//   if (result.length > 0) {
//     table.style.display = "none";
//     resultArea.style.display = "block";
//     resultArea.innerHTML = `
//   <table>
//     <thead>
//       <tr>
//         <th>STT</th>
//         <th>Chủ xe</th>
//         <th>MSV</th>
//         <th>Biển số xe</th>
//         <th>Thời gian vào</th>
//         <th>Thời gian ra</th>
//         <th>Loại xe</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${result
//         .map(
//           (r) => `
//         <tr>
//           <td>${r.STT}</td>
//           <td>${r.Chuxe}</td>
//           <td>${r.MSV}</td>
//           <td>${r.Bienso}</td>
//           <td>${r.Thoigianvao}</td>
//           <td>${r.Thoigianra}</td>
//           <td>${r.Loaixe}</td>
//         </tr>
//       `
//         )
//         .join("")}
//     </tbody>
//   </table>
// `;
//   } else {
//     // Không tìm thấy
//     resultArea.style.display = "block";
//     resultArea.innerText = "❌ Không tìm thấy kết quả phù hợp!";
//     table.style.display = "none";
//   }
// }

////////////////////////1
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
// garage.js (thay toàn bộ phần JS hiện tại bằng đoạn này)
////////////////////////2
// biến toàn cục
let currentDate = new Date("2025-10-15");
let currentPage = 1;
const itemsPerPage = 20;
let totalPages = 1;
let garageData = [];

// ---------- helper date ----------
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ---------- chart (khởi tạo sau khi DOM sẵn sàng) ----------

// ---------- load dữ liệu và phân trang ----------
async function loadGarageData() {
  try {
    const res = await fetch("../garagedata.json");
    garageData = await res.json();
    totalPages = Math.max(1, Math.ceil(garageData.length / itemsPerPage));
    currentPage = 1;
    renderPage(currentPage);
  } catch (err) {
    console.error("Lỗi khi tải dữ liệu:", err);
  }
}

function renderPage(page) {
  const tbody = document.querySelector("#data-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = garageData.slice(start, end);

  // Nếu bạn muốn STT là số liên tục theo file (1..N) thì dùng itemIndex
  pageData.forEach((item, idx) => {
    const absoluteIndex = start + idx + 1; // STT từ 1..N
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${absoluteIndex}</td>
      <td>${item.Chuxe ?? ""}</td>
      <td>${item.MSV ?? ""}</td>
      <td>${item.Bienso ?? ""}</td>
      <td>${item.Thoigianvao ?? ""}</td>
      <td>${item.Thoigianra ?? ""}</td>
      <td>${item.Loaixe ?? ""}</td>
    `;
    tbody.appendChild(row);
  });

  // cập nhật page info + trạng thái nút
  const pageInfoEl = document.getElementById("page-info");
  if (pageInfoEl) pageInfoEl.textContent = `Trang ${page} / ${totalPages}`;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (prevBtn) prevBtn.disabled = page <= 1;
  if (nextBtn) nextBtn.disabled = page >= totalPages;
}

// ---------- search (tìm trên toàn bộ garageData, không chỉ DOM) ----------
function SearchIntable() {
  const query = document.getElementById("search").value.trim().toLowerCase();
  const table = document.getElementById("data-table");
  const resultArea = document.getElementById("result");
  const paginationControls = document.querySelector(".pagination-controls"); //** */

  if (!query) {
    // hiển thị lại table với phân trang
    /*if (resultArea) resultArea.style.display = "none";
    if (table) table.style.display = "table";
    renderPage(currentPage);
    return;*/

    if (resultArea) {
      resultArea.style.display = "none";
      resultArea.innerHTML = "";
    }
    if (table) table.style.display = "table";
    if (paginationControls) paginationControls.style.display = "flex";
    renderPage(currentPage);
    return;
  }

  // tìm trong toàn bộ garageData
  const result = garageData.filter((item) => {
    /*[
      item.STT,
      item.Chuxe,
      item.MSV,
      item.Bienso,
      item.Thoigianvao,
      item.Thoigianra,
      item.Loaixe,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );*/
    const searchString = [
      item.Chuxe,
      item.MSV,
      item.Bienso,
      item.Thoigianvao,
      item.Thoigianra,
      item.Loaixe,
    ]
      .filter((val) => val) // loại bỏ giá trị null/undefined
      .join(" ")
      .toLowerCase();

    return searchString.includes(query);
  });

  if (table) table.style.display = "none";
  if (paginationControls) paginationControls.style.display = "none";

  if (resultArea) {
    if (result.length > 0) {
      /*table.style.display = "none";*/
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
                (r, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${r.Chuxe ?? ""}</td>
                <td>${r.MSV ?? ""}</td>
                <td>${r.Bienso ?? ""}</td>
                <td>${r.Thoigianvao ?? ""}</td>
                <td>${r.Thoigianra ?? ""}</td>
                <td>${r.Loaixe ?? ""}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      `;
    } else {
      resultArea.style.display = "block";
      //resultArea.innerText = "❌ Không tìm thấy kết quả phù hợp!";
      //table.style.display = "none";
      resultArea.innerHTML =
        '<p class="no-result">❌ Không tìm thấy kết quả phù hợp!</p>';
    }
  }
}

// ---------- DOMContentLoaded: gắn event + khởi tạo ----------
document.addEventListener("DOMContentLoaded", () => {
  // setup date picker
  const dateInput = document.querySelector('input[type="date"]');
  const prevDateBtn = document.querySelector(
    ".date-control button:first-child"
  );
  const nextDateBtn = document.querySelector(".date-control button:last-child");

  if (dateInput) dateInput.value = formatDate(currentDate);

  if (prevDateBtn) {
    prevDateBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() - 1);
      if (dateInput) dateInput.value = formatDate(currentDate);
    });
  }
  if (nextDateBtn) {
    nextDateBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() + 1);
      if (dateInput) dateInput.value = formatDate(currentDate);
    });
  }
  if (dateInput) {
    dateInput.addEventListener("change", (e) => {
      currentDate = new Date(e.target.value);
    });
  }

  // gắn sự kiện cho nút phân trang
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  }

  // gắn search input (nếu bạn muốn gọi tự động)
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", SearchIntable);
  }

  // khởi tạo chart và load dữ liệu bảng
  createChartIfCanvasExists();
  loadGarageData();
});
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
