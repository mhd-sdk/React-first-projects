import AnimatedPage from "../components/AnimatedPage";
import React from "react";
import "./pageStyles/Home.css";
class Home extends React.Component {
  render() {
    return (
    <AnimatedPage>

      <div className="home">
      <div id="home-content">
        WELCOME TO MY FIRST <span id="react-text-style">REACT </span> <br/> PROJECT
      </div>
      <img alt="react-logo" id="react-logo" src="../../img/react-logo.png"/>

      </div>

    </AnimatedPage>
    
    )
  }
} 


export default Home;
