import React from "react";
import styled from "styled-components";
import ExternalLink from "../components/externalLink";
//FaInfoCircle
import { FaInfoCircle } from "react-icons/fa";

const TopBar = ({ title, infoUrl }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <HelpInfoLink to={infoUrl}>
        <FaInfoCircle />
      </HelpInfoLink>
    </Container>
  );
};

export default TopBar;

const HelpInfoLink = styled(ExternalLink)`
  color: white;
  font-size: 24px;

  :visited {
    color: white;
  }
`;

const Container = styled.div`
  background: #455a64;
  color: white;
  display: flex;
  padding: 0 15px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  flex: 1;
`;
