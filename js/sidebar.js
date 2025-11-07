// Sidebar expansion functionality
const sidebar = document.querySelector(".sidebar");
const navItems = document.querySelectorAll(".nav-item");
const menuBtn = document.querySelector(".menu-btn");
const brand = document.querySelector(".brand");

// Tạo title cho brand
const brandTitle = document.createElement("span");
brandTitle.className = "brand-title";
brandTitle.textContent = "QUẢN LÝ NHÀ XE";
brand.appendChild(brandTitle);

const menuStructure = [
  { label: "Trang chủ", hasSubmenu: false, link: "home.html" },
  {
    label: "Thống kê",
    hasSubmenu: true,
    submenu: [
      { label: "Nhà xe", link: "garage.html" },
      { label: "Đăng kí vé Tháng", link: "registrations.html" },
      { label: "Doanh Thu", link: "revenue_statistics.html" },
    ],
  },
  { label: "Tra cứu lịch nhận sự", hasSubmenu: false, link: "management.html" },
];

const bottomMenuStructure = [{ label: "Cài đặt" }, { label: "Đăng xuất" }];

// Hàm lấy tên file hiện tại
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "home.html";
  return page;
}

// Hàm set active cho trang hiện tại
function setActivePage() {
  const currentPage = getCurrentPage();

  // Xóa tất cả active states
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });
  document.querySelectorAll(".submenu-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Kiểm tra submenu items trước
  const submenuItems = document.querySelectorAll(".submenu-item");
  let foundInSubmenu = false;

  submenuItems.forEach((subItem) => {
    const subItemLink = subItem.getAttribute("data-link");
    if (subItemLink === currentPage) {
      subItem.classList.add("active");
      // Mở parent submenu
      const parentNavItem = subItem.closest(".submenu").previousElementSibling;
      if (parentNavItem) {
        parentNavItem.classList.add("open");
        subItem.closest(".submenu").classList.add("show");
      }
      foundInSubmenu = true;
    }
  });

  // Nếu không tìm thấy trong submenu, kiểm tra main menu
  if (!foundInSubmenu) {
    navItems.forEach((navItem, index) => {
      const itemData = menuStructure[index];
      if (itemData && itemData.link === currentPage) {
        navItem.classList.add("active");
      }
    });
  }
}

// Xử lý menu items chính
menuStructure.forEach((item, index) => {
  const navItem = navItems[index];
  if (!navItem) return;

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "nav-item-wrapper";

  // Icon (nếu có)
  const img = navItem.querySelector("img");
  if (img) wrapper.appendChild(img);

  // Label
  const label = document.createElement("span");
  label.className = "nav-label";
  label.textContent = item.label;
  wrapper.appendChild(label);

  // Nếu có submenu, thêm ▼
  if (item.hasSubmenu) {
    const chevron = document.createElement("span");
    chevron.className = "nav-chevron";
    chevron.innerHTML = "▼";
    wrapper.appendChild(chevron);
    navItem.classList.add("has-submenu");
  }

  navItem.appendChild(wrapper);

  // Nếu có submenu
  if (item.hasSubmenu && item.submenu) {
    const submenuContainer = document.createElement("div");
    submenuContainer.className = "submenu";

    item.submenu.forEach((subItem) => {
      const submenuItem = document.createElement("button");
      submenuItem.className = "submenu-item";
      submenuItem.setAttribute("data-link", subItem.link); // Lưu link để check active

      const bullet = document.createElement("span");
      bullet.className = "submenu-bullet";
      submenuItem.appendChild(bullet);

      const text = document.createElement("span");
      text.textContent = subItem.label;
      submenuItem.appendChild(text);

      submenuItem.addEventListener("click", (e) => {
        e.stopPropagation();

        if (subItem.link) {
          window.location.href = subItem.link;
        }
      });

      submenuContainer.appendChild(submenuItem);
    });

    navItem.insertAdjacentElement("afterend", submenuContainer);

    // Toggle submenu khi click
    navItem.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navItem.classList.contains("open");

      document
        .querySelectorAll(".nav-item.open")
        .forEach((i) => i.classList.remove("open"));
      document
        .querySelectorAll(".submenu.show")
        .forEach((s) => s.classList.remove("show"));

      if (!isOpen) {
        navItem.classList.add("open");
        submenuContainer.classList.add("show");
      }
    });
  } else {
    // Không có submenu
    navItem.addEventListener("click", () => {
      if (item.link) {
        window.location.href = item.link;
      }
    });
  }
});

// Xử lý hover sidebar
sidebar.addEventListener("mouseenter", () => sidebar.classList.add("expanded"));
sidebar.addEventListener("mouseleave", () => {
  sidebar.classList.remove("expanded");
  // Không đóng submenu nếu đang ở trang trong submenu đó
  const currentPage = getCurrentPage();
  let shouldKeepOpen = false;

  document.querySelectorAll(".submenu-item").forEach((item) => {
    if (item.getAttribute("data-link") === currentPage) {
      shouldKeepOpen = true;
    }
  });

  if (!shouldKeepOpen) {
    document
      .querySelectorAll(".nav-item.open")
      .forEach((i) => i.classList.remove("open"));
    document
      .querySelectorAll(".submenu.show")
      .forEach((s) => s.classList.remove("show"));
  }
});

// Xử lý bottom menu items (Cài đặt, Đăng xuất)
const bottomItemsStartIndex = 3; // Sau spacer
bottomMenuStructure.forEach((item, index) => {
  const actualIndex = bottomItemsStartIndex + index;
  if (navItems[actualIndex]) {
    const navItem = navItems[actualIndex];

    const wrapper = document.createElement("div");
    wrapper.className = "nav-item-wrapper";

    const img = navItem.querySelector("img");
    if (img) {
      wrapper.appendChild(img);
    }

    const label = document.createElement("span");
    label.className = "nav-label";
    label.textContent = item.label;
    wrapper.appendChild(label);

    navItem.appendChild(wrapper);

    navItem.addEventListener("click", () => {
      console.log(`Clicked: ${item.label}`);
    });
  }
});

// Set active page khi load trang
setActivePage();

// Thêm chức năng chuyển trang cho nút button
const Home = document.getElementById("Home");
const management = document.getElementById("management");
const Logout = document.getElementById("Logout");

if (Home) {
  Home.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "home.html";
  });
}

if (management) {
  management.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "management.html";
  });
}
if (setting) {
  setting.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "setting.html";
  });
}

if (Logout) {
  Logout.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "../index.html";
  });
}
