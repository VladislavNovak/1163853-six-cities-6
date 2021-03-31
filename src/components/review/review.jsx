import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {AuthorizationStatus, LoadingStatus} from '../../utils/constants';
import {reviewStructure} from '../../utils/types';
import {setCommentLoadingStatus} from '../../store/action';

import {ReviewsList, ReviewForm} from '..';

const Review = ({comments, onSubmitSendComment}) => {
  const [selectedStars, setSelectedStars] = useState(`0`);
  const [tale, setTale] = useState(``);

  const {authorizationStatus} = useSelector((state) => state.AUTH);
  const {commentLoadingStatus} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const handleRadioChange = ({target}) => {
    setSelectedStars(target.value);
  };

  const handleTextareaChange = ({target}) => {
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
    if (commentLoadingStatus === LoadingStatus.RECEIVED) {
      setTale(``);
      setSelectedStars(`0`);
      dispatch(setCommentLoadingStatus(LoadingStatus.DEFAULT));
    }

    if (commentLoadingStatus === LoadingStatus.ERROR) {
      setTale(``);
      setSelectedStars(`0`);
    }

  }, [commentLoadingStatus]);

  return (
    <section className="property__reviews reviews">
      <ReviewsList comments={comments} />
      {authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm
        handleSubmit={handleSubmit}
        handleRadioChange={handleRadioChange}
        selectedStars={selectedStars}
        onChangeTextarea={handleTextareaChange}
        commentLoadingStatus={commentLoadingStatus}
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
