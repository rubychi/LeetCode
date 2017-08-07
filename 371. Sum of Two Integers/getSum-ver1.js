/**
 * Version 1
 * The accuracy of the range is from -2147483648 ~ 2147483647, i.e, 32 bits signed integers
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var getSum = function(num1, num2) {
    let result = [], carry = 0;
    for (; num1 || num2; num1=num1>>>1, num2=num2>>>1) {
        result.push((num1 ^ num2 ^ carry) & 1);
        // If there are more than two 1s than set carry as 1 for the next round of addition
        if ((num1 & num2 & 1) || (num1 & carry & 1) || (num2 & carry & 1)) {
            carry = 1;
        } else {
            carry = 0;
        }
    }
    if (carry) {
        result.push(1);
    }
    return ~~parseInt(result.reverse().join(""), 2);
};