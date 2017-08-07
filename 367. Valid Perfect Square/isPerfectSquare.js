/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num === 0) {
        return true;
    }
    let numOfZero = (String(num).length-1)/2;
    let result = parseInt("1" + "0".repeat(numOfZero));
    // Start searching for the number by dividing the interval by 2
    let min = 0, max = result*10;
    while(result*result !== num) {

        if (result*result > num) {
            max = result;
            result = max - parseInt((max-min)/2);
        } else {
            min = result;
            result = min + parseInt((max-min)/2);
        }
        if (max-1 === min) {
            return false;
        }
    }
    return true;
};