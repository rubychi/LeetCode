/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let table = [];
    for (let i = 0; i < board.length; i++) {
        table[i] = [];
        for (let j = 0; j < board[i].length; j++) {
            table[i][j] = false;
        }
    }
    /** 
     * Search for the adjacent cells
     *
     * @param {string} word: The target word to be searched
     * @param {number} i: The row number of current cell
     * @param {number} j: The column number of current cell
     * @param {array} table: A lookup table used to store the path
     * @return {boolean} The search result
     */
    function search(word, i, j) {
        if (table[i][j]) {
            return false;
        }
        if (word[0] === board[i][j]) {
            let nextWord = word.slice(1);
            if (!nextWord.length) {
                return true;
            }
            table[i][j] = true;
            // Move right
            if (j+1 < board[i].length) {
                if (search(nextWord, i, j+1)) {
                    return true;
                }
            }
            // Move down
            if (i+1 < board.length) {
                if (search(nextWord, i+1, j)) {
                    return true;
                }
            }
            // Move left
            if (j-1 >= 0) {
                if (search(nextWord, i, j-1)) {
                    return true;
                }
            }
            // Move up
            if (i-1 >= 0) {
                if (search(nextWord, i-1, j)) {
                    return true;
                }
            }
        }
        table[i][j] = false;
        return false;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (search(word, i, j)) {
                return true;
            }
        }
    }
    return false;
};