import React from "react";
import { Link } from "react-router-dom";
import { GitHub, GroupOutlined, LinkedIn } from "@material-ui/icons";
import OverrideButton from "../components/OverrideButton";
import { Link as LinkUi, Icon, Typography } from "@material-ui/core";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 800,
      }}
    >
      <Typography variant="h2">Desafio Gofind.</Typography>
      <Typography variant="overline">
        Seleção para desenvolvedor front-end
      </Typography>

      <Typography style={{ marginTop: 100 }}>
        <span style={{ fontWeight: 800 }}>Dev.:</span> José Eric Ferreira Farias
      </Typography>
      <div
        style={{
          marginTop: 20,
          marginBottom: 100,
          display: "flex",
          justifyContent: "space-around",
          width: 100,
        }}
      >
        <LinkUi
          target="_blank"
          href="https://github.com/JEricFarias/frontend-challenge"
          rel="noreferrer"
          underline="none"
        >
          <Icon>
            <GitHub fontSize="large" />
          </Icon>
        </LinkUi>

        <LinkUi
          target="_blank"
          href="https://www.linkedin.com/in/eric-farias-a4a95174/"
          rel="noreferrer"
          underline="none"
        >
          <Icon>
            <LinkedIn fontSize="large" />
          </Icon>
        </LinkUi>
      </div>
      <Link to="/users" style={{ textDecoration: "none" }}>
        <OverrideButton
          primary
          label="Ir para listagem de usuários"
          icon={<GroupOutlined />}
        />
      </Link>
    </div>
  );
}

export default Home;
