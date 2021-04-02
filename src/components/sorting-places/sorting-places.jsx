import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {KeyCode, RenderType, SortType} from '../../utils/constants';
import {setActiveSort} from '../../store/action';
import {getFilteredHotels, getSortedHotels} from '../../utils';

import {HotelsList} from '..';

const SortingPlaces = () => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const sortRef = useRef();
  const dispatch = useDispatch();
  const {activeCity, hotels, activeSort} = useSelector((state) => state.USER);
  const hotelsFilteredByCity = getFilteredHotels(activeCity.name, hotels);
  const sortedHotels = getSortedHotels(hotelsFilteredByCity, activeSort);

  useEffect(() => {
    document.body.addEventListener(`click`, handleOutsideClick);
    document.body.addEventListener(`keydown`, handleOutsideEsc);

    return () => {
      document.body.removeEventListener(`click`, handleOutsideClick);
      document.body.removeEventListener(`keydown`, handleOutsideEsc);
    };
  }, []);

  const handleOutsideClick = (evt) => {
    const path = evt.path || (evt.composedPath && evt.composedPath());
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
      <b className="places__found">{`${hotelsFilteredByCity.length} places to stay in ${activeCity.name}`}</b>
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
        renderType={RenderType.ALL_HOTELS}/>
    </section>
  );
};

export default SortingPlaces;
