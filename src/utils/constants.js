export const RATING_MULTIPLIER = 20;
export const NOT_INITIALIZED = -1;
export const FIVE_STARS = [`5`, `4`, `3`, `2`, `1`];
export const REGULAR_EMAIL_TEMPLATE = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export const KeyCode = {
  ESC: `ESC`,
};

export const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401
};

export const MapType = {
  MAIN_MAP: `cities__map`,
  OFFER_MAP: `property__map`,
};

export const RenderType = {
  FAVORITE_HOTELS: `favorite`,
  ALL_HOTELS: `usual`,
  NEAR_HOTELS: `near`,
  MAIN_LOGO: `header__logo-link--active`
};

export const WarningType = {
  INVALID_ADDRESS_BAR: `THE REQUESTED RESOURCE IS NOT FOUND`,
  INVALID_HOTEL_ID: `THIS HOTEL IS NOT EXIST. CHOOSE ANOTHER`,
  LOADING: `...LOADING...`,
};

export const JumpTo = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
};

export const ServerRequest = {
  HOTELS: `/hotels`,
  LOGIN: `/login`,
  COMMENTS: `/comments`,
  NEARBY: `/nearby`,
  FAVORITE: `/favorite`,
};

export const ReviewLength = {
  MIN: 49,
  MAX: 301
};

export const LoadingStatus = {
  DEFAULT: `DEFAULT`,
  SENT: `SENT`,
  RECEIVED: `RECEIVED`,
  ERROR: `ERROR`,
};

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

export const MarkerType = {
  pin: {
    iconUrl: `./img/pin.svg`,
    iconSize: [25, 35]
  },
  pinActive: {
    iconUrl: `./img/pin-active.svg`,
    iconSize: [35, 45]
  },
  pinHotelHighlighted: {
    iconUrl: `./img/pin-hotel-highlighted.svg`,
    iconSize: [25, 35]
  },
};

export const CitiesList = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};
