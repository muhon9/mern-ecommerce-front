import Typewriter from 'typewriter-effect';
 

const Jumbotron = () => {

  return ( 
    <div className="h1 font-weight-bold text-danger">
      <Typewriter
        options={{
        strings: ['Latest Products', 'Best Seller', 'New Comming'],
        autoStart: true,
        loop: true,
      }}
     />
    </div>

   );
}
 
export default Jumbotron;

