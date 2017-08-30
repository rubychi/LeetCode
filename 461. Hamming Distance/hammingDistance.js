/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let result = x ^ y;
	return result.toString(2).replace(/0/g, "").length;
};