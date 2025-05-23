export function calculateHammingDistance(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return "Not Same Length";
  }

  let distance = 0;
  for (let i = 0; i < arr1.length - 1; i++) {
    if (arr1[i] !== arr2[i]) {
      distance++;
    }
  }
  return 100 - distance;
}
