
import React, { useState } from "react";
import Game from './Game'
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
const checkData = (data, difficultyLevel, props) => {
  if (data.name !== "" && data.email !== "") {
    document.getElementById('error_msg').innerHTML = ""
    props.history.push('./game', {
      "flag": "ABC",
      "userData": data,
      "difficultyLevel": difficultyLevel
    })

  }
  else {
    document.getElementById('error_msg').innerHTML = " * Please fill the above fields *"
  }
}

function RegisterPage(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [difficultyLevel, setLevel] = useState("easy")
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <>
      <IndexNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/login-image.jpg").default + ")",
        }}
      >
        <div className="filter" />
        <Container >
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{
                backgroundColor: '#474c4d'
              }}>
                <h3 className="mx-auto">Welcome</h3>
                <Form className="register-form">
                  <label>Name</label>
                  <Input placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                  <label>Email</label>
                  <Input placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
                  <label>Difficulty</label>
                  <Input type="select" name="select" onChange={(e) => { setLevel(e.target.value) }}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Difficult</option>
                  </Input>
                  <Button block className="btn-round" color="danger"
                    onClick={() => {
                      checkData({
                        "name": name,
                        "email": email
                      }, difficultyLevel, props)
                    }}
                  >
                    Continue
                  </Button>
                  <div id="error_msg" style={{ textAlign: 'center', marginTop: '5px' }}></div>
                </Form>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegisterPage;
