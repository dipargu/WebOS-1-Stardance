dragElement(document.getElementById("welcome"));

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = onElementMove;
  }

  function onElementMove(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcome")

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex"
}

var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});
var selectedIcon = undefined;
var biggestIndex = 1;

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

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(document.querySelector("#notes"));
  } else {
    if (selectedIcon) deselectIcon(selectedIcon);
    selectIcon(element);
  }
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  document.querySelector("#welcome").style.zIndex = biggestIndex + 1;
}

function closeWindow(element) {
  element.style.display = "none";
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  document.querySelector("#welcome").style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon);
}

function initializeWindow(windowId, closeBtnId) {
  var win = document.querySelector(windowId);
  var closeBtn = document.querySelector(closeBtnId);

  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      closeWindow(win);
    });
  }

  win.addEventListener("mousedown", function() {
    handleWindowTap(win);
  });

  dragElement(win);
}

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  var header = document.getElementById(element.id + "header");
  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = onElementMove;
  }

  function onElementMove(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var content = [
  {
    title: "Note 1",
    date: "10/09/2026",
    content: "<p>My name is Diego, my friends call me Dipargu.</p>"
  },
  {
    title: "Note 2",
    date: "10/09/2026",
    content: "<p>Learning.</p>"
  }
];

function setNotesContent(index) {
  var noteArea = document.querySelector("#noteContent");
  noteArea.innerHTML = content[index].content;
}

function addToSideBar(index) {
  var sidebar = document.querySelector("#sidebar");
  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.style.cursor = "pointer";
  newDiv.innerHTML = "<p style='margin:0; font-weight:bold;'>" + note.title + "</p>";
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  sidebar.appendChild(newDiv);
}

for (var i = 0; i < content.length; i++) {
  addToSideBar(i);
}
if (content.length > 0) {
  setNotesContent(0);
}

initializeWindow("#welcome", "#welcomeclose");
initializeWindow("#notes", "#notesclose");

var welcomeScreenOpen = document.querySelector("#welcomeopen");
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(document.querySelector("#welcome"));
});