import * as jimp from "jimp";

export const imageProcess = async (imageUrl: any, color: string | null, mode: string | null): Promise<Buffer | null> => {
    return await jimp
        .read(imageUrl)
        .then(async function (image) {
            const test = await jimp.read("img/green.png").then(function (test) {
                return test.resize(image.bitmap.width, image.bitmap.height);
            });
            image.composite(test, 0, 0);
            return await image.getBufferAsync(jimp.MIME_PNG);
        })
        .catch(function (err) {
            console.error(err);
            return null;
        });
};