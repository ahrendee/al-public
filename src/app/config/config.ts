import { environment } from '../../environments/environment';

export const LocationUrls = {
  apiUrl: environment.apiUrl
};

export const RestApiUrl = {
  authenticate: 'authenticate',
  gigs: 'gigs',
  contact: 'contact',
  mailingList: 'mailinglist',
  orders: 'orders',
  menuItems: 'assets/api/menu-items.json',
  carousel: 'assets/api/carousel.json',
  articles: 'assets/api/articles.json',
  shippingAreas: 'assets/api/shipping-areas.json',
  countries_eu: 'https://restcountries.eu/rest/v2/regionalbloc/eu',
  countries_all: 'https://restcountries.eu/rest/v2/all',
  blogger: {
    posts: 'https://www.googleapis.com/blogger/v3/blogs/8241946593981908305/posts?key='
  }
};

export const PayPal = {
  clientId: environment.paypalClientId,
  currency: {
    EUR: 'EUR'
  }
};

export const Blogger = {
  apiKey: 'thisisnotanactualbloggerapikey'
}

export enum Stores {
  counter = 'counter'
}
