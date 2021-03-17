import React from 'react';
import PropTypes from 'prop-types';
import {setActiveCity} from '../../store/action';
import {connect} from 'react-redux';
import {cityStructure, hotelStructure} from '../../utils/types';
import {CitiesList, RenderType} from '../../utils/constants';
import {getFilteredHotels, getPlace} from '../../utils';

import {Places, NoPlaces, Header} from '..';

const ScreenMain = ({hotels, onClickHotel, activeCity, onClickTabLocation}) => {

  const hotelsFilteredByCity = getFilteredHotels(activeCity.name, hotels);

  return (
    <div className="page page--gray page--main">
      <Header classNameForLogoLink={RenderType.MAIN_LOGO} />
      <main className={`page__main page__main--index ${!hotelsFilteredByCity.length && `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                CitiesList.map((currentCityName) => (
                  <li key={currentCityName} className="locations__item">
                    <a
                      onClick={(evt) => {
                        evt.preventDefault();
                        onClickTabLocation(getPlace(hotels, currentCityName));
                      }}
                      className={`locations__item-link tabs__item ${(activeCity.name === currentCityName) && `tabs__item--active`}`}>
                      <span>{currentCityName}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
        {hotelsFilteredByCity.length ? <Places currentCity={activeCity} hotels={hotelsFilteredByCity} onClickHotel={onClickHotel} /> : <NoPlaces />}
      </main>
    </div>
  );
};

ScreenMain.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
  onClickHotel: PropTypes.func.isRequired,
  activeCity: PropTypes.shape(cityStructure).isRequired,
  onClickTabLocation: PropTypes.func.isRequired,
};

const mapStateToProps = ({activeCity}) => ({activeCity});

const mapDispatchToProps = (dispatch) => ({
  onClickTabLocation(newSelectedCity) {
    dispatch(setActiveCity(newSelectedCity));
  }
});

export {ScreenMain};
export default connect(mapStateToProps, mapDispatchToProps)(ScreenMain);
