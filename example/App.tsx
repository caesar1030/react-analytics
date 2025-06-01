import React, { type ReactElement } from "react";
import { LogEvent, PageView, useInitializeAnalytics } from "../src";

function App(): ReactElement {
  useInitializeAnalytics({
    measurementId: "G-VM8MZHYGG5",
    debug: true,
  });

  return (
    <PageView>
      <div className="app">
        <h1>Analytics Test Page</h1>

        <div className="test-section">
          <h2>Event Tracking Test</h2>
          <LogEvent
            category="button"
            action="click"
            label="test-button"
            value={1}
          >
            <button>Track Test Event</button>
          </LogEvent>
        </div>

        <div className="test-section">
          <h2>Navigation Test</h2>
          <nav>
            <LogEvent category="navigation" action="navigate" label="home">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/");
                }}
              >
                Home
              </a>
            </LogEvent>
            {" | "}
            <LogEvent category="navigation" action="navigate" label="about">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/about");
                }}
              >
                About
              </a>
            </LogEvent>
            {" | "}
            <LogEvent category="navigation" action="navigate" label="contact">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/contact");
                }}
              >
                Contact
              </a>
            </LogEvent>
          </nav>
        </div>

        <div className="current-path">
          Current Path: {window.location.pathname}
        </div>
      </div>
    </PageView>
  );
}

export default App;
