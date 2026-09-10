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
    
    if (element.id === "myAppIcon") {
      openWindow(document.querySelector("#notes"));
    } else if (element.id === "animeIcon") {
      openWindow(document.querySelector("#animeWindow"));
    }
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

var animeData = [
  {
    name: "Re:Zero Starting Life in Another World",
    tag: "Top 1",
    gifs: [
      "Emilia foto perfil.gif",
      "rem MAL.gif"
    ]
  },
  {
    name: "Date A Live",
    tag: "Fav"
  },
  {
    name: "The Quintessential Quintuplets",
    tag: "Fav"
  },
  {
    name: "Kaguya-sama: Love Is War",
    tag: "Fav"
  }
];

function renderAnimes() {
  var container = document.querySelector("#animeContainer");
  if (!container) return;
  
  container.innerHTML = "";

  animeData.forEach(function(anime) {
    var card = document.createElement("div");
    card.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
    card.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    card.style.borderRadius = "6px";
    card.style.padding = "10px";

    var gifsHTML = "";
    if (anime.gifs && anime.gifs.length > 0) {
      gifsHTML = "<div style='display: flex; gap: 8px; margin-top: 8px;'>";
      anime.gifs.forEach(function(gifSrc) {
        gifsHTML += "<img src='" + gifSrc + "' style='width: 100px; height: 100px; object-fit: cover; border-radius: 6px;' />";
      });
      gifsHTML += "</div>";
    }

    card.innerHTML = 
      "<div style='display: flex; justify-content: space-between; align-items: center;'>" +
        "<h4 style='margin: 0; color: #ff79c6;'>" + anime.name + "</h4>" +
        "<span style='font-size: 10px; background: #ff5555; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>" + anime.tag + "</span>" +
      "</div>" +
      gifsHTML;

    container.appendChild(card);
  });
}

initializeWindow("#welcome", "#welcomeclose");
initializeWindow("#notes", "#notesclose");
initializeWindow("#animeWindow", "#animeClose");

renderAnimes();

var welcomeScreenOpen = document.querySelector("#welcomeopen");
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(document.querySelector("#welcome"));
});