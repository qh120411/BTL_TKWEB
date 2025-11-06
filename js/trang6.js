// Vẽ biểu đồ tròn với Chart.js
const ctx = document.getElementById("pieChart").getContext("2d");
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Xe đạp", "Xe máy"],

    datasets: [
      {
        data: [10, 90],
        backgroundColor: [ "#DBA362","#CEDEF2"],//
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
    },
    cutout: "70%", //
  },
});

// Hiệu ứng active cho sidebar
const sidebarButtons = document.querySelectorAll(".sidebar button");//
sidebarButtons.forEach((btn) => {//
  btn.addEventListener("click", () => {
    sidebarButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

