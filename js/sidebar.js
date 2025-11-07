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

// Cấu trúc menu
const menuStructure = [
  { label: "Trang chủ", hasSubmenu: false },
  {
    label: "Thống kê",
    hasSubmenu: true,
    submenu: ["Nhà xe", "Đăng kí vé Tháng", "Doanh Thu"],
  },
  { label: "Tra cứu lịch nhận sự", hasSubmenu: false },
];
// thêm chức năng chuyển trang cho nút button
Home.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "home_page/home.html";
});

trang5.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "trang5.html";
});

const bottomMenuStructure = [{ label: "Cài đặt" }, { label: "Đăng xuất" }];
// Xử lý menu items chính (3 items đầu)
menuStructure.forEach((item, index) => {
  if (navItems[index]) {
    const navItem = navItems[index];

    // Thêm wrapper cho content
    const wrapper = document.createElement("div");
    wrapper.className = "nav-item-wrapper";

    // Di chuyển img vào wrapper
    const img = navItem.querySelector("img");
    if (img) {
      wrapper.appendChild(img);
    }

    // Thêm label
    const label = document.createElement("span");
    label.className = "nav-label";
    label.textContent = item.label;
    wrapper.appendChild(label);

    // Nếu có submenu, thêm chevron
    if (item.hasSubmenu) {
      const chevron = document.createElement("span");
      chevron.className = "nav-chevron";
      chevron.innerHTML = "▼";
      wrapper.appendChild(chevron);

      navItem.classList.add("has-submenu");
    }

    navItem.appendChild(wrapper);

    // Tạo submenu nếu có
    if (item.hasSubmenu && item.submenu) {
      const submenuContainer = document.createElement("div");
      submenuContainer.className = "submenu";

      item.submenu.forEach((subLabel) => {
        const submenuItem = document.createElement("button");
        submenuItem.className = "submenu-item";

        const bullet = document.createElement("span");
        bullet.className = "submenu-bullet";
        submenuItem.appendChild(bullet);

        const text = document.createElement("span");
        text.textContent = subLabel;
        submenuItem.appendChild(text);

        submenuItem.addEventListener("click", (e) => {
          e.stopPropagation();
          // Xóa active từ tất cả submenu items
          document
            .querySelectorAll(".submenu-item")
            .forEach((si) => si.classList.remove("active"));
          submenuItem.classList.add("active");
          console.log(`Clicked submenu: ${subLabel}`);
        });

        submenuContainer.appendChild(submenuItem);
      });

      navItem.parentElement.insertBefore(submenuContainer, navItem.nextSibling);

      // Xử lý click để toggle submenu
      navItem.addEventListener("click", (e) => {
        e.stopPropagation();
        const isCurrentlyOpen = navItem.classList.contains("open");

        // Đóng tất cả submenu khác
        document.querySelectorAll(".nav-item.open").forEach((item) => {
          item.classList.remove("open");
        });
        document.querySelectorAll(".submenu.show").forEach((sub) => {
          sub.classList.remove("show");
        });

        // Toggle submenu hiện tại
        if (!isCurrentlyOpen) {
          navItem.classList.add("open");
          submenuContainer.classList.add("show");
        }
      });
    } else {
      // Menu items không có submenu
      navItem.addEventListener("click", () => {
        // Xóa active từ tất cả nav items
        navItems.forEach((item) => item.classList.remove("active"));
        navItem.classList.add("active");

        // Đóng tất cả submenu
        document.querySelectorAll(".nav-item.open").forEach((item) => {
          item.classList.remove("open");
        });
        document.querySelectorAll(".submenu.show").forEach((sub) => {
          sub.classList.remove("show");
        });
      });
    }
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
