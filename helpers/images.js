import jimp from "jimp";

export const convertedImage = async (src, dest) => {
  jimp
    .read(src)
    .then((image) => {
      return image.resize(250, 250).write(dest);
    })
    .catch((err) => console.log(err.message));
};
