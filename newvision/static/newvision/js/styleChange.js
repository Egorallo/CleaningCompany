const checkboxSize = document.getElementById("font-size");
const checkboxTextColor = document.getElementById("text-color");
const checkboxBgColor = document.getElementById("bg-color");


checkboxSize.addEventListener("change", function () {
    const fontControls = document.getElementById("font-controls");

    if (checkboxSize.checked) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Font Size";
        const button = document.createElement("button");
        button.textContent = "Change Font Size";
        button.addEventListener("click", function () {
            const fontSize = input.value + "px";
            document.body.style.fontSize = fontSize;
        });

        fontControls.appendChild(input);
        fontControls.appendChild(button);
    } else {
        while (fontControls.firstChild) {
            fontControls.removeChild(fontControls.firstChild);
        }
    }
});

checkboxTextColor.addEventListener("change", function () {
    const fontColor = document.getElementById("font-color");
    if (checkboxTextColor.checked) {
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.id = "color-picker";

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm";
        confirmButton.id = "confirm-button";

        fontColor.appendChild(colorPicker);
        fontColor.appendChild(confirmButton);

        confirmButton.addEventListener("click", function () {
            const selectedColor = colorPicker.value;
            document.body.style.color = selectedColor;
        });
    } else {
        while (fontColor.firstChild) {
            fontColor.removeChild(fontColor.firstChild);
        }
    }
});

checkboxBgColor.addEventListener("change", function () {
    const backColor = document.getElementById("back-color");
    if (checkboxBgColor.checked) {
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.id = "color-picker";

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm";
        confirmButton.id = "confirm-button";

        backColor.appendChild(colorPicker);
        backColor.appendChild(confirmButton);

        confirmButton.addEventListener("click", function () {
            const selectedColor = colorPicker.value;
            document.body.style.backgroundColor = selectedColor;
        });
    } else {
        while (fontColor.firstChild) {
            backColor.removeChild(backColor.firstChild);
        }
    }
});