// Dữ liệu và biến toàn cục
let employees = [];
let shifts = {};
let currentDate = new Date("2025-10-15");
let draggedEmployee = null;

// Khởi tạo khi trang load
document.addEventListener("DOMContentLoaded", () => {
  loadDataFromStorage();
  initControls();
  renderEmployeeList();
  initDragDrop();
  restoreShiftAssignments();
});

// ==================== LƯU TRỮ DỮ LIỆU ====================
function saveDataToStorage() {
  try {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("shifts", JSON.stringify(shifts));
    localStorage.setItem("currentDate", currentDate.toISOString());
  } catch (e) {
    console.error("Lỗi khi lưu dữ liệu:", e);
  }
}

function loadDataFromStorage() {
  try {
    const savedEmployees = localStorage.getItem("employees");
    employees = savedEmployees
      ? JSON.parse(savedEmployees)
      : [
          { id: 1, name: "Lê Minh Đức", avatar: "LMĐ" },
          { id: 2, name: "Trần Quang Huy", avatar: "TQH" },
          { id: 3, name: "Nguyễn Hoàng Anh", avatar: "NHA" },
          { id: 4, name: "Đỗ Văn Đạt", avatar: "ĐVĐ" },
          { id: 5, name: "Nguyễn Văn Hùng", avatar: "NVH" },
        ];

    const savedShifts = localStorage.getItem("shifts");
    if (savedShifts) shifts = JSON.parse(savedShifts);

    const savedDate = localStorage.getItem("currentDate");
    if (savedDate) currentDate = new Date(savedDate);
  } catch (e) {
    console.error("Lỗi khi tải dữ liệu:", e);
  }
}

// ==================== KHỞI TẠO CONTROLS ====================
function initControls() {
  const dateInput = document.getElementById("dateInput");
  const prevBtn = document.getElementById("prevDay");
  const nextBtn = document.getElementById("nextDay");
  const searchInput = document.getElementById("searchInput");
  const addBtn = document.getElementById("addBtn");

  dateInput.value = formatDate(currentDate);

  // Xử lý ngày tháng
  prevBtn.onclick = () => changeDate(-1);
  nextBtn.onclick = () => changeDate(1);
  dateInput.onchange = (e) => {
    currentDate = new Date(e.target.value);
    saveDataToStorage();
    clearAndRestoreShifts();
  };

  // Tìm kiếm
  searchInput.oninput = (e) => {
    const keyword = e.target.value.toLowerCase();
    document.querySelectorAll(".employee-item").forEach((item) => {
      item.style.display = item.dataset.name.toLowerCase().includes(keyword)
        ? "flex"
        : "none";
    });
  };

  // Thêm nhân viên
  addBtn.onclick = () => {
    const name = prompt("Nhập tên nhân viên mới:");
    if (name && name.trim()) {
      const words = name.trim().split(" ");
      const avatar = words
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 3);
      employees.push({ id: Date.now(), name: name.trim(), avatar });
      saveDataToStorage();
      renderEmployeeList();
    }
  };
}

