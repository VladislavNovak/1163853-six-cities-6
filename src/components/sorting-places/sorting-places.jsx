import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {KeyCode, RenderType, SortType} from '../../utils/constants';
import {cityStructure, hotelStructure} from '../../utils/types';
import {setActiveSort} from '../../store/action';
import {getSortedHotels} from '../../utils';

import {HotelsList} from '..';

const SortingPlaces = ({currentCity, hotels, onClickHotel}) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const sortRef = useRef();
  const dispatch = useDispatch();
  const {activeSort} = useSelector((state) => state.USER);
  const sortedHotels = getSortedHotels(hotels, activeSort);

  useEffect(() => {
    document.body.addEventListener(`click`, handleOutsideClick);
    document.body.addEventListener(`keydown`, handleOutsideEsc);

    return () => {
      document.body.removeEventListener(`click`, handleOutsideClick);
      document.body.removeEventListener(`keydown`, handleOutsideEsc);
    };
  }, []);

  const handleOutsideClick = ({path}) => {
    if (!path.includes(sortRef.current)) {
      setIsOptionsOpen(false);
    }
  };

  const handleOutsideEsc = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      setIsOptionsOpen(false);
    }
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${hotels.length} places to stay in ${currentCity.name}`}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          onClick={() => {
            setIsOptionsOpen(true);
          }}
          className="places__sorting-type" tabIndex="0">
          {activeSort}
          <svg
            className="places__sorting-arrow"
            style={{transform: isOptionsOpen ? `rotate(180deg)` : `rotate(0deg)`}} width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul
          ref={sortRef}
          className={`places__options places__options--custom ${isOptionsOpen && `places__options--opened` || ``}`}>
          {
            Object.values(SortType).map((sort) => (
              <li
                key={sort}
                onClick={() => {
                  dispatch(setActiveSort(sort));
                  setIsOptionsOpen(false);
                }}
                className={`places__option ${activeSort}`}
                tabIndex="0">
                {sort}
              </li>
            ))
          }
        </ul>
      </form>
      <HotelsList
        hotels={sortedHotels}
        renderType={RenderType.ALL_HOTELS}
        onClickHotel={onClickHotel}/>
    </section>
  );
};

SortingPlaces.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
  onClickHotel: PropTypes.func.isRequired,
  currentCity: PropTypes.shape(cityStructure).isRequired,
};

export default SortingPlaces;
