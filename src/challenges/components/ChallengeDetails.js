import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ChallengeContext } from "../../shared/context/ChallengeContext";

import "../css/challenges.css";

const ChallengeDetails = () => {
  const challengesCtx = useContext(ChallengeContext);
  const { challenges } = challengesCtx;
  const chId = useParams().cid;

  const challenge = challenges.filter((c) => c.id === chId);

  return (
    <div className="challenge_details_wrapper">
      {challenge.map((c) => (
        <div className="challenge_item">
          <img src={c.image} alt={c.title} />
          <h1>{c.title}</h1>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ChallengeDetails;