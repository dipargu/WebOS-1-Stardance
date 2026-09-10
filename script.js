function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    
    if (element.id === "myAppIcon") {
      var notesWin = document.querySelector("#notes");
      if (notesWin.style.display === "flex") { closeWindow(notesWin); } else { openWindow(notesWin); }
    } else if (element.id === "animeIcon") {
      var animeWin = document.querySelector("#animeWindow");
      if (animeWin.style.display === "flex") { closeWindow(animeWin); } else { openWindow(animeWin); }
    } else if (element.id === "calcIcon") {
      var calcWin = document.querySelector("#calcWindow");
      if (calcWin.style.display === "flex") { closeWindow(calcWin); } else { openWindow(calcWin); }
    } else if (element.id === "cronoIcon") {
      var cronoWin = document.querySelector("#cronoWindow");
      if (cronoWin.style.display === "flex") { closeWindow(cronoWin); } else { openWindow(cronoWin); }
    }
  } else {
    if (selectedIcon) deselectIcon(selectedIcon);
    selectIcon(element);
    
    if (element.id === "myAppIcon") {
      openWindow(document.querySelector("#notes"));
    } else if (element.id === "animeIcon") {
      openWindow(document.querySelector("#animeWindow"));
    } else if (element.id === "calcIcon") {
      openWindow(document.querySelector("#calcWindow"));
    } else if (element.id === "cronoIcon") {
      openWindow(document.querySelector("#cronoWindow"));
    }
  }
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
  }
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

function closeWindow(element) {
  element.style.display = "none";
}

function initializeWindow(windowId, closeBtnId) {
  var win = document.querySelector(windowId);
  var closeBtn = document.querySelector(closeBtnId);

  if (closeBtn && win) {
    closeBtn.addEventListener("click", function() {
      closeWindow(win);
    });
  }

  if (win) {
    win.addEventListener("mousedown", function() {
      biggestIndex++;
      win.style.zIndex = biggestIndex;
    });
  }
}

var selectedIcon = undefined;
var biggestIndex = 1;

initializeWindow("#welcome", "#welcomeclose");
initializeWindow("#notes", "#notesclose");
initializeWindow("#animeWindow", "#animeClose");
initializeWindow("#calcWindow", "#calcClose");
initializeWindow("#cronoWindow", "#cronoClose");

var welcomeScreenOpen = document.querySelector("#welcomeopen");
if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(document.querySelector("#welcome"));
  });
}