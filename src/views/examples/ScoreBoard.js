
import React, { useState } from "react";
import { Card, Container, Row, Col, Table } from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { ENDPOINTS } from './constant'
function ScoreBoard(props) {
  const [easyData, seteasyData] = useState([])
  const [medium, setmedium] = useState([])
  const [hard, sethard] = useState([])
  document.documentElement.classList.remove("nav-open");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    },

      fetch(`${ENDPOINTS}/api/leaderboard/difficulty/hard`, requestOptions)
        .then(response => response.json())
        .then(result => {
          sethard(result.data)
        })
        .catch(error => console.log('error', error)),

      fetch(`${ENDPOINTS}/api/leaderboard/difficulty/medium`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setmedium(result.data)
        })
        .catch(error => console.log('error', error)),
      fetch(`${ENDPOINTS}/api/leaderboard/difficulty/easy`, requestOptions)
        .then(response => response.json())
        .then(result => {
          seteasyData(result.data)
        })
        .catch(error => console.log('error', error));

  }, []);

  return (
    <>
      <IndexNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/fabio-mangione.jpg").default + ")",
        }}
      >
        <div className="filter" />
        <Container >
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{
                backgroundColor: '#c6c6c6'
              }}>
                <h3 className="mx-auto" style={{ color: '#000' }}>Easy</h3>
                <Table>
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th>Score</th>
                      <th>Avg</th>
                      <th>Played</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      easyData.length >= 1 &&
                      easyData.map((val, index) => {

                        return (
                          <tr>
                            <td>{val.name}</td>
                            <td>{val.score}</td>
                            <td>{parseInt(val.score / val.times_played)}</td>
                            <td>{val.times_played}</td>
                            <td>{val.max_level}</td>
                          </tr>
                        )
                      })

                    }

                  </tbody>
                </Table>

              </Card>
            </Col>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{
                backgroundColor: '#c6c6c6'
              }}>
                <h3 className="mx-auto" style={{ color: '#000' }}>Medium</h3>
                <Table>
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th>Score</th>
                      <th>Avg</th>
                      <th>Played</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      medium.length >= 1 &&
                      medium.map((val, index) => {

                        return (
                          <tr>
                            <td>{val.name}</td>
                            <td>{val.score}</td>
                            <td>{parseInt(val.score / val.times_played)}</td>
                            <td>{val.times_played}</td>
                            <td>{val.max_level}</td>
                          </tr>
                        )
                      })

                    }

                  </tbody>
                </Table>

              </Card>
            </Col>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{
                backgroundColor: '#c6c6c6'
              }}>
                <h3 className="mx-auto" style={{ color: '#000' }}>Hard</h3>
                <Table>
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th>Score</th>
                      <th>Avg</th>
                      <th>Played</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      hard.length >= 1 &&
                      hard.map((val, index) => {

                        return (
                          <tr>
                            <td>{val.name}</td>
                            <td>{val.score}</td>
                            <td>{parseInt(val.score / val.times_played)}</td>
                            <td>{val.times_played}</td>
                            <td>{val.max_level}</td>
                          </tr>
                        )
                      })

                    }

                  </tbody>
                </Table>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ScoreBoard;
