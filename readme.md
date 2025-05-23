# Image Similarity with pHash in JavaScript

This project demonstrates how to compute a [perceptual hash (pHash)](https://en.wikipedia.org/wiki/Perceptual_hashing) for images using JavaScript, and compare them using Hamming distance to determine visual similarity.

- Convert images to grayscale and apply 2D Discrete Cosine Transform (DCT)
- Extract the top-left 8×8 DCT block (low frequencies)
- Compute binary pHash via median thresholding (excluding DC coefficient)
- Compare two image hashes using Hamming distance
- Return similarity score as a percentage

## How It Works

1. **Resize** the image to 32×32 and convert to grayscale.
2. **Apply DCT** to get frequency components.
3. **Extract 8×8 block** of low-frequency DCT values.
4. **Exclude the DC coefficient** (average brightness).
5. **Threshold using the median** to generate a 64-bit hash.
6. **Compare hashes** using Hamming distance.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/prabeshpathak/ImageSimilarity.git
cd ImageSimilarity
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Usage

```bash
node main.js <path_to_first_image> <path_to_second_image>
```

# Reference

https://gist.github.com/augmt/efa871bbf2668dd4aa711ce2013f5046
https://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html
