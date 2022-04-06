import React from "react";
import { Footer, Header } from "@mantine/core";
import Main from "./ui/shell/Main";
import ReloadPrompt from "./ui/shell/ReloadPrompt";

function App() {
  return (
    <>
      <Header height="auto" py="xs" px="md">
        <h1>FIXE</h1>
      </Header>
      <Main />
      <Footer height="auto" py="xs" px="xs">
        <small>
          Created by{" "}
          <a
            href="https://www.8byte.agency"
            target="_blank"
            rel="noopener noreferrer"
          >
            8byte Agency
          </a>
        </small>
      </Footer>
      <ReloadPrompt />
    </>
  );
}

export default App;
