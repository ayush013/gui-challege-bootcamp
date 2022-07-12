const API = "https://picsum.photos/v2/list";

export const MOCK_CATEGORIES = ["fashion", "games", "programming", "fitness"];

const getRandomCategory = () =>
  parseInt(Math.random() * MOCK_CATEGORIES.length);

export default class ApiUtil {
  static getData = () =>
    fetch(API)
      .then((r) => r.json())
      .then((list) => {
        return list.map(({ id, author }) => ({
          download_url: `https://picsum.photos/id/${id}/500/500`,
          id,
          author,
          category: MOCK_CATEGORIES[getRandomCategory()],
        }));
      });
}
