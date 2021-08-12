function fetchImages(searchName, pageNumber) {
  const key = "21756599-0afd71203aca16b66ad6b1f5f";

  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${pageNumber}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There is no images with name ${searchName}`)
    );
  });
}
const api = { fetchImages };
export default api;
