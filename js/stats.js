// Inspiration for these functions taken from:
// https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript

// The "mean" is the "average" you're used to, where you add up all the numbers
export function mean(numbers) {
    if(!numbers.length) return 0;
    const sum = numbers.reduce(((a, b) => a + b), 0);
    return sum / numbers.length;
}
 
// The "median" is the "middle" value in the list of numbers.
export function median(numbers) {
    const { length } = numbers;
    if(!length) return 0;
    const isEven = length % 2 === 0;
    const sorted = numbers.slice().sort((a, b) => a - b);

    let median = 0;
    if(isEven) {
        // average of two middle numbers
        const middle = length / 2;
        median = mean([sorted[middle - 1], sorted[middle]]);
    } else {
        // middle number only
        median = sorted[(length - 1) / 2];
    }
 
    return median;
}