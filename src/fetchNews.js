import keyNews from './helper/keyNews';

export default async function fetchNews(query) {
  try {
    const fetchString = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${keyNews()}`;
    const fetchData = await fetch(fetchString, { mode: 'cors' });
    const data = await fetchData.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return null;
  }
}
