'use strict'



const GameBoard = ((doc) => {
    const _board = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
    const showArray = () => console.log(_board);
    // const spotSelector = (num) => {
    //     return doc.querySelector(`#spot${num}`)
    // };
    let move = 0;

    const mark = (k) => {
        return k % 2 === 0 ? 'x' : 'o';
    }
    const checkMarked = (index) => {
        return _board[index] === 'none'
    }

    const addToArray = (mark, num) => {
        _board[num] = mark;
    }

    const roundOver = (player1, player2) => {
        return player1.checkWin() || player2.checkWin() || move === 9;
    }

    const selectAllSpot = doc.querySelectorAll(".spot");

    const whosTurn = function (moveCount, p1, p2) {
        if (p1.isFirst) {
            return moveCount % 2 === 0 ? p1.position : p2.position;
        } else {
            return moveCount % 2 === 0 ? p1.position : p2.position;
        }
    }

    selectAllSpot.forEach(spot => {
        spot.addEventListener('click', (e) => {
            const spotNum = e.target.id[4];
            console.log(whosTurn(move, player1, player2));

            if (!roundOver(player1, player2)) { // is this round over?
                if (checkMarked(spotNum)) {     // is this spot already been checked?
                    if (mark(move) === player1.mark) { //do p1 play this move?
                        player1.addToMyArray(spotNum)
                        player1.showMyArray();

                    } else if (mark(move) === player2.mark) { //do p2 play this move?
                        player2.addToMyArray(spotNum)
                        player2.showMyArray();
                    }
                    e.target.textContent = mark(move); // display this move to html
                    addToArray(mark(move), spotNum) // add this move to GameBoard array
                    move++;                        // count move sum
                    console.log(e.target.id, mark(move), move);
                    if (player1.checkWin()) {
                        console.log("player 1 win");
                        player1.winCount++;
                        player1.winCountDiv.textContent = player1.winCount;
                    } else if (player2.checkWin()) {
                        console.log("player 2 win");
                        player2.winCount++;
                        player2.winCountDiv.textContent = player2.winCount;
                    }
                    else if (move === 9) {
                        console.log('tie!')
                    }
                }
            }
        })
    });


    const clearBoard = () => {
        selectAllSpot.forEach(spot => {
            spot.textContent = "";
        })
    }

    const resetArray = () => {
        _board.length = 0
        for (let i = 0; i < 9; i++) {
            _board.push('none')
        }
    }


    const resetButton = doc.querySelector('#reset');

    resetButton.addEventListener('click', () => {
        console.log(roundOver(player1, player2))
        if (roundOver(player1, player2)) {
            player1.clearMyArray();
            player2.clearMyArray();
            resetArray();
            clearBoard();
            move = 0;
        }
    })

    const findUnmarked = () => {
        const unmarkedIndexArray = [];
        _board.forEach((spot, index) => {
            if (spot === 'none') {
                unmarkedIndexArray.push(index)
            }
        });
        return unmarkedIndexArray;
    }



    return { addToArray, showArray, selectAllSpot, checkMarked, findUnmarked, roundOver }
})(document)


const Player = (position, name, isAuto, isFirst) => {
    this.position = position;
    this.name = name;
    this.isAuto = isAuto;
    this.isFirst = isFirst;
    const myArray = [];
    const showMyArray = () => console.log(myArray);
    const addToMyArray = (num) => {
        myArray.push(+num + 1)
    };
    const winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

    const checkWin = () => {
        return winConditions.some(winCondition => { return winCondition.every(element => myArray.includes(element)) })
    }

    let winCount = 0;

    const winCountDiv = document.querySelector(`#${position}-win-count`)

    const clearMyArray = () => myArray.length = 0;

    return { position, name, isAuto, isFirst, addToMyArray, showMyArray, checkWin, clearMyArray, winCount, winCountDiv }
}

const player1 = Player('left', 'Jerru', false, true);
const player2 = Player('right', 'Moof', false, false);
player1.mark = 'x';
player2.mark = 'o';

const autoPlayer = Player('right', 'pc', true, false)
autoPlayer.mark = 'o';
