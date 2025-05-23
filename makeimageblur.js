import sharp from "sharp";

const path = process.argv[2];

sharp(path)
  .blur(99)
  .toFile(`./${path.split("/").pop().split(".")[0]}_blur.png`, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
