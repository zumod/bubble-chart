export function useGetRange(min, max, step) {
    //min and max for starting and ending, step for distance b/w markings 
    let count = new Array();
    for (let i = min; i <= max; ) {
        count.push(i);
        i += step;
    }
    return count;
}
