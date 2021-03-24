import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import leaflet from 'leaflet';
import {MapType, MarkerType, NOT_INITIALIZED} from '../../utils/constants';

import "leaflet/dist/leaflet.css";

const createMarkers = (map, hotels, highlightHotel) => {
  const markers = [];
  let prevId = NOT_INITIALIZED;

  const pin = leaflet.icon(MarkerType.pin);
  const pinActive = leaflet.icon(MarkerType.pinActive);
  const pinHotelHighlighted = leaflet.icon(MarkerType.pinHotelHighlighted);

  hotels.forEach(({id, latitude, longitude, title}) => {
    markers[id] = leaflet.marker({lat: latitude, lng: longitude}, {icon: id !== highlightHotel ? pin : pinHotelHighlighted})
      .addTo(map)
      .bindPopup(title);

    markers[id].on(`click`, () => {
      if (prevId !== -1) {
        markers[prevId].setIcon(pin);
      }

      prevId = id;
      markers[id].setIcon(pinActive);
    });
  });
};

const removeMarkers = (map) => {
  map.eachLayer((layer) => {
    if (layer instanceof leaflet.Marker) {
      layer.remove();
    }
  });
};

const Map = ({mapType}) => {
  const {highlightHotelID, hotels, activeHotel, nearbyHotels, activeCity: city} = useSelector((state) => state.USER);

  const prepareHotels = mapType === MapType.MAIN_MAP ? hotels : [activeHotel, ...nearbyHotels.slice(0, 3)];
  const highlightHotel = mapType === MapType.MAIN_MAP ? highlightHotelID : activeHotel.id;
  const mapRef = useRef();

  useEffect(() => {
    const {lat, lng, zoom} = city;
    mapRef.current = leaflet.map(`map`, {
      center: {lat, lng},
      zoom,
      zoomControl: false,
      marker: true,
    });

    mapRef.current.setView({lat, lng}, zoom);

    leaflet.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(mapRef.current);

    createMarkers(mapRef.current, prepareHotels, highlightHotel);

    return () => {
      mapRef.current.remove();
    };
  }, [city]);

  useEffect(() => {
    removeMarkers(mapRef.current);

    createMarkers(mapRef.current, prepareHotels, highlightHotel);
  }, [highlightHotel]);

  return (
    <div className="cities__right-section">
      <section className={`${mapType} map`} id="map" />
    </div>
  );
};

Map.propTypes = {
  mapType: PropTypes.string.isRequired,
};

export default Map;

// city - город, на котором карта изначально сфокусирована
// leaflet.marker.addTo - устанавливает маркер и привязывает к карте
// .bindPopup - в него можно передать html разметку как строку и добавить .openPopup для открытия
// для того, чтобы вывести координаты клика, нужно описать функцию mapRef.current.on, затем вытянуть evt.latlng.lat и evt.latlng.lng
