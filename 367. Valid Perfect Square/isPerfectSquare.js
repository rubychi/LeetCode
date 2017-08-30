/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    // Start searching for the number by dividing the interval by 2
    let min = 0, max = num;
	let result = min;
    while(true) {
        if (result*result > num) {
            max = result;
            result = max - Math.ceil((max-min)/2);
        } else {
            min = result;
            result = min + Math.ceil((max-min)/2);
        }
        if (result*result === num) {
            return true;
        }
        if (max-1 === min) {
            return false;
        }
    }
};