// biểu đồ js

const ctx = document.getElementById("canvas").getContext("2d");

const gradientIN = ctx.createLinearGradient(0, 0, 0, 400);
gradientIN.addColorStop(0, "rgba(219, 163, 98, 0.1)");
gradientIN.addColorStop(1, "rgba(219, 163, 98, 0.02)");

const gradientOUT = ctx.createLinearGradient(0, 0, 0, 400);
gradientOUT.addColorStop(0, "rgba( 182, 211, 250, 0.1)");
gradientOUT.addColorStop(1, "rgba( 182, 211, 250, 0.02)");

const myChart = new Chart(ctx, {
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
    window.location.href = "../html/trang5.html";
  }, 500);
};
