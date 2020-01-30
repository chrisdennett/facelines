import React from "react";
import styled from "styled-components";
import ExternalLink from "../components/externalLink";
//FaInfoCircle
import { FaInfoCircle } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";

const TopBar = ({
  title,
  infoUrl,
  optionsVisible,
  setOptionsVisible,
  width
}) => {
  return (
    <Container>
      <StyledButton onClick={() => setOptionsVisible(!optionsVisible)}>
        {optionsVisible ? "Hide" : "Show"} Options
      </StyledButton>
      <Title>{title}</Title>
      <HelpInfoLink to={infoUrl}>
        <FaInfoCircle style={{ position: "relative", top: 4, fontSize: 20 }} />{" "}
        {width > 600 && (
          <>
            About this{" "}
            <GoLinkExternal style={{ fontSize: 12, verticalAlign: "super" }} />
          </>
        )}
      </HelpInfoLink>
    </Container>
  );
};

export default TopBar;

const HelpInfoLink = styled(ExternalLink)`
  color: white;
  /* background: white; */
  font-size: 16px;
  padding: 7px 10px;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 5px;

  svg {
    fill: white;
  }

  :visited {
    color: white;
  }
`;

const Container = styled.div`
  background: black;
  color: white;
  display: flex;
  align-items: center;
  height: 60px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
  flex: 1;
`;

const StyledButton = styled.button`
  padding: 7px 10px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  margin-right: 15px;
  /* border: 2px solid white; */
  font-size: 16px;
  /* background: black; */
  /* color: white; */
  cursor: pointer;
  user-select: none;
  margin-left: 10px;
`;
