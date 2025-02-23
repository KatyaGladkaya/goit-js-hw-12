import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import { showToast, clearGallery, renderImages } from './js/render-functions';

let lightbox;
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function fetchAndRenderImages(query, page) {
  try {
    const { hits, totalHits: total } = await fetchImages(query, page);

    if (hits.length === 0) {
      showToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderImages(hits, gallery);
      const firstImageCard = gallery.querySelector('.gallery-item');
      if (firstImageCard) {
        const cardHeight = firstImageCard.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }

      loadMoreButton.style.display = 'block';
    }

    totalHits = total;
    if (currentPage * 40 >= totalHits) {
      loadMoreButton.style.display = 'none';
      showToast("We're sorry, but you've reached the end of search results.");
      endMessage.style.display = 'block';
    }
  } catch (error) {
    showToast('Failed to fetch images. Please try again later.');
  } finally {
    hideLoader();
  }
}

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    showToast('Please enter a search query.');
    return;
  }

  currentQuery = query;
  currentPage = 1;

  showLoader();
  clearGallery(gallery);

  endMessage.style.display = 'none';

  fetchAndRenderImages(query, currentPage);

  loadMoreButton.style.display = 'none';
});

loadMoreButton.addEventListener('click', function () {
  currentPage += 1;
  showLoader();

  fetchAndRenderImages(currentQuery, currentPage);
});
