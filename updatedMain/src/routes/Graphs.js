import Hero from "../components/Hero.js";
import React from 'react';
import GraphTypes from "../components/GraphTypes.js";



function Graphs() {

  return (
    <>
      <Hero
        name="hero"
        title="Graphs"
        desc="A easy platform to analyse and create graphs. Choose your Graph Types"
        url="/"
        next="hide"
      />
        <div>
            <GraphTypes/> 
        </div>
    </>
  );
}

export default Graphs;
