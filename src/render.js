/* eslint-disable class-methods-use-this */
import create from './helper/create';
import fetchWeather from './fetchWeather';
import fetchNews from './fetchNews';
import Storage from './helper/storage';

export default class Render {
  constructor(CountryList) {
    this.type = Storage.localLoad('temp');
    if (this.type === null) this.type = 1;

    this.countryList = CountryList;
    this.renderList();
    this.renderTemp();

    document.getElementById('add-form').onsubmit = async (e) => {
      e.preventDefault();
      await this.createCountry(document.forms['add-form'][0].value, this.type);
      document.getElementById('add-form').reset();
      this.setActive(this.countryList.getLast());
      this.renderWeather(this.countryList.getLast());
    };

    document.getElementById('change-c').onclick = () => {
      this.type = 1;
      Storage.localSave('temp', this.type);
      this.renderTemp();
    };

    document.getElementById('change-f').onclick = () => {
      this.type = 2;
      Storage.localSave('temp', this.type);
      this.renderTemp();
    };
  }

  renderTemp() {
    if (this.type === 1) {
      document.getElementById('change-c').classList.add('btn-active');
      document.getElementById('change-f').classList.remove('btn-active');
    } else {
      document.getElementById('change-f').classList.add('btn-active');
      document.getElementById('change-c').classList.remove('btn-active');
    }
  }

  cleanActive(array = this.countryList.countries) {
    for (let i = 0; i < array.length; i += 1) {
      const currentElement = document.getElementById(`country-${i}-block`);
      currentElement.classList.remove('active-block');
    }
  }

  setActive(index) {
    document.getElementById(`country-${index}-block`).classList.add('active-block');
  }

  renderList(countryList = this.countryList) {
    const domList = document.getElementById('country-list');
    domList.innerHTML = '';
    for (let i = 0; i < countryList.countries.length; i += 1) {
      const countryBlock = create(domList, 'list-group-item', `country-${i}-block`);
      const countryItem = create(countryBlock, 'row');
      const countryLeft = create(countryItem, 'col-10', `country-${i}-left`);
      const countryRight = create(countryItem, 'col-2', `delete-${i}`);
      countryRight.innerHTML = '<i class="fas fa-times"></i>';
      countryLeft.innerHTML = countryList.countries[i][0].name;

      document.getElementById(`country-${i}-left`).onclick = () => {
        this.cleanActive();
        this.setActive(i);
        this.renderWeather(i);
      };

      document.getElementById(`delete-${i}`).onclick = () => {
        this.cleanActive();
        countryList.removeCountry(i);
        this.renderList();
        this.renderWeather(null);
        this.renderNews(null);
      };
    }
  }

  async renderWeather(index, weatherData = this.countryList.countries[index]) {
    const weatherShow = document.getElementById('weather-show');
    weatherShow.innerHTML = '';

    if (index !== null) {
      const weatherBlock = create(weatherShow, 'row');
      const weatherLeft = create(weatherBlock, 'col-8');
      const weatherName = create(weatherLeft, 'h2 wave-name');
      weatherName.innerHTML = weatherData[0].name;
      const weatherDescription = create(weatherLeft, 'wave-desc');
      weatherDescription.innerHTML = `${weatherData[0].weather[0].description} -
      ${weatherData[0].main.temp} ${weatherData[1] === 1 ? 'C&#176' : 'F&#176'}`;
      const weatherRight = create(weatherBlock, 'col-4');
      const weatherPic = create(weatherRight, 'mx-auto d-block', '', 'img');
      weatherPic.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}.png`);

      const data = await fetchNews(weatherData[0].name);
      this.renderNews(data);
    }
  }

  renderNews(newsData) {
    const newsShow = document.getElementById('news-show');
    newsShow.innerHTML = '';

    if (newsData !== null) {
      for (let i = 0; i < 5; i += 1) {
        const newsBlock = create(newsShow, 'my-3');
        const newsTitle = create(newsBlock, 'link', '', 'a');
        newsTitle.textContent = `${newsData.articles[i].title}`;
        newsTitle.setAttribute('href', `${newsData.articles[i].url}`);
        newsTitle.setAttribute('target', '_blank');
        const newsSource = create(newsBlock);
        const newsSourceName = create(newsSource, 'font-italic', '', 'small');
        newsSourceName.textContent = `(${newsData.articles[i].source.name})`;
        const newsDescription = create(newsBlock, 'small');
        newsDescription.textContent = `${newsData.articles[i].description}`;
      }
    }
  }

  async createCountry(country, unit = 1, countryList = this.countryList) {
    const data = await fetchWeather(country, unit);
    countryList.addCountry(data);
    this.renderList();

    document.getElementById('add-form').reset();
  }
}
