const avg = (...nums) => Math.floor(nums.reduce((sum, num) => sum + num) / nums.length);

const costToLevel = level => Math.pow(level, 2) / 2;

const weirdAvg = (...nums) => {
    // Calculate arithmetic mean
    const mean = avg(...nums);

    // Calculate standard deviation
    const sumSqrDiff = nums.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
    const variance = sumSqrDiff / mean;
    const stdDev = Math.sqrt(variance);

    // Associate to each value a weight proportional to how many standard deviations away from the mean the value is
    const weights = nums.map(num => {
        let devs = ( num - mean ) / stdDev;
        let weight;

        if ( devs < 0 ) {
            devs = Math.ceil( devs );
        } else if ( devs > 0 ) {
            devs = Math.floor( devs );
        }

        switch ( Math.abs( devs ) ) {
            case 0:
                weight = 1;
                break;
            case 1:
                weight = 2;
                break;
            case 2:
                weight = 5;
                break;
            case 3:
                weight = 10;
                break;
            default:
                weight = 50;
        }

        return { num, weight }
    });

    // Compute the weighted arithmetic mean
    return Math.floor(weights.reduce((acc, curr) => acc + curr.num * curr.weight, 0) / weights.reduce((sum, weight) => sum + weight.weight, 0));
};

module.exports = {
    avg, weirdAvg, costToLevel
};