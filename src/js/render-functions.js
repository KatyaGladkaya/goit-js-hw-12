import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

export function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('gallery-item');

  card.innerHTML = `
    <a href="${image.largeImageURL}" target="_blank">
      <img src="${image.webformatURL}" alt="${image.tags}" />
    </a>
    <div class="info">
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
    </div>
  `;
  return card;
}

export function renderImages(images, galleryElement) {
  images.forEach(image => {
    const imageCard = createImageCard(image);
    galleryElement.appendChild(imageCard);
  });
}
