import Storage from './helper/storage';

export default class CountryList {
  constructor() {
    this.countries = Storage.localLoad('countryStorage', 'countries');
    if (this.countries === null) this.countries = [];
  }

  getLast(array = this.countries) { return array.length - 1; }

  addCountry(jsonData, array = this.countries, storage = 'countryStorage') {
    array.push(jsonData);
    Storage.localSave(storage, array);
  }

  removeCountry(index, array = this.countries, storage = 'countryStorage') {
    array.splice(index, 1);
    Storage.localSave(storage, array);
  }

  removeLast(array = this.countries) { this.removeCountry(array.length - 1); }
}
