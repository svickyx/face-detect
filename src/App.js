import React, { Component } from 'react';
import Clarifai from 'clarifai';

import {GlobalStyle} from './global-style';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/navigation';
import SignIn from './components/sign-in/sign-in';
import Register from './components/register/register';
import LogoBar from './components/logo/logo';
import Rank from './components/rank/rank';
import ImageLinkForm from './components/image-link-form/image-link-form';
import FaceRecogination from './components/face-recogination/face-recogination';

const ParticleProperty = {
  "particles": {
      "number": {
          "value": 160,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 4,
              "size_min": 0.3
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "bubble"
          },
          "onclick": {
              "enable": true,
              "mode": "repulse"
          }
      },
      "modes": {
          "bubble": {
              "distance": 250,
              "duration": 2,
              "size": 0,
              "opacity": 0
          },
          "repulse": {
              "distance": 400,
              "duration": 4
          }
      }
  }
};

const app = new Clarifai.App({
  apiKey: '6a9c3f3ba00e451d80fb8017ea2a3d27'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  //1) add another state: route, default setting is 'signin' page

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }
  // // FRONT-END + BACK-END
  // //this componentdidmount is for checking if the front-end and back-end can connect, once we test it it worked, it can be replaced, go to sign-in component for the following steps

  
  // Register User information update
  // 1. create a new state - user (including all the information that need)
  // 2. create a function to be able to use in register.js, change the user state with setState
  // 3. pass loadUser function to <Register />

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    const {right_col, left_col, top_row, bottom_row} = clarifaiFace
    return {
      facewidth: (right_col - left_col) * width,
      faceheight: (bottom_row - top_row) * height,
      left: width * left_col,
      top: height * top_row
    }
  }

  //2. in this function, we use the response as data and clarifaiFace is the details info about the response
  //3. then we did some DOM manipulation by using document.getElementById to get the width and height of the image according to the imageUrl in the input
  //4. then we will return an object: facewidth is the width of the bounding box, faceheight is the height of the bounding box, left is where the left point begin, and top is where the top point begin
  

  faceContainer = (box) => {
    this.setState({box: box})
    console.log(box);
  };
  //5. after we get the four location, we will show the face container by changing the box state

  onInputChange = (event)=> {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = ()=> {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then( response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.faceContainer(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  };
  //1. in predict(we get the response of the face, and use the response on the created function- calculateFaceLocation)
  //6. we can wrap the two function like above to achive what we want. so the logic will be: we use Clarifai.predict to get the response, and use the response on fucntion calculateFaceLocation to calculate the four location, and use it as a new parameter: box to change the state of box and show the face container
  // Update Entries Count Project:
  // 1. after we use Clarifai get the resonse, we will use the response to fetch to backend and detect the face
  // 2. add if statement, if we get the response, we will fetch to localhost:3000/image
  // 3. after server.js check the id, front will get user.entries as response, so we name the resonse as count and setState to update user.entries
  // ** Object.assign is a way to achieve change only the two thing(user, and entries) we want to change

  onRouteChange = (route)=> {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  //warning: (route) is correct, ({route}) is wrong!!!!

  render(){
    const {imageUrl, box, route, isSignedIn} = this.state;
    return (
      <div>
        <GlobalStyle />
        <Particles className='particles'
          params={ParticleProperty} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ? 
        <div>
          <LogoBar />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}
          />
          <FaceRecogination box={box} imageUrl={imageUrl}/> 
        </div>
        : ( route === 'signin' 
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) 
        }
      </div>
    );
  }
}

  //7. then put the box parameter in the FaceRecogination component
  //2) use conditional ? : define the route, when route is in signin, just show SignIn component, otherwise, show 'home'
  //3) on SignIn component, when click signin button, onRouteChange function working, and state change to 'home'
  //4) on Navigation component, when click signout link, onRouteChange function working, and state change to 'signin'

export default App;
