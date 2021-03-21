import React from 'react';
import StarRatings from 'react-star-ratings';

export const ratingFunction = (product) => {
  
  if(product.rating && product.rating.length >0){
    let ratingArray = product.rating;
  
    let starArray = [];
    var arrayLength = ratingArray.length;
    ratingArray.map((r)=>(
      starArray.push(r.star)
    ))
    var totalStar= 0;
    for(let i=0; i< starArray.length; i++){
      totalStar= totalStar+ starArray[i]
    }
    var rating= (totalStar/arrayLength);
    
  }

  return(
    <div className="pb-3 justify-content-md-center">
       
          <StarRatings 
            starDimension="20px"
            starSpacing="5px"
            rating={rating}
            starRatedColor="red"
            numberOfStars={5}
          /> 
       ({arrayLength})
        
    </div>
  )
}