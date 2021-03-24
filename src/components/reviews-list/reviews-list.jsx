import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {reviewStructure} from '../../utils/types';
import {RATING_MULTIPLIER} from '../../utils/constants';

const ReviewsList = ({comments}) => {
  const prepareComments = comments.slice(0, 10).sort((a, b) => dayjs(b.date) - dayjs(a.date));

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {
          prepareComments.map(({id, visitorAvatar, visitorName, rating, quote, date}) => {
            const styleRating = {width: `${Number(rating) * RATING_MULTIPLIER}%`};

            return (
              <li key={id} className="reviews__item">
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img className="reviews__avatar user__avatar" src={visitorAvatar} width="54" height="54" alt="Reviews avatar" />
                  </div>
                  <span className="reviews__user-name">
                    {visitorName}
                  </span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={styleRating} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">
                    {quote}
                  </p>
                  <time className="reviews__time" dateTime={dayjs(date).format(`YYYY-MM-DD`)}>{dayjs(date).format(`MMMM YYYY`)}</time>
                </div>
              </li>
            );
          })
        }
      </ul>
    </React.Fragment>
  );
};

ReviewsList.propTypes = {
  comments: PropTypes.arrayOf(reviewStructure).isRequired,
};

export default React.memo(ReviewsList, (prevProps, nextProps) => {
  return prevProps.comments === nextProps.comments;
});

// React.memo - Функция сравнения должна вернуть булево значение:
// true в случае, когда nextProps равны prevProps и, следовательно, нет смысла рендерить компонент заново
// false - когда значения изменились и, следовательно, необходимо перерендерить компонент
// К React.memo следует прибегать, когда компонент часто перерисовывается, при этом значения пропсов не изменяются.
// Такая ситуация как правило возникает из-за перерисовки родительского компонента
