document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      sendDataToInterface2(value);
    });
  });
});

function sendDataToInterface2(value) {
  let responses = JSON.parse(localStorage.getItem("afterResponses")) || [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  responses[value]++;
  localStorage.setItem("afterResponses", JSON.stringify(responses));
  localStorage.setItem("lastAfterUpdate", Date.now());
  console.log(`Button ${value} pressed. Data sent to Interface 2.`);
}
