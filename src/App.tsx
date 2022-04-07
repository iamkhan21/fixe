import React from "react";
import { Footer, Header } from "@mantine/core";
import Main from "@shell/Main";
import ReloadPrompt from "@shell/ReloadPrompt";
import GeolocationTrack from "@shell/GeolocationTrack";

function App() {
  return (
    <>
      <Header height="auto" py="xs" px="md">
        <h1>FIXE</h1>
      </Header>
      <Main />
      <Footer height="auto" py="xs" px="xs">
        <p>
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
        </p>
        <p>
          <small>
            App build v.{__BUILD_VERSION__.slice(0, 8)} ({__BUILD_DATE__})
          </small>
        </p>
      </Footer>
      <GeolocationTrack />
      <ReloadPrompt />
    </>
  );
}

export default App;
