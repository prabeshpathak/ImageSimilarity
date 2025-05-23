import { generateHash } from "./generateHash.js";
import { calculateHammingDistance } from "./getHammingDistance.js";
const firstImage = process.argv[2];
const secondImage = process.argv[3];

const firstImageHash = await generateHash(firstImage);
const secondImageHash = await generateHash(secondImage);

const hammingDistance = calculateHammingDistance(
  firstImageHash,
  secondImageHash
);
console.log(hammingDistance);
