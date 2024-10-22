let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".newGame");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let resetBtn = document.querySelector(".resetButton");

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let playerX = true;

const resetGame = () => {
    playerX = true;
    boxes.forEach((box) => {
        box.innerHTML = "";
    });
    msgContainer.classList.add("hide");  // Hide message container
    enableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
    });
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, the winner is ${winner}`;  // Display the winner
    msgContainer.classList.remove("hide");  // Show message container
    disableBoxes();  // Disable further moves
};

const checkWinner = () => {
    let winnerFound = false;

    // Loop through each win pattern
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        // Check if all three boxes in the pattern are equal and not empty
        if (
            boxes[a].innerHTML !== "" &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[b].innerHTML === boxes[c].innerHTML
        ) {
            let winner = boxes[a].innerHTML;
            showWinner(winner);  // Call showWinner with the current player
            winnerFound = true;
            return;
        }
    }

    // If no winner, check for a draw
    if (!winnerFound) {
        const isDraw = [...boxes].every((box) => box.innerHTML !== "");
        if (isDraw) {
            msg.innerHTML = "It's a draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

const handleBoxClick = (event) => {
    const box = event.target;

    // Only mark the box if it's empty
    if (box.innerHTML === "") {
        box.innerHTML = playerX ? "X" : "O";  // Display 'X' or 'O'
        playerX = !playerX;  // Toggle turn
        checkWinner();  // Check if there's a winner after each move
    }
};

// Add event listeners to each box for clicks
boxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
});

// Event listener for the New Game button
newGameBtn.addEventListener("click", resetGame);

// Event listener for the Reset button
resetBtn.addEventListener("click", resetGame);
