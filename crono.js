let cronoInterval;
let cronoSeconds = 0;

function formatTimeUnit(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function updateCronoDisplay() {
  var hours = Math.floor(cronoSeconds / 3600);
  var minutes = Math.floor((cronoSeconds % 3600) / 60);
  var seconds = cronoSeconds % 60;

  var displayStr = formatTimeUnit(hours) + ":" + formatTimeUnit(minutes) + ":" + formatTimeUnit(seconds);
  var screen = document.querySelector("#cronoScreen");
  if (screen) {
    screen.value = displayStr;
  }
}

function startCrono() {
  if (!cronoInterval) {
    cronoInterval = setInterval(function() {
      cronoSeconds++;
      updateCronoDisplay();
    }, 1000);
  }
}

function stopCrono() {
  clearInterval(cronoInterval);
  cronoInterval = null;
}

function resetCrono() {
  stopCrono();
  cronoSeconds = 0;
  updateCronoDisplay();
}

// Esto intercepta el clic en el icono del crono sin tocar tu script.js principal
document.addEventListener("DOMContentLoaded", function() {
  var cronoIcon = document.querySelector("#cronoIcon");
  var cronoWin = document.querySelector("#cronoWindow");
  var cronoClose = document.querySelector("#cronoClose");

  if (cronoIcon && cronoWin) {
    cronoIcon.addEventListener("click", function() {
      if (cronoWin.style.display === "flex") {
        cronoWin.style.display = "none";
      } else {
        cronoWin.style.display = "flex";
      }
    });
  }

  if (cronoClose && cronoWin) {
    cronoClose.addEventListener("click", function() {
      cronoWin.style.display = "none";
    });
  }
});