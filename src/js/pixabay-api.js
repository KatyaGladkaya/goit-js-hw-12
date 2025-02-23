import axios from 'axios';

export const fetchImages = async (searchQuery, page = 1) => {
  const API_KEY = '48887234-fe7a8c0ecfa7b9a43b5097f7a';
  const URL = `https://pixabay.com/api/`;

  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
