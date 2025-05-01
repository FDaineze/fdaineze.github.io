document.addEventListener("click", (evt) => {
    const flyoutMenu = document.getElementById("menu");
    const flyoutTogl = document.getElementById("menuToggle");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutMenu) {
            // inside            
            return;
        }
        if (targetElement == flyoutTogl) {
            // inside
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    console.log('out');
    document.getElementById("checkbut").checked = false;
});
