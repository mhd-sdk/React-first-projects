import AnimatedPage from "../components/AnimatedPage";
import React from "react";
import "./pageStyles/Project1.css";
import { Calculator } from './../components/Calculator/Calculator';


class Project2 extends React.Component {
  
  render() {
    
    return (
    <AnimatedPage>
    <div className="calculator">
      <Calculator/>
    </div>
    </AnimatedPage>

    
    )
  }
} 


export default Project2;
