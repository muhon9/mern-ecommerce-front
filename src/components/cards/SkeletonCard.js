import { Skeleton, Card } from 'antd';

const SkeletonCard = ({count}) => {

  const card= () => {
    let cardArray = [];
    for(let i=0; i < count; i++){
      cardArray.push(
        <Card className="col-md-3 m-3"
        style={{width: 320, height: 320}}
        >
          <Skeleton active></Skeleton>
        </Card>
      )
    }

    return cardArray;
  }

  return ( 
    <div className="row justify-content-md-center"> { card() }</div>
   );
}
 
export default SkeletonCard;