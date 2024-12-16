// slider.data.js
export function generateRandomImages(num: number) {
    const images = [];
    for (let i = 0; i < num; i++) {
        images.push({
            id: i,
            href: `https://picsum.photos/300/200`,  // Imagen aleatoria
            alt: `Random Image ${i}`,
        });
    }
    return images;
}
