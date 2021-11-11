// countZeroes
// Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

// Constraints:

// Time Complexity: O(log N)

// Examples:

countZeroes([1, 1, 1, 1, 0, 0]) // 2
countZeroes([1, 0, 0, 0, 0]) // 4
countZeroes([0, 0, 0]) // 3
countZeroes([1, 1, 1, 1]) // 0
countZeroes([1, 1, 1, 0, 0, 0]) // 3
countZeroes([1, 1, 1, 1, 0, 0, 0]) // 3

const arr = [1, 1, 1, 1, 0, 0];

function countZeroes(sortedArr) {

    let leftIdx = 0;
    let rightIdx = sortedArr.length - 1;

    while (leftIdx <= rightIdx) {
        const midIdx = Math.floor((rightIdx + leftIdx) / 2)
        const midValue = sortedArr[midIdx]

        if (midValue === 1) {
            leftIdx = midIdx + 1;
            if (sortedArr[leftIdx] === 0) {
                return sortedArr.length - leftIdx
            } else if (leftIdx === sortedArr.length - 1) {
                return 0
            }
        }
        else if (midValue === 0) {
            rightIdx = midIdx - 1;
            if (sortedArr[rightIdx] === 1) {
                return sortedArr.length - (rightIdx + 1)
            } else if (rightIdx === 0) {
                return sortedArr.length
            }
        }
    }
}

sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2) // 4 -> right 4 should be 5
sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3) // 1 
sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1) // 2
sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4) // -1

function sortedFrequency(sortedArr, target) {
    let leftIdx = 0
    let rightIdx = sortedArr.length - 1;
    const leftmostOccurance = findLeftmost(sortedArr, target, leftIdx, rightIdx)
    if (leftmostOccurance === -1) return -1
    const rightmostOccurance = findRightmost(sortedArr, target, leftIdx, rightIdx)
    return rightmostOccurance - leftmostOccurance + 1
}

function findLeftmost(sortedArr, target, leftIdx, rightIdx) {
    while (leftIdx <= rightIdx) {
        const midIdx = Math.floor((leftIdx + rightIdx) / 2)
        const midValue = sortedArr[midIdx]

        // want leftmost
        if (midValue >= target) {
            rightIdx = midIdx - 1
            // check step-over
            if (sortedArr[rightIdx + 1] === target && sortedArr[rightIdx] < target) return rightIdx + 1
            // find left-bound
            if ((sortedArr[rightIdx - 1] < target || rightIdx === 0) && sortedArr[rightIdx] === target) {
                return rightIdx
            }
        }

        else if (midValue < target) {
            leftIdx = midIdx + 1
            if (sortedArr[leftIdx] === target) {
                return leftIdx
            }
        }
    }
    // if no leftmost outer func needs to return -1
    return -1
}

function findRightmost(sortedArr, target, leftIdx, rightIdx) {
    while (leftIdx <= rightIdx) {
        const midIdx = Math.floor((leftIdx + rightIdx) / 2)
        const midValue = sortedArr[midIdx]

        if (midValue > target) {
            rightIdx = midIdx - 1
            if (rightIdx === target) return rightIdx
        }

        else if (midValue <= target) {
            leftIdx = midIdx + 1
            // check step-over
            if (sortedArr[leftIdx - 1] === target && sortedArr[leftIdx] > target) return leftIdx - 1
            // find right-bound
            if ((sortedArr[leftIdx + 1] > target || leftIdx === sortedArr.length - 1) && sortedArr[leftIdx] === target) {
                return leftIdx
            }
        }
    }
}

// console.log(findRotatedIndex([3, 4, 1, 2], 4)) // 1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)) // 2
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)) // 6
// console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)) // -1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)) // -1
// console.log(findRotatedIndex([1, 2, 3, 4, 5, 6, 7, 8], 7)) // 6

function findRotatedIndex(arr, target) {
    const rotationPoint = findRotationPoint(arr)

    // If no rotation look in whole array
    if (rotationPoint === -1) return findTarget(arr, target)

    // Slice array 
    const leftArr = arr.slice(0, rotationPoint + 1)
    const rightArr = arr.slice(rotationPoint + 1)

    // Look in left array
    let targetIdx = findTarget(leftArr, target)
    if (targetIdx !== -1) return targetIdx

    // Look in right array
    targetIdx = findTarget(rightArr, target)
    if (targetIdx !== -1) return targetIdx + leftArr.length

    return -1
}

function findRotationPoint(arr, low = 0, high = arr.length - 1) {
    if (high >= low) {
        const mid = Math.floor((low + high) / 2)

        if (arr[mid - 1] > arr[mid]) {
            return mid - 1;
        }
        else if (arr[mid] > arr[mid + 1]) {
            return mid
        }
        //If last num < mid, move right b/c rotation point is to your right
        else if (arr[high] < arr[mid]) {
            return findRotationPoint(arr, mid + 1, high)
        }
        //If last num > mid, move left b/c rotation point is to left or doesn't exist
        else if (arr[high] > arr[mid]) {
            return findRotationPoint(arr, low, mid - 1)
        }
    }
    // -1 means no rotation
    return -1
}

function findTarget(arr, target, low = 0, high = arr.length - 1) {
    if (high >= low) {
        const mid = Math.floor((low + high) / 2)

        if (arr[mid] === target) return mid
        if (arr[mid - 1] === target) return mid - 1
        if (arr[mid + 1] === target) return mid + 1
        if (arr[mid] < target) return findTarget(arr, target, mid + 1, high)
        if (arr[mid] > target) return findTarget(arr, target, low, mid - 1)
    }
    return -1
}

function findRotationCount(arr) {
    const rotationPoint = findRotationPoint(arr)
    // If no rotation return 0
    if (rotationPoint === -1) return 0
    return rotationPoint + 1
}

// console.log(findRotationCount([15, 18, 2, 3, 6, 12])) // 2
// console.log(findRotationCount([7, 9, 11, 12, 5])) // 4
// console.log(findRotationCount([7, 9, 11, 12, 15])) // 0

// section through array moving towards first num that is larger
// or first num that is smaller. 

function findFloor(arr, num, low = 0, high = arr.length - 1) {
    if (arr[low] > num) return -1
    if (arr[high] < num) return arr[high]

    const mid = Math.floor((high + low) / 2)

    // check mid and 1 to left/right to avoid off-by-one
    if (arr[mid] <= num && arr[mid + 1] > num) return arr[mid]
    if (arr[mid - 1] <= num && arr[mid] > num) return arr[mid - 1]
    // Don't need to check for off-by-one to right b/c mid = Math.floor

    if (arr[mid] > num) {
        return findFloor(arr, num, low, mid - 1)
    }

    return findFloor(arr, num, mid + 1, high)
}

// findFloor([1,2,8,10,10,12,19], 9) // 8
// findFloor([1,2,8,10,10,12,19], 20) // 19
// findFloor([1,2,8,10,10,12,19], 0) // -1
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 9))
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 20))
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 0))





