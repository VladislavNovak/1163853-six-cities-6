export const rawHotel = {
  "city": {
    "name": `Paris`,
    "location": {
      "latitude": 48.85661,
      "longitude": 2.351499,
      "zoom": 13
    }
  },
  "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
  "images": [`https://assets.htmlacademy.ru/intensives/javascript-3/hotel/7.jpg`],
  "title": `The house among olive`,
  "is_favorite": false,
  "is_premium": true,
  "rating": 3,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 1,
  "price": 169,
  "goods": [`Breakfast`],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `Relax, rejuvenate`,
  "location": {
    "latitude": 48.83861,
    "longitude": 2.350499,
    "zoom": 16
  },
  "id": 1
};

export const rawComment = ({
  "id": 1,
  "user": {
    "id": 11,
    "is_pro": false,
    "name": `Jack`,
    "avatar_url": `https://assets.htmlacademy.ru`
  },
  "rating": 3,
  "comment": `Beautiful space, fantastic location and`,
  "date": `2021-02-10T08:04:28.647Z`
});

export const rawUserInfo = ({
  userEmail: `email`,
  userAvatar: `avatar_url`,
});

export const rawHotels = [rawHotel];
export const rawComments = [rawComment];
