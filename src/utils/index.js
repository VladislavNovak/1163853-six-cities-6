import {SortType} from "./constants";

// Принимает массив отелей
// Возвращает объект с ключами из городов и значениями из массивов гостиниц
export const getFavoriteHotelsCollection = (hotels) => hotels.reduce((total, hotel) => {
  total[hotel.cityName] = total[hotel.cityName] || [];
  total[hotel.cityName].push(hotel);
  return total;
}, {});

// Получает перечень отелей и наименование города в виде строки
// Возвращает полные данные города, извлеченные из первого обнаруженного отеля
// Если отелей нет, скорее всего, данные с сервера не загружены, тогда возвращает наименование отеля с обнулёнными данными
export const getPlace = (hotels, selectedCityName) => {
  const finded = hotels.find((hotel) => hotel.cityName === selectedCityName);

  return (finded) ? {name: finded.cityName, lat: finded.cityLatitude, lng: finded.cityLongitude, zoom: finded.cityZoom} : {name: selectedCityName, lat: 0, lng: 0, zoom: 0};
};

export const getMatchingOffer = (hotels, {params}) => hotels.find(({id}) => id === params.id);

// Принимает два аргумента
// Возвращает объект с добавленными, в качестве полей, аргументами
export const extend = (expandable, ...payload) => Object.assign({}, expandable, ...payload);

// Принимает строку - имя выбранного фильма и массив отелей
// Возвращает, если выбран Дюссельдорф, пустой массив, или массив отелей соответствующий названию города
// XXX: Эмуляция отсутствия отелей в Дюссельдорфе. Впоследствии удалить.
export const getFilteredHotels = (activeCityName, hotels) => hotels.filter(({cityName}) => cityName === activeCityName);

// Принимает массив отелей и тип сортировки
// Возвращает сортированный массив
export const getSortedHotels = (hotels, sortType) => {
  const copyHotels = hotels.slice();

  return ({
    [SortType.POPULAR]: () => hotels,
    [SortType.PRICE_HIGH_TO_LOW]: () => copyHotels.sort((a, b) => b.price - a.price),
    [SortType.PRICE_LOW_TO_HIGH]: () => copyHotels.sort((a, b) => a.price - b.price),
    [SortType.TOP_RATED_FIRST]: () => copyHotels.sort((a, b) => Number(b.rating) - Number(a.rating)),
  }[sortType]());
};

// Принимает массив отелей и id запрашиваемого отеля
// Возвращает true, если запрашиваемый отель существует, и false - если отель существует
export const isHotelIDFound = (hotels, id) => {
  return hotels.findIndex((item) => item.id === id) >= 0;
};

// Получает массив отелей и отель с новыми данными
// Возвращает массив, в котором один из отелей обновлён
export const updatedHotelsList = (hotels, update) => {
  return hotels.map((hotel) => hotel.id === update.id ? update : hotel);
};
