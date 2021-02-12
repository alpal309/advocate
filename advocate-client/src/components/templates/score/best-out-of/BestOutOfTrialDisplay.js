import React from "react";
import Strong from "components/atoms/Strong";
import TrialChart from "components/atoms/TrialChart";
import {GraphDataPoint} from "utils/models";

const BestOutOfTrialDisplay = ({tracking}) => {
  console.log(tracking)
  let correct = tracking?.best || 0;
  let incorrect = tracking.outOf - tracking.best;
  let correctPercentage = Math.floor(correct/tracking.outOf*100);
  let incorrectPercentage = 100 - correctPercentage;
  
  let dataPoints = [
    new GraphDataPoint( 0, correct, tracking.outOf, "Score"),
    new GraphDataPoint( 1, incorrect, tracking.outOf, "Out of", "#f44336")
  ];
  
  let test = [
    {
      label: "Score", y: correct
    },
    {
      label: "Out Of", y: incorrect
    }
  ]
  return (
    <div>
      <Strong text={"Results: "}>{`${tracking.best} / ${tracking.outOf}`}</Strong>
      <TrialChart dataPoints={test}/>
    </div>
  );
};

export default BestOutOfTrialDisplay;