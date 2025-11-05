// ==================== DỮ LIỆU ====================
let employees = [
  { id: 1, name: "Lê Minh Đức", avatar: "LMĐ" },
  { id: 2, name: "Trần Quang Huy", avatar: "TQH" },
  { id: 3, name: "Nguyễn Hoàng Anh", avatar: "NHA" },
  { id: 4, name: "Đỗ Văn Đạt", avatar: "ĐVĐ" },
  { id: 5, name: "Nguyễn Văn Hùng", avatar: "NVH" },
];

let currentDate = new Date("2025-10-15");
let draggedEmployee = null;

// ==================== KHỞI TẠO ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Trang đã load xong");
  initDatePicker();
  initSearch();
  initAddButton();
  renderEmployeeList();
  addDragDropHandlers();
});

// ==================== XỬ LÝ NGÀY THÁNG ====================
function initDatePicker() {
  const dateInput = document.querySelector('input[type="date"]');
  const prevBtn = document.querySelector(".date-control button:first-child");
  const nextBtn = document.querySelector(".date-control button:last-child");
  // Nút lùi ngày
  prevBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 1);
    dateInput.value = formatDate(currentDate);
  });

  // Nút tiến ngày
  nextBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 1);
    dateInput.value = formatDate(currentDate);
  });

  // Khi người dùng chọn ngày
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

// ==================== TÌM KIẾM NHÂN VIÊN ====================
function initSearch() {
  const searchInput = document.querySelector('.search-add input[type="text"]');

  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    filterEmployees(keyword);
  });
}

