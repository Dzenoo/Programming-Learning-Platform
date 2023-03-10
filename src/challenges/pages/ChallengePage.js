import React, { useContext, useReducer, useState } from "react";
import { ChallengeContext } from "../../shared/context/ChallengeContext";
import ChallengeItem from "../components/ChallengeItem";
import "../css/challenges.css";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FadeLoader } from "react-spinners";

const initialState = {
  categories: ["React", "Css", "Html", "Node Js", "JavaScript", "Scss"],
  difficulties: ["Beginner", "Advanced", "Expert"],
  currCategory: "",
  currDifficulty: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORIES": {
      return { ...state, currCategory: action.ctg };
    }
    case "DIFFICULTIES":
      return { ...state, currDifficulty: action.dif };
    default:
      throw new Error(`${action.type} is not valid action`);
  }
};

const ChallengePage = () => {
  const [{ categories, difficulties, currCategory, currDifficulty }, dispatch] =
    useReducer(reducer, initialState);
  const challengeCtx = useContext(ChallengeContext);
  const { filterChallenges, isLoading, selectedChallenges } = challengeCtx;

  return (
    <>
      {isLoading && (
        <div className="center">
          <FadeLoader />
        </div>
      )}
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: "2em",
          display: "flex",
          justifyContent: "space-between",
          gap: "2em",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2em",
            alignItems: "center",
          }}
        >
          <FormControl>
            <InputLabel>Technology</InputLabel>
            <Select
              sx={{ width: "10em" }}
              value={currCategory}
              onChange={(e) =>
                dispatch({ type: "CATEGORIES", ctg: e.target.value })
              }
            >
              {categories.map((btn) => (
                <MenuItem key={btn} value={btn}>
                  {btn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Difficulty</InputLabel>
            <Select
              sx={{ width: "10em" }}
              value={currDifficulty}
              onChange={(e) =>
                dispatch({ type: "DIFFICULTIES", dif: e.target.value })
              }
            >
              {difficulties.map((dif) => (
                <MenuItem key={dif} value={dif}>
                  {dif}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => filterChallenges(currCategory, currDifficulty)}
          >
            Filter
          </Button>
        </Box>
      </Container>
      <ChallengeItem challenges={selectedChallenges} />
      <ToastContainer />
    </>
  );
};

export default ChallengePage;
