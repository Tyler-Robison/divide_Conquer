function mySearch(sortedArr, target) {
    let leftIdx = 0
    let rightIdx = sortedArr.length - 1
    while (leftIdx <= rightIdx) {
        
        const midIdx = Math.floor((rightIdx + leftIdx)/2)

        if (sortedArr[midIdx] === target) return `Target is at idx ${midIdx}`

        if (target < sortedArr[midIdx]) {
            rightIdx = midIdx - 1
        } else if (target > sortedArr[midIdx]) {
            leftIdx = midIdx + 1
        }
    }
    return 'array does not contain that value'
}

const arr = [1, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const arr2 = [3, 5, 7, 9, 11]
