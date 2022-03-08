import { Component } from "react";
import { withRouter } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";


class Details extends Component{
    
    state={loading:true, showModal:false};
    
    async componentDidMount(){
        const res=await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        );
        const json=await res.json();
        this.setState(
            Object.assign(
                {
                loading:false,
                },
                json.pets[0]
            )
        );
    }

    toggleModal=()=> this.setState({showModal:!this.state.showModal})
    adopt=()=>(window.location="http//bit.ly/pet.adopt")

    render(){
        if(this.state.loading){
            return <h2>Loading...</h2>
        }
        const{animal, breed, city, state, description,name, images, showModal}= this.state;
        return (
            <div className="w-11/12 mx-auto">
                <Carousel images={images}/>
                <div className="w-8/12 mx-auto text-center">
                    <h1 className="text-3xl my-2 font-bold">{name}</h1>
                    <h2 className="font-light my-2">{`${animal} - ${breed} - ${city},${state}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme])=>(
                            <button className='p-2 hover:opacity-70 rounded-md font-bold'onClick={this.toggleModal}
                                style={{backgroundColor:theme}}>
                                Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>
                    <p className='my-10'>{description}</p>
                    {
                        showModal?(
                            <Modal>
                                <div>
                                    <h1 >Would you like to adopt {name}</h1>
                                    <div className="buttons">
                                            <button onClick={this.adopt}>Yes</button>
                                            <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

const DetailsWithRounter= withRouter(Details);

export default function DetailsWithErrorBoundary(){
    return(
        <ErrorBoundary>
            <DetailsWithRounter />
        </ErrorBoundary>
    )
};