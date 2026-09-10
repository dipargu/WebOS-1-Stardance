// Gestión de apertura y cierre de ventanas y lógica de arrastre (Drag & Drop)

function handleIconTap(icon) {
    const id = icon.id;
    let targetWindowId = "";

    if (id === "myAppIcon") targetWindowId = "notes";
    if (id === "animeIcon") targetWindowId = "animeWindow";
    if (id === "calcIcon") targetWindowId = "calcWindow";
    if (id === "cronoIcon") targetWindowId = "cronoWindow";

    if (targetWindowId) {
        const win = document.getElementById(targetWindowId);
        if (win) {
            win.style.display = win.style.display === "none" ? "block" : "none";
        }
    }
}

// Botones de cierre (X)
document.addEventListener("click", function(e) {
    if (e.target && e.target.id) {
        if (e.target.id === "notesClose") document.getElementById("notes").style.display = "none";
        if (e.target.id === "animeClose") document.getElementById("animeWindow").style.display = "none";
        if (e.target.id === "calcClose") document.getElementById("calcWindow").style.display = "none";
        if (e.target.id === "cronoClose") document.getElementById("cronoWindow").style.display = "none";
    }
});

// Ocultar/Mostrar barra inferior
function toggleMainHeader() {
    const welcome = document.getElementById("welcome");
    const text = document.getElementById("toggleHeaderText");
    if (welcome.style.display === "none") {
        welcome.style.display = "flex";
        if (text) text.textContent = "Close";
    } else {
        welcome.style.display = "none";
        if (text) text.textContent = "Open";
    }
}

// Sistema de arrastre robusto para las ventanas (solo desde el header)
document.addEventListener("DOMContentLoaded", () => {
    const windows = document.querySelectorAll(".window");

    windows.forEach(win => {
        const header = win.querySelector(".windowheader");
        if (!header) return;

        let isDragging = false;
        let startX, startY, initialX, initialY;

        header.addEventListener("mousedown", (e) => {
            // Evitar arrastre si se hace clic en la "X" de cerrar
            if (e.target.id && e.target.id.includes("Close")) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            // Obtener posición actual de la ventana
            const rect = win.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;

            // Poner la ventana seleccionada al frente
            win.style.zIndex = 9999;

            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            win.style.left = `${initialX + dx}px`;
            win.style.top = `${initialY + dy}px`;
            win.style.position = "absolute";
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    });
});