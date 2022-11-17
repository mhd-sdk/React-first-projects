import AnimatedPage from "../components/AnimatedPage";
import React from "react";
import "./pageStyles/Project1.css";
import TodoList from "../components/TodoList/TodoList";

class Project1 extends React.Component {
  
  render() {
    
    return (
    <AnimatedPage>
    <div className="todolist">
      <TodoList/>
    </div>
    </AnimatedPage>

    
    )
  }
} 


export default Project1;
