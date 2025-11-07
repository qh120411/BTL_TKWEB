let registrations = [
  {
    id: 1,
    stt: 1,
    owner: "Lê Minh Đức",
    studentId: "242630934",
    licensePlate: "29Z137839",
    vehicleType: "Xe máy",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    stt: 2,
    owner: "Nguyễn Hoàng Anh",
    studentId: "242630942",
    licensePlate: "36AA14052",
    vehicleType: "Xe máy",
    status: "Đã thanh toán",
  },
  {
    id: 3,
    stt: 3,
    owner: "Trần Quang Huy",
    studentId: "242630943",
    licensePlate: "36AA14053",
    vehicleType: "Xe máy",
    status: "Đã thanh toán",
  },
  {
    id: 4,
    stt: 4,
    owner: "Đỗ Văn Đạt",
    studentId: "242630944",
    licensePlate: "36AA14054",
    vehicleType: "Xe đạp",
    status: "Chưa thanh toán",
  },
  {
    id: 5,
    stt: 5,
    owner: "Nguyễn Văn Hùng",
    studentId: "242630945",
    licensePlate: "36AA14055",
    vehicleType: "Xe máy",
    status: "Chưa thanh toán",
  },
];

// Biến quản lý phân trang
let currentPage = 1;
const itemsPerPage = 8;

// ========== HIỂN THỊ DỮ LIỆU ========== //

function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = ""; // Xóa dữ liệu cũ

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Lấy dữ liệu cho trang hiện tại
  const currentPageData = registrations.slice(startIndex, endIndex);

  currentPageData.forEach((reg) => {
    const row = `
                    <tr>
                        <td>${reg.stt}</td>
                        <td>${reg.owner}</td>
                        <td>${reg.studentId}</td>
                        <td>${reg.licensePlate}</td>
                        <td>${reg.vehicleType}</td>
                        <td>${reg.status}</td>
                    </tr>
                `;
    tbody.innerHTML += row;
  });

  // Cập nhật số lượng đăng ký
  document.getElementById("countBadge").textContent = registrations.length;

  updatePageInfo();

  updatePaginationButtons();
}

// ========== MODAL ========== //

function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  resetForm();
}

function closeModalOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("licensePlate").value = "";
  document.getElementById("vehicleType").value = "";
  document.getElementById("status").value = "";
}

//  Xử lý submit form đăng ký//
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const licensePlate = document.getElementById("licensePlate").value.trim();
  const vehicleType = document.getElementById("vehicleType").value;
  const status = document.getElementById("status").value;

  if (!name || !studentId || !licensePlate || !vehicleType || !status) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  // Tạo đối tượng đăng ký mới
  const newRegistration = {
    id: registrations.length + 1,
    stt: registrations.length + 1,
    owner: name,
    studentId: studentId,
    licensePlate: licensePlate,
    vehicleType: vehicleType,
    status: status,
  };

  registrations.push(newRegistration);

  // Tính tổng số trang
  const totalPages = Math.ceil(registrations.length / itemsPerPage);

  // Tự động chuyển đến trang cuối cùng để thấy đăng ký mới
  currentPage = totalPages;

  renderTable();

  setTimeout(() => {
    const content = document.querySelector(".content");
    content.scrollTop = content.scrollHeight;
  }, 100);

  // Đóng modal
  closeModal();
}

// ========== XỬ LÝ PHÂN TRANG ========== //

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function nextPage() {
  const totalPages = Math.ceil(registrations.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
}

function updatePageInfo() {
  const totalPages = Math.ceil(registrations.length / itemsPerPage);
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage}/${totalPages}`;
}

function updatePaginationButtons() {
  const totalPages = Math.ceil(registrations.length / itemsPerPage);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Disable nút "Quay lại" nếu đang ở trang đầu
  prevBtn.disabled = currentPage === 1;

  // Disable nút "Chuyển tiếp" nếu đang ở trang cuối
  nextBtn.disabled = currentPage === totalPages;
}

renderTable();
