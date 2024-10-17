document.addEventListener("DOMContentLoaded", function () {
  const beforeCtx = document.getElementById("beforeChart").getContext("2d");
  const afterCtx = document.getElementById("afterChart").getContext("2d");
  let beforeChart, afterChart;
  let lastBeforeUpdate = 0;
  let lastAfterUpdate = 0;

  function createChart(ctx, data, label, color) {
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: "rgb(227,121,63)",
            },
          },
          x: {
            ticks: {
              color: "rgb(227,121,63)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#e6e7e8",
            },
          },
        },
      },
    });
  }

  function updateChart(chart, data) {
    chart.data.datasets[0].data = data;
    chart.update();
  }

  function checkAndUpdateCharts() {
    const currentBeforeUpdate = localStorage.getItem("lastBeforeUpdate");
    const currentAfterUpdate = localStorage.getItem("lastAfterUpdate");

    if (currentBeforeUpdate && currentBeforeUpdate !== lastBeforeUpdate) {
      const beforeResponses = JSON.parse(
        localStorage.getItem("beforeResponses")
      ) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      updateChart(beforeChart, beforeResponses);
      lastBeforeUpdate = currentBeforeUpdate;
    }

    if (currentAfterUpdate && currentAfterUpdate !== lastAfterUpdate) {
      const afterResponses = JSON.parse(
        localStorage.getItem("afterResponses")
      ) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      updateChart(afterChart, afterResponses);
      lastAfterUpdate = currentAfterUpdate;
    }
  }

  // Initial chart creation
  const initialBeforeResponses = JSON.parse(
    localStorage.getItem("beforeResponses")
  ) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const initialAfterResponses = JSON.parse(
    localStorage.getItem("afterResponses")
  ) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  beforeChart = createChart(
    beforeCtx,
    initialBeforeResponses,
    "# Responses Before",
    "rgb(227,121,63)"
  );
  afterChart = createChart(
    afterCtx,
    initialAfterResponses,
    "# Responses After",
    "rgb(129,188,213)"
  );

  // Update the charts every 2 seconds, but only if there's new data
  setInterval(checkAndUpdateCharts, 2000);
});
