/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'bootstrap';
import './scss/style.scss';
import Render from './render';
import CountryList from './countryList';

const countryList = new CountryList();
const navbar = new Render(countryList);
