const ctx = document.getElementById("canvas").getContext("2d");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["0","7h", "9h", "11h", "13h", "15h", "17h", "19h", "20h"],
    datasets: [
      {
        label: "lượng xe vào",
        backgroundColor: "rgba(151,249,190,0.5)",
        borderColor: "rgba(42, 162, 184, 1)",
        pointBackgroundColor: "rgba(42, 162, 184, 1)",
        tension:0.35,
        data: [0,400, 600, 2500, 2000,1600, 1000, 800,500 ],
        
        pointRadius: 2
      },
      {
        label: "Lượng xe ra",
        backgroundColor: "rgba(252,147,65,0.5)",
        borderColor: "rgba(172, 45, 45, 1)",
        pointBackgroundColor: "rgba(172, 45, 45, 1)",
        tension:0.35,
        data: [0,100, 200, 100, 150, 200,1000,200,300],
        pointRadius: 2
      }
    ]
  },
  options: {
        plugins: {
          legend: {
            position: "bottom", 
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              color: "#000000ff",
              font: { size: 20 }
            }
          }
        },
    scales: {
      y: {
        ticks: { color: "#000000ff", font: { size: 17 } }
      },
      x: {
        ticks: { color: "#000000ff", font: { size: 17 } }
      }
    }
  }
});
