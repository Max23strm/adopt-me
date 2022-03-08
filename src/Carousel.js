import { Component } from "react";

class Carousel extends Component{
    state={
        active:0,
    };

    static defaultProps = {
        images:['http://pets-images.dev-apis.com/pets/none.jpg']
    }

    render(){
        const {active}=this.state;
        const {images}=this.props;
        return(
            <div className="flex flex-col items-center justify-center">
                <img src={images[active]} className='w-2/6' alt="animal"/>
                <div className="carousel-smaller flex justify-center">
                    {images.map((photo,index)=>(
                        <img
                        key={photo} 
                        src={photo}
                        className={`w-20 mx-5 my-3 rounded-sm  ${index===active?"active":"noActive"}`}
                        alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }   
}

export default Carousel;