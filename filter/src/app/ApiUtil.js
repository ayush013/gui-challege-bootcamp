const API = "https://picsum.photos/v2/list";

export const MOCK_CATEGORIES = ["fashion", "games", "programming", "fitness"];

const getRandomCategory = () =>
  parseInt(Math.random() * MOCK_CATEGORIES.length);

export default class ApiUtil {
  static getData = () =>
    fetch(API)
      .then((r) => r.json())
      .then((list) => {
        return list.map(({ download_url, author }) => ({
          download_url,
          author,
          category: MOCK_CATEGORIES[getRandomCategory()],
        }));
      });
}
