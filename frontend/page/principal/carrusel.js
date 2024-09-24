    document.addEventListener('DOMContentLoaded', () => {
        const interval = 1500; // Intervalo de tiempo entre cambios de imagen (en milisegundos)
        const images = [
            '../../asset/burga/feroz_1.png',
            '../../asset/burga/feroz_2.png',
            '../../asset/burga/feroz_3.png',
            // Añade más rutas de imágenes aquí si es necesario
        ];
        const imgElements = document.querySelectorAll('.img-ham1');

        function getRandomDistinctImages() {
            let firstIndex = Math.floor(Math.random() * images.length);
            let secondIndex = Math.floor(Math.random() * images.length);

            while (secondIndex === firstIndex) {
                secondIndex = Math.floor(Math.random() * images.length);
            }

            return [images[firstIndex], images[secondIndex]];
        }

        function changeImage() {
            const [newImage1, newImage2, newImage3] = getRandomDistinctImages();
            imgElements[0].src = newImage1;
            imgElements[1].src = newImage2;
        }

        // Cambia la imagen cada intervalo de tiempo
        setInterval(changeImage, interval);
    });
