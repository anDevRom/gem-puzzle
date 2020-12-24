export default function createMatrix(arr, arrLength) {
  arr = arr.slice();
  const result = [];
  for (let i = 0; i < arrLength; i++) {
    result.push(arr.splice(0, arrLength));
  }
  return result;
}
