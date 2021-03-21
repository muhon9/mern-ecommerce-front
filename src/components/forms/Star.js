import React from 'react';
import StarRatings from 'react-star-ratings';

const Star = ({starClick, numberOfStars}) => {
  return (
    <div>
      <StarRatings 
        starRatedColor="red"
        starDimension="20px"
        starSpacing="2px"
        starEmptyColor="red"
        starHoverColor="red"
        changeRating={()=>starClick(numberOfStars)}
        numberOfStars={numberOfStars}
      />
    </div>
  );
}

export default Star;