function changeDate(days) {
  currentDate.setDate(currentDate.getDate() + days);
  document.getElementById("dateInput").value = formatDate(currentDate);
  saveDataToStorage();
  clearAndRestoreShifts();
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

// ==================== HIỂN THỊ NHÂN VIÊN ====================
function renderEmployeeList() {
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = employees
    .map(
      (emp) => `
    <div class="employee-item" draggable="true" data-id="${emp.id}" data-name="${emp.name}">
      <div class="employee-avatar">${emp.avatar}</div>
      <div class="employee-name">${emp.name}</div>
      <button class="delete-employee-btn" onclick="deleteEmployee(${emp.id})" title="Xóa nhân viên">×</button>
    </div>
  `
    )
    .join("");

  // Thêm drag handlers
  document.querySelectorAll(".employee-item").forEach((item) => {
    item.ondragstart = (e) => {
      const emp = employees.find((emp) => emp.id == e.currentTarget.dataset.id);
      draggedEmployee = emp;
    };
    item.ondragend = () => (draggedEmployee = null);
  });
}

// ==================== DRAG & DROP ====================
function initDragDrop() {
  document.querySelectorAll(".shift-card").forEach((card) => {
    card.ondragover = (e) => {
      e.preventDefault();
      e.currentTarget.style.background = "#d0e4f7";
      e.currentTarget.style.transform = "scale(1.02)";
    };

    card.ondragleave = (e) => {
      e.currentTarget.style.background = "#e6eef8";
      e.currentTarget.style.transform = "scale(1)";
    };

    card.ondrop = (e) => {
      e.preventDefault();
      e.currentTarget.style.background = "#e6eef8";
      e.currentTarget.style.transform = "scale(1)";

      if (!draggedEmployee) return;

      const placeholderLines =
        e.currentTarget.querySelector(".placeholder-lines");

      // Kiểm tra trùng
      if (
        placeholderLines.querySelector(`[data-emp-id="${draggedEmployee.id}"]`)
      ) {
        alert(`Nhân viên ${draggedEmployee.name} đã có trong ca này!`);
        return;
      }

      // Tìm line trống
      const emptyLine = Array.from(
        placeholderLines.querySelectorAll(".line")
      ).find((line) => !line.querySelector(".assigned-employee"));

      if (!emptyLine) {
        alert("Ca này đã đầy! Không thể thêm nhân viên.");
        return;
      }

      // Thêm nhân viên
      emptyLine.innerHTML = `
        <div class="assigned-employee" data-emp-id="${draggedEmployee.id}">
          <div class="emp-avatar">${draggedEmployee.avatar}</div>
          <div class="emp-name">${draggedEmployee.name}</div>
          <button class="remove-emp" onclick="removeEmployee(this)" title="Xóa khỏi ca">×</button>
        </div>
      `;

      // Ẩn hint nếu đầy
      const lines = placeholderLines.querySelectorAll(".line");
      const filled =
        placeholderLines.querySelectorAll(".assigned-employee").length;
      if (filled >= lines.length) {
        e.currentTarget.querySelector(".drop-hint").style.display = "none";
      }

      saveShiftAssignment(e.currentTarget);
    };
  });
}

// ==================== LƯU & KHÔI PHỤC CA ====================
function getShiftKey(shiftCard) {
  const garage = shiftCard.closest(".group").dataset.garage;
  const shift = shiftCard.dataset.shift;
  return `${formatDate(currentDate)}_${garage}_${shift}`;
}

function saveShiftAssignment(shiftCard) {
  const shiftKey = getShiftKey(shiftCard);
  const assignedEmployees = Array.from(
    shiftCard.querySelectorAll(".assigned-employee")
  ).map((emp) => parseInt(emp.dataset.empId));

  shifts[shiftKey] = assignedEmployees;
  saveDataToStorage();
}

function restoreShiftAssignments() {
  document.querySelectorAll(".shift-card").forEach((card) => {
    const shiftKey = getShiftKey(card);
    const assignedEmployees = shifts[shiftKey] || [];
    const lines = card.querySelectorAll(".line");

    assignedEmployees.forEach((empId, index) => {
      if (index < lines.length) {
        const employee = employees.find((emp) => emp.id === empId);
        if (employee) {
          lines[index].innerHTML = `
            <div class="assigned-employee" data-emp-id="${employee.id}">
              <div class="emp-avatar">${employee.avatar}</div>
              <div class="emp-name">${employee.name}</div>
              <button class="remove-emp" onclick="removeEmployee(this)" title="Xóa khỏi ca">×</button>
            </div>
          `;
        }
      }
    });

    // Ẩn hint nếu đầy
    const filled = card.querySelectorAll(".assigned-employee").length;
    if (filled >= lines.length) {
      card.querySelector(".drop-hint").style.display = "none";
    }
  });
}

function clearAndRestoreShifts() {
  document.querySelectorAll(".shift-card").forEach((card) => {
    card.querySelectorAll(".assigned-employee").forEach((emp) => emp.remove());
    card.querySelectorAll(".line").forEach((line) => (line.innerHTML = ""));
    card.querySelector(".drop-hint").style.display = "block";
  });
  restoreShiftAssignments();
}

// ==================== XÓA NHÂN VIÊN ====================
function removeEmployee(btn) {
  const employeeCard = btn.parentElement;
  const empName = employeeCard.querySelector(".emp-name").textContent;
  const shiftCard = employeeCard.closest(".shift-card");

  if (confirm(`Xóa ${empName} khỏi ca làm việc này?`)) {
    employeeCard.remove();
    employeeCard.parentElement.innerHTML = "";

    // Hiện hint nếu còn trống
    const filled = shiftCard.querySelectorAll(".assigned-employee").length;
    if (filled === 0) {
      shiftCard.querySelector(".drop-hint").style.display = "block";
    }

    saveShiftAssignment(shiftCard);
  }
}

function deleteEmployee(empId) {
  const employee = employees.find((emp) => emp.id === empId);
  if (!employee) return;

  if (confirm(`Bạn xác nhận xóa nhân viên "${employee.name}"?`)) {
    employees = employees.filter((emp) => emp.id !== empId);

    // Xóa khỏi tất cả ca
    document.querySelectorAll(`[data-emp-id="${empId}"]`).forEach((card) => {
      const shiftCard = card.closest(".shift-card");
      card.remove();
      card.parentElement.innerHTML = "";

      const filled = shiftCard.querySelectorAll(".assigned-employee").length;
      if (filled === 0) {
        shiftCard.querySelector(".drop-hint").style.display = "block";
      }

      saveShiftAssignment(shiftCard);
    });

    // Xóa khỏi shifts
    Object.keys(shifts).forEach((shiftKey) => {
      shifts[shiftKey] = shifts[shiftKey].filter((id) => id !== empId);
    });

    saveDataToStorage();
    renderEmployeeList();
  }
}
