import React from "react";
import { Container, Button } from "reactstrap";
function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg").default + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Word Race</h1>
              <div className="fog-low">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
              </div>
              <div className="fog-low right">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Let's Upgrade Your Typing !
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage:
              "url(" + require("assets/img/clouds.png").default + ")",
          }}
        />
        <h5 className="category category-absolute" style={{
          position: 'absolute',
          top: '37rem'
        }}>
          <Button
            className="btn-round"
            color="danger"
            size="lg"
            href="./register-page"
          >
            <i className="nc-icon nc-spaceship"></i> Begin Game
          </Button>
        </h5>
      </div>
    </>
  );
}

export default IndexHeader;
