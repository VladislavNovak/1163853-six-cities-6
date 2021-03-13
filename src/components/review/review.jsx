import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus, FIVE_STARS, LoadingStatus, RATING_MULTIPLIER, ReviewLength} from '../../utils/constants';
import {reviewStructure} from '../../utils/types';
import {ActionCreator} from '../../store/action';
import {Textarea} from './review-stile';

const Review = ({
  comments,
  onSubmitSendComment,
  lastCommentLoadingStatus,
  changeLastCommentLoadingStatus,
  authorizationStatus,
}) => {
  const [selectedStars, setSelectedStars] = React.useState(0);
  const [tale, setTale] = React.useState(``);

  const handleChangeRadio = ({target}) => {
    changeLastCommentLoadingStatus(LoadingStatus.DEFAULT);
    setSelectedStars(target.value);
  };

  const handleChangeTextarea = ({target}) => {
    changeLastCommentLoadingStatus(LoadingStatus.DEFAULT);
    setTale(target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitSendComment({
      comment: tale,
      rating: Number(selectedStars),
    });
  };

  useEffect(() => {
    if (lastCommentLoadingStatus === LoadingStatus.RECEIVED) {
      setTale(``);
      setSelectedStars(0);
      changeLastCommentLoadingStatus(LoadingStatus.DEFAULT);
    }

    if (lastCommentLoadingStatus === LoadingStatus.ERROR) {
      setTale(``);
      setSelectedStars(0);
    }

  }, [lastCommentLoadingStatus]);

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
      {
        authorizationStatus === AuthorizationStatus.AUTH && (<form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
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
        </form>)
      }
    </section>
  );
};

Review.propTypes = ({
  comments: PropTypes.arrayOf(reviewStructure).isRequired,
  onSubmitSendComment: PropTypes.func.isRequired,
  changeLastCommentLoadingStatus: PropTypes.func.isRequired,
  lastCommentLoadingStatus: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
});

const mapStateToProps = ({lastCommentLoadingStatus, authorizationStatus}) => ({lastCommentLoadingStatus, authorizationStatus});

const mapDispatchToProps = (dispatch) => ({
  changeLastCommentLoadingStatus(status) {
    dispatch(ActionCreator.setLastCommentLoadingStatus(status));
  }
});

export {Review};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
