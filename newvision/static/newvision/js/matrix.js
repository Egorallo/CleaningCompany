document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const transposeButton = document.getElementById('transposeButton');


    generateButton.addEventListener('click', generateTable);
    transposeButton.addEventListener('click', transposeTable);

    document.getElementById('randomTable').addEventListener('click', highlightCell);

});

function generateTable() {
    const tableSize = parseInt(document.getElementById('tableSize').value);
    const randomTable = document.getElementById('randomTable');
    randomTable.innerHTML = '';

    for (let i = 0; i < tableSize; i++) {
        const row = randomTable.insertRow();
        for (let j = 0; j < tableSize; j++) {
            const cell = row.insertCell();
            cell.textContent = Math.floor(Math.random() * 100);
        }
    }

    const transposeButton = document.getElementById('transposeButton');
    transposeButton.style.display = 'inline';
}

function transposeTable() {
    const randomTable = document.getElementById('randomTable');
    const rows = randomTable.rows;
    const cols = rows[0].cells.length;

    const transposedTable = document.createElement('table');
    for (let i = 0; i < cols; i++) {
        const row = transposedTable.insertRow();
        for (let j = 0; j < rows.length; j++) {
            const cell = row.insertCell();
            cell.textContent = rows[j].cells[i].textContent;
        }
    }

    randomTable.innerHTML = transposedTable.innerHTML;
}

function highlightCell(event) {
    const clickedCell = event.target;

    // Если кликнули по ячейке
    if (clickedCell.tagName === 'TD') {
        // Определение значения ячейки
        const cellValue = parseInt(clickedCell.textContent);

        // Убираем выделение со всех ячеек
        const allCells = document.getElementsByTagName('td');
        for (let cell of allCells) {
            cell.classList.remove('highlighted');
        }

        // Добавляем выделение для кликнутой ячейки в зависимости от условий
        if (cellValue % 2 === 0) {
            clickedCell.classList.add('highlighted-even');
        } else {
            clickedCell.classList.add('highlighted-odd');
        }
    }
}