import React from 'react';
import PropTypes from 'prop-types';
import {FIVE_STARS, LoadingStatus, ReviewLength} from '../../utils/constants';
import {Textarea} from './review-stile';

const ReviewForm = ({handleSubmit, handleChangeRadio, selectedStars, handleChangeTextarea, lastCommentLoadingStatus, tale}) => {
  const allowSendingForm = () => !(tale.length > ReviewLength.MIN && tale.length < ReviewLength.MAX && Number(selectedStars));

  return (
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
      <Textarea
        warningStyle={(lastCommentLoadingStatus === LoadingStatus.ERROR) && `5px solid #FF0000`}
        id="review"
        name="review"
        onChange={handleChangeTextarea}
        value={tale}
        placeholder={(lastCommentLoadingStatus === LoadingStatus.ERROR)
          ? `The comment cannot be posted to the server at this time. The data may be incorrect. Or try next time`
          : `Tell how was your stay, what you like and what can be improved`} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          disabled={allowSendingForm() || lastCommentLoadingStatus === LoadingStatus.SENT}
          type="submit">Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeRadio: PropTypes.func.isRequired,
  selectedStars: PropTypes.string.isRequired,
  handleChangeTextarea: PropTypes.func.isRequired,
  lastCommentLoadingStatus: PropTypes.string.isRequired,
  tale: PropTypes.string.isRequired,
};

export default ReviewForm;
