import sharp from "sharp";
import dct from "dct2";

const GLOBAL_HEIGHT = 32;
const GLOBAL_WIDTH = 32;

const { DCT } = dct;

export const generateHash = async (path) => {
  const getGrayScaledResizedImage = async (path) => {
    const arrayGray = await sharp(path)
      .greyscale()
      .resize({ height: GLOBAL_HEIGHT, width: GLOBAL_WIDTH })
      .raw()
      .toBuffer();

    const twoDArray = [];

    for (let i = 0; i < GLOBAL_HEIGHT; i++) {
      const tempRow = [];
      for (let j = 0; j < GLOBAL_WIDTH; j++) {
        tempRow.push(arrayGray[i * GLOBAL_WIDTH + j]);
      }
      twoDArray.push(tempRow);
    }

    return twoDArray;
  };

  const arr = await getGrayScaledResizedImage(path);

  const dctTransformed = DCT(arr);

  function extract1DSubmatrix(matrix, startRow, startCol, numRows, numCols) {
    const submatrix = [];

    for (let i = 0; i < numRows; i++) {
      const row = matrix[startRow + i].slice(startCol, startCol + numCols);
      submatrix.push(row);
    }

    const flatSubmatrix = submatrix.flat();
    return flatSubmatrix;
  }
  const submatrix = extract1DSubmatrix(dctTransformed, 0, 0, 8, 8);

  function calculateMedian(array) {
    const withoutFirstElement = array.slice(1).sort((a, b) => a - b);
    const midValue = Math.floor(withoutFirstElement.length / 2);

    return withoutFirstElement.length % 2 === 0
      ? (withoutFirstElement[midValue - 1] + withoutFirstElement[midValue]) / 2
      : withoutFirstElement[midValue];
  }

  const median = calculateMedian(submatrix);
  const hashValue = submatrix.map((e) => (e < median ? 0 : 1));

  return hashValue;
};
