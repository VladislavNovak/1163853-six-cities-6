import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus, LoadingStatus} from '../../utils/constants';
import {reviewStructure} from '../../utils/types';
import {setLastCommentLoadingStatus} from '../../store/action';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {getLastCommentLoadingStatus} from '../../store/user-reducer/selectors';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';

const Review = ({
  comments,
  onSubmitSendComment,
  lastCommentLoadingStatus,
  changeLastCommentLoadingStatus,
  authorizationStatus,
}) => {
  const [selectedStars, setSelectedStars] = React.useState(`0`);
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
      setSelectedStars(`0`);
      changeLastCommentLoadingStatus(LoadingStatus.DEFAULT);
    }

    if (lastCommentLoadingStatus === LoadingStatus.ERROR) {
      setTale(``);
      setSelectedStars(`0`);
    }

  }, [lastCommentLoadingStatus]);

  return (
    <section className="property__reviews reviews">
      <ReviewsList comments={comments} />
      {authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm
        handleSubmit={handleSubmit}
        handleChangeRadio={handleChangeRadio}
        selectedStars={selectedStars}
        handleChangeTextarea={handleChangeTextarea}
        lastCommentLoadingStatus={lastCommentLoadingStatus}
        tale={tale} />
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  lastCommentLoadingStatus: getLastCommentLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeLastCommentLoadingStatus(status) {
    dispatch(setLastCommentLoadingStatus(status));
  }
});

export {Review};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
