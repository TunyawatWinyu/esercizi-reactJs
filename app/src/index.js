import React from "react";
import ReactDom from "react-dom/client";
import "./style.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro name="Tunyawat Winyu" />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {}

function Intro(props) {
  return (
    <>
      <h2>{props.name}</h2>
      <p>
        Full-stack developer. When not cooding or studing, I like to play
        videogames, to cook (and eat).
      </p>
    </>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="Javascrip" />
      <Skill skill="Html+Css" />
      <Skill skill="Php" />
      <Skill skill="Laravel" />
      <Skill skill="MySql" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill">
      <p>{props.skill}</p>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