function filterEmployees(keyword) {
  const employeeItems = document.querySelectorAll(".employee-item");

  employeeItems.forEach((item) => {
    const name = item.dataset.name.toLowerCase();
    if (name.includes(keyword)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// ==================== THÊM NHÂN VIÊN MỚI ====================
function initAddButton() {
  const addBtn = document.querySelector(".search-add button");
  addBtn.addEventListener("click", showAddEmployeeModal);
}

function showAddEmployeeModal() {
  const name = prompt("Nhập tên nhân viên mới:");

  if (name && name.trim()) {
    // Tạo avatar từ chữ cái đầu
    const words = name.trim().split(" ");
    const avatar = words
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

    const newEmployee = {
      id: employees.length + 1,
      name: name.trim(),
      avatar: avatar,
    };

    employees.push(newEmployee);
    renderEmployeeList();
  }
}

// ==================== HIỂN THỊ DANH SÁCH NHÂN VIÊN ====================
function renderEmployeeList() {
  let employeePanel = document.querySelector(".employee-panel");

  // Tạo panel
  if (!employeePanel) {
    employeePanel = document.createElement("div");
    employeePanel.className = "employee-panel";
    employeePanel.innerHTML = `
      <h3>📋 Danh sách nhân viên</h3>
      <div class="employee-list"></div>
    `;

    const board = document.querySelector(".board");
    if (board) {
      board.parentElement.insertBefore(employeePanel, board);
    }
  }

  const employeeList = employeePanel.querySelector(".employee-list");

  // Render từng nhân viên
  employeeList.innerHTML = employees
    .map(
      (emp) => `
    <div class="employee-item" 
         draggable="true" 
         data-id="${emp.id}" 
         data-name="${emp.name}">
      <div class="employee-avatar">${emp.avatar}</div>
      <div class="employee-name">${emp.name}</div>
      <button class="delete-employee-btn" onclick="deleteEmployee(${emp.id})" title="Xóa nhân viên">×</button>
    </div>
  `
    )
    .join("");

  // Thêm sự kiện drag
  addEmployeeDragHandlers();
}

// ==================== DRAG & DROP NHÂN VIÊN ====================
function addEmployeeDragHandlers() {
  const employeeItems = document.querySelectorAll(".employee-item");

  employeeItems.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
  });
}

function handleDragStart(e) {
  const empId = parseInt(e.currentTarget.dataset.id);
  const empName = e.currentTarget.dataset.name;
  const empAvatar =
    e.currentTarget.querySelector(".employee-avatar").textContent;

  draggedEmployee = {
    id: empId,
    name: empName,
    avatar: empAvatar,
  };
}

function handleDragEnd(e) {
  e.currentTarget.style.opacity = "1";
}

// ==================== DRAG & DROP VÀO CA LÀM VIỆC ====================
function addDragDropHandlers() {
  const shiftCards = document.querySelectorAll(".shift-card");

  shiftCards.forEach((card) => {
    card.addEventListener("dragover", handleDragOver);
    card.addEventListener("drop", handleDrop);
    card.addEventListener("dragleave", handleDragLeave);
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.style.background = "#d0e4f7";
  e.currentTarget.style.transform = "scale(1.02)";
}

function handleDragLeave(e) {
  e.currentTarget.style.background = "#e6eef8";
  e.currentTarget.style.transform = "scale(1)";
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.style.background = "#e6eef8";
  e.currentTarget.style.transform = "scale(1)";

  if (!draggedEmployee) {
    console.error("Không có nhân viên được kéo");
    return;
  }

  const shiftCard = e.currentTarget;
  const placeholderLines = shiftCard.querySelector(".placeholder-lines");

  // Kiểm tra nhân viên đã có trong ca chưa
  const existingEmployee = placeholderLines.querySelector(
    `[data-emp-id="${draggedEmployee.id}"]`
  );
  if (existingEmployee) {
    alert("Nhân viên " + draggedEmployee.name + " đã có trong ca này!");
    return;
  }

  // Tìm line trống đầu tiên
  const emptyLine = Array.from(placeholderLines.querySelectorAll(".line")).find(
    (line) => {
      return !line.querySelector(".assigned-employee");
    }
  );

  if (!emptyLine) {
    alert("Ca này đã đầy! Không thể thêm nhân viên.");
    return;
  }

  // Tạo card nhân viên trong line
  const employeeCard = document.createElement("div");
  employeeCard.className = "assigned-employee";
  employeeCard.dataset.empId = draggedEmployee.id;
  employeeCard.innerHTML = `
    <div class="emp-avatar">${draggedEmployee.avatar}</div>
    <div class="emp-name">${draggedEmployee.name}</div>
    <button class="remove-emp" onclick="removeEmployee(this)" title="Xóa khỏi ca">×</button>
  `;

  emptyLine.appendChild(employeeCard);

  // Ẩn drop hint nếu tất cả line đã có nhân viên
  const dropHint = shiftCard.querySelector(".drop-hint");
  const filledLines = placeholderLines.querySelectorAll(
    ".line .assigned-employee"
  ).length;
  const totalLines = placeholderLines.querySelectorAll(".line").length;

  if (filledLines >= totalLines) {
    dropHint.style.display = "none";
  }

  console.log("Đã thêm", draggedEmployee.name, "vào ca làm việc");
}

// ==================== XÓA NHÂN VIÊN KHỎI CA ====================
function removeEmployee(btn) {
  const employeeCard = btn.parentElement;
  const empName = employeeCard.querySelector(".emp-name").textContent;
  const shiftCard = employeeCard.closest(".shift-card");
  const placeholderLines = shiftCard.querySelector(".placeholder-lines");
  const dropHint = shiftCard.querySelector(".drop-hint");

  // Xác nhận xóa
  if (confirm(`Xóa ${empName} khỏi ca làm việc này?`)) {
    employeeCard.remove();

    // Hiện lại drop hint nếu có line trống
    const filledLines = placeholderLines.querySelectorAll(
      ".line .assigned-employee"
    ).length;
    if (filledLines === 0) {
      dropHint.style.display = "block";
    }
  }
}
//
function deleteEmployee(empId) {
  const employee = employees.find((emp) => emp.id === empId);

  if (!employee) {
    alert("ko thấy nhân viên");
    return;
  }

  if (confirm(`bạn xác nhận xóa nhân viên"${employee.name}"`));
  employees = employees.filter((emp) => emp.id !== empId);

  const assignedCards = document.querySelectorAll(`[data-emp-id="${empId}"]`);
  assignedCards.forEach((card) => {
    const shiftCard = card.closest(".shift-card");
    const dropHint = shiftCard.querySelector(".drop-hint");
    card.remove();

    const placeholderLines = shiftCard.querySelector(".placeholder-lines");
    const filledLines = placeholderLines.querySelectorAll(
      ".line .assigned-employee"
    ).length;
    if (filledLines === 0) {
      dropHint.style.display = "block";
    }
  });

  renderEmployeeList();

  console.log(`đã xóa nhân viên: ${employee.name}`);
}
