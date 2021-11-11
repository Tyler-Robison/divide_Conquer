// custom indexOf implementation
function indexOf(arr, val) {

  for (let i = 0; i < arr.length; i++) {
    // if you find the value, return the index
    if (arr[i] === val) return i;
  }

  // if you never find the value, return -1
  return -1;
}

indexOf([4, 8, 15, 16, 23, 42], 15); // 2
indexOf([4, 8, 15, 16, 23, 42], 42); // 5
indexOf([4, 8, 15, 16, 23, 42], 100); // -1

// binary search

// binarySearch implementation
// note: arr must be sorted!
function binarySearch(arr, val) {

  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // we found our value!
      return middleIdx;
    }
  }
  
  // left and right pointers crossed, val isn't in arr
  return -1;
}