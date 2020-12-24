export default function getCoordinatesOfElement(matrix, element) {
  const result = {};
  matrix.forEach((item, index) => {
    if (item.includes(element)) {
      result.row = index + 1;
      result.column = item.indexOf(element) + 1;
    }
  });
  return result;
}
