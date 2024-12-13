const API_URL = "http://localhost:5138";

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.statusText}`
    );
  }
  return response.json();
};

export const getUser = (id) =>
  fetchData(`${API_URL}/users?id=${id}`);

export const getNotes = (id, page, ITEMS_PER_PAGE) =>
  fetchData(
    `${API_URL}/notes?userId=${id}&_sort=${id},-createdAt&_page=${page}&_per_page=${ITEMS_PER_PAGE}`
  );

export const getNote = (id) =>
  fetchData(`${API_URL}/notes?id=${id}`);
