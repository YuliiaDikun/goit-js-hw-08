// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('div.gallery');

function createGallery(images) {
  return images
    .map(({ original, preview, description }) => {
      return `
      <div class="gallery">
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </div>`;
    })
    .join('');
}

const imageMarkup = createGallery(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', imageMarkup);

const lightbox = new SimpleLightbox('div.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
