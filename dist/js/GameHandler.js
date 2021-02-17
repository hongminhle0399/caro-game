let playerTurn = false;
const cells = document.querySelectorAll('.board > div');
const playerName = document.getElementsByClassName('player-name')[0];
const playerSymbol = document.getElementsByClassName('player-symbol-container')[0];
const btnRestart = document.getElementsByClassName('modal-button-restart')[0];
const modalNotification = document.getElementsByClassName('modal-container')[0];
const modalMessage = document.getElementsByClassName('modal-message')[0];
const squares = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
];

window.addEventListener('load', e => {
    handleBoard();
    handleRestart();
});

const handleRestart = () => {
    btnRestart.addEventListener('click', () => {
        for(let i = 0; i < 9; i++){
            cells[i].className = `sq${i + 1}`;
        }

        squares.forEach(item => {
            item = item.fill(-1);
        });
        console.log(squares);
        playerTurn = false;
        handlePlayerSymbol(playerTurn);
        modalMessage.textContent = "Game Over";
        modalNotification.classList.toggle('show');
    });
}

const handlePlayerSymbol = playerTurn => {
    if(playerTurn){
        playerName.textContent = 'Player-2';
        playerSymbol.children[0].className = 'player-symbol fas fa-times red';
    }
    else{
        playerName.textContent = 'Player-1';
        playerSymbol.children[0].className = 'player-symbol far fa-circle green';
    }
}

const handleBoard = () => {
    // playerName.textContent = 'Player-1';
    // playerSymbol.children[0].className = 'player-symbol far fa-circle green';
    handlePlayerSymbol(playerTurn);

    cells.forEach((item, index) => {
        item.addEventListener('click', () => {
            if(!item.className.includes('far fa-circle') && !item.className.includes('fas fa-times')){
                if(playerTurn){ 
                    item.className = item.className.replace('', 'fas fa-times ');
                    item.style.color = 'rgb(255, 0, 0)';
                }
                else{
                    item.className = item.className.replace('' ,'far fa-circle ');
                    item.style.color = 'rgb(0, 255, 0)';
                }
                console.log(Math.floor(index / 3));
                console.log(index % 3);
                squares[Math.floor(index / 3)][index % 3] = !playerTurn ? 0 : 1;
                checkOver(index);
                playerTurn = !playerTurn;
                handlePlayerSymbol(playerTurn);
                console.log(squares);
            }
        });
    });
}

const checkWinner = (index) => {
    let count = 1;
    let row = Math.floor(index / 3);
    let col = index % 3;
    let tempRow = row, tempCol = col;
    let _playerSymbol = squares[row][col];
    while(tempCol > 0){
        --tempCol;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    tempCol = col;
    while(tempCol < 2){
        ++tempCol;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    count = 1;
    tempCol = col;
    while(tempRow > 0){
        --tempRow;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    count = 1;
    tempRow = row;
    while(tempRow < 2){
        ++tempRow;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    count = 1;
    tempRow = row;
    while(tempCol > 0 && tempRow > 0){
        --tempCol;
        --tempRow;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    tempCol = col;
    tempRow = row;
    while(tempCol < 2 && tempRow < 2){
        ++tempCol;
        ++tempRow;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    count = 1;
    tempCol = col;
    tempRow = row;
    while(tempCol < 2 && tempRow > 0){
        ++tempCol;
        --tempRow;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    if(count === 3) return _playerSymbol;
    tempCol = col;
    tempRow = row;
    while(tempCol > 0 && tempRow < 2){
        ++tempRow;
        --tempCol;
        if(_playerSymbol === squares[tempRow][tempCol]) ++count;
        else break;
    }
    return count === 3 ? _playerSymbol : -1;
}

const checkOver = (index) => {
    let result = checkWinner(index);
    switch(result){
        case 0:
            modalMessage.textContent = "Player 1 win";
            modalNotification.classList.add('show');
            break;
        case 1:
            modalMessage.textContent = "Player 2 win";
            modalNotification.classList.add('show');
            break;
        case -1:
            let over = [...cells].every(item => {
                return item.classList.contains('fas') || item.classList.contains('far');
            });
            if(over){
                modalNotification.classList.add('show');
                console.log("Game over");
            }
            break;
        default:
            console.log('value is false');
            break;
    }
};