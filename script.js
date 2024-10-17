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
  let responses = JSON.parse(localStorage.getItem("beforeResponses")) || [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  responses[value]++;
  localStorage.setItem("beforeResponses", JSON.stringify(responses));
  localStorage.setItem("lastBeforeUpdate", Date.now());
  console.log(`Button ${value} pressed. Data sent to Interface 2.`);
}
