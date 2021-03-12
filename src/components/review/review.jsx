import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {FIVE_STARS, RATING_MULTIPLIER, ReviewLength} from '../../utils/constants';
import {reviewStructure} from '../../utils/types';

const Review = ({comments}) => {
  const [selectedStars, setSelectedStars] = React.useState(0);
  const [tale, setTale] = React.useState(``);

  const handleChangeRadio = ({target}) => setSelectedStars(target.value);
  const handleChangeTextarea = ({target}) => setTale(target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const allowSendingForm = () => !(tale.length > ReviewLength.MIN && tale.length < ReviewLength.MAX && selectedStars);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {
          comments.map(({id, visitorAvatar, visitorName, rating, quote, date}) => {
            const styleRating = {width: `${rating * RATING_MULTIPLIER}%`};

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
      <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {FIVE_STARS.map((star) => (
            <React.Fragment key={star}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                onChange={handleChangeRadio}
                checked={selectedStars === star}
                value={star}
                id={`${star}-stars`}
                type="radio" />
              <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          onChange={handleChangeTextarea}
          value={tale}
          placeholder="Tell how was your stay, what you like and what can be improved" />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            disabled={allowSendingForm()}
            type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

Review.propTypes = ({
  comments: PropTypes.arrayOf(reviewStructure).isRequired,
});

export default Review;
