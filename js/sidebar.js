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
  { label: "Tra cứu lịch nhận sự", hasSubmenu: false, link: "trang5.html" },
];

const bottomMenuStructure = [{ label: "Cài đặt" }, { label: "Đăng xuất" }];

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

      const bullet = document.createElement("span");
      bullet.className = "submenu-bullet";
      submenuItem.appendChild(bullet);

      const text = document.createElement("span");
      text.textContent = subItem.label;
      submenuItem.appendChild(text);

      submenuItem.addEventListener("click", (e) => {
        e.stopPropagation();
        document
          .querySelectorAll(".submenu-item")
          .forEach((si) => si.classList.remove("active"));
        submenuItem.classList.add("active");

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
      navItems.forEach((i) => i.classList.remove("active"));
      navItem.classList.add("active");

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
  document
    .querySelectorAll(".nav-item.open")
    .forEach((i) => i.classList.remove("open"));
  document
    .querySelectorAll(".submenu.show")
    .forEach((s) => s.classList.remove("show"));
});

// Active mặc định
if (navItems[0]) navItems[0].classList.add("active");

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

// Xử lý hover để mở rộng sidebar
sidebar.addEventListener("mouseenter", () => {
  sidebar.classList.add("expanded");
});

sidebar.addEventListener("mouseleave", () => {
  sidebar.classList.remove("expanded");

  // Đóng tất cả submenu khi rời khỏi sidebar
  document.querySelectorAll(".nav-item.open").forEach((item) => {
    item.classList.remove("open");
  });
  document.querySelectorAll(".submenu.show").forEach((sub) => {
    sub.classList.remove("show");
  });
});

// Set trang chủ active mặc định
if (navItems[0]) {
  navItems[0].classList.add("active");
}
// thêm chức năng chuyển trang cho nút button
Home.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "home.html";
});

management.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "management.html";
});
Logout.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "../index.html";
});
