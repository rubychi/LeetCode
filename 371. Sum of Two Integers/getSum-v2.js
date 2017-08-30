/**
 * Version 2
 * The accuracy of the range is from -9007199254740991 ~ 9007199254740991
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var getSum = function(num1, num2) {
    /** 
     * Calculate the sum of two binaries
     *
     * @param {string} a: The binary to be added
     * @param {string} b: The binary to be added
     * @return {string} The resulting binary
     */
    function binAdder(a, b) {
        a = a.split("").reverse();
        b = b.split("").reverse();
        let binSum = [], carry = 0;
        let maxLength = a.length > b.length ? a.length : b.length;
        for (let i = 0; i < maxLength; i++) {
            binSum.push((a[i] ^ b[i] ^ carry) & 1);
            // If there are more than two 1s than set carry as 1 for the next round of addition
            if ((a[i] & b[i] & 1) || (a[i] & carry & 1) || (b[i] & carry & 1)) {
                carry = 1;
            } else {
                carry = 0;
            }
        }
        if (carry) {
            binSum.push("1");
        }
        return binSum.reverse().join("");
    }
    /** 
     * Padding string with specific character
     *
     * @param {string} str: The string to be padded
     * @param {number} offset: how many characters needed to pad
     * @param {string} pos: The padding position (can either be "left" or "right")
     * @param {string} char: The character to pad
     * @return {string} The resulting string
     */
    function padding(str, offset, pos, char) {
        let padding = "";
        while (offset) {
            padding = padding + char;
            offset--;
        }
        if (pos === "left") {
            return (padding + str);
        }
        return (str + padding)
    }
    /** 
     * Calculate the sum of two binaries (one is positive, the other is negative represented as 2's complement)
     *
     * @param {string} a: The binary to be added
     * @param {string} b: The binary to be added
     * @param {number} pos: The position of negative addend (1: a, 2: b)
     * @return {string} The resulting binary
     */
    function binAdder2sComp(a, b, pos) {
        let offset = 0;
        if (pos === 1) {
            offset = b.length - a.length;
            if (offset > 0) {
                return binAdder(padding(a, offset, "left", "1"), b);
            }
        } else {
            offset = a.length - b.length;
            if (offset > 0) {
                return binAdder(a, padding(b, offset, "left", "1"));
            }
        }
        return binAdder(a, b);
    }
    /** 
     * Calculate 2's complement of a binary
     *
     * @param {string} a: The binary to be calculated
     * @return {string} The 2's complement of input binary
     */
    function twosComplement(a) {
        a = a.split("");
        for (let i = 0; i < a.length; i++) {
            if (a[i] === "1") {
                a[i] = "0";
            } else {
                a[i] = "1";
            }
        }
        return binAdder(a.join(""), "1");
    }
    /** 
     * Handle the overflow after the summation of 2's complement binaries
     *
     * @param {string} addend1: The addend of summation
     * @param {string} addend2: The addend of summation
     * @param {string} sum: The result of summation
     * @return {number} Resulting decimal number
     */
    function handleOverflow(addend1, addend2, sum) {
        let maxlength = addend1.length > addend2.length ? addend1.length : addend2.length;
        // Drop carry 
        if (sum.length > maxlength) {
            return parseInt(sum.slice(1), 2);
        } else {
            return -parseInt(twosComplement(sum), 2);
        }
    }
    /* Main */
    num1 = parseInt(num1, 10); num2 = parseInt(num2, 10);
    if (num1 >= 0 && num2 >= 0) {
        return parseInt(binAdder(num1.toString(2), num2.toString(2)), 2);
    } else if (num1 <= 0 && num2 <= 0) {
        num1 = -num1;
        num2 = -num2;
        return -parseInt(binAdder(num1.toString(2), num2.toString(2)), 2);
    } else {
        if (num1 < 0) {
            num1 = -num1;
            let tmpSum = binAdder2sComp(twosComplement(num1.toString(2)), num2.toString(2), 1);
            return handleOverflow(num1.toString(2), num2.toString(2), tmpSum);
        }
        if (num2 < 0) {
            num2 = -num2;
            let tmpSum = binAdder2sComp(num1.toString(2), twosComplement(num2.toString(2)), 2);
            return handleOverflow(num1.toString(2), num2.toString(2), tmpSum);
        }
    }
};