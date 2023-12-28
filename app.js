
let newGameButton = document.getElementById('game');

let newButtonClicked = true;

newGameButton.onclick = start;

let moveCounter = 0;

function start() {
    let dif = document.querySelector('[name="game-difficulty"]:checked').value;
    if (newButtonClicked) {
        startGame(dif);
        field.style.display = "block";
        newButtonClicked = false; 
        newGameButton.innerHTML = "Restart";
        difficulty.style.display = "none";
    } else {
        window.location.reload();
    }
}

function startGame(dif) {
    const field = document.querySelector('.field');

    const cellSize = 100;
    const cells = [];
    const numbers = [...Array(dif * dif - 1).keys()].sort(() => Math.random() - 0.5);

    for (let i = 0; i <= dif * dif - 2; i++) {
        const cell = document.createElement('div');
        const value = numbers[i] + 1;
        cell.className = 'cell';
        cell.innerHTML = value;

        const left = i % dif;
        const top = (i - left) / dif;

        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
        });

        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        field.append(cell);

        cell.addEventListener('click', () => {
            move(i);
        })
    }

    const empty = {
        value: dif * dif,
        top: dif - 1,
        left: dif - 1,
    }
    cells.push(empty);


    function move(index) {
        const cell = cells[index];

        const leftDiff = Math.abs(empty.left - cell.left);
        const topDiff = Math.abs(empty.top - cell.top);

        if (leftDiff + topDiff > 1) {
            return;
        }
        moveCounter++;
        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;

        const emptyLeft = empty.left;
        const emptyTop = empty.top;

        empty.left = cell.left;
        empty.top = cell.top;

        cell.left = emptyLeft;
        cell.top = emptyTop;

        const isFinished = cells.every(cell => cell.value === cell.top * dif + cell.left + 1);

        if (isFinished) {
            alert('You solved the puzzle');
            window.location.reload();
        }
    }
}