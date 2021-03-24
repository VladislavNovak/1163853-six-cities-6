import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {AuthorizationStatus, LoadingStatus} from '../../utils/constants';
import {reviewStructure} from '../../utils/types';
import {setLastCommentLoadingStatus} from '../../store/action';

import {ReviewsList, ReviewForm} from '..';

const Review = ({
  comments,
  onSubmitSendComment,
}) => {
  const [selectedStars, setSelectedStars] = useState(`0`);
  const [tale, setTale] = useState(``);

  const {authorizationStatus} = useSelector((state) => state.AUTH);
  const {lastCommentLoadingStatus} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const handleChangeRadio = ({target}) => {
    dispatch(setLastCommentLoadingStatus(LoadingStatus.DEFAULT));
    setSelectedStars(target.value);
  };

  const handleChangeTextarea = ({target}) => {
    dispatch(setLastCommentLoadingStatus(LoadingStatus.DEFAULT));
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
      dispatch(setLastCommentLoadingStatus(LoadingStatus.DEFAULT));
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
});

export default Review;
