import React, { useState, useEffect } from 'react'
import {
    Button, Input, Container, Row, Col, Progress, Card,
    CardTitle, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { EASYWORDS, HARDWORDS, MEDIUMWORDS, ENDPOINTS, TRENDINGWORDS } from './constant.js'
import { Howl, Howler } from 'howler';
import complete from '../../audioclips/complete.mp3';
import fail from '../../audioclips/fail.mp3';
import gameover from '../../audioclips/gameover.mp3'



var difficulty = {
    "easy": {
        "stack_size": 7,
        "time": 10,
        "score": 5,
        "words": EASYWORDS
    },
    "medium": {
        "stack_size": 5,
        "time": 7,
        "score": 10,
        "words": MEDIUMWORDS
    },
    "hard": {
        "stack_size": 3,
        "time": 5,
        "score": 15,
        "words": HARDWORDS
    }
}


function Game(props) {
    const [reducebar, setReducebar] = useState(100);
    const [selectedDifficulty, setSelectedDifficulty] = useState(props.location.state.difficultyLevel)
    const [reducebarData, setReducebarData] = useState(1 + difficulty[props.location.state.difficultyLevel].time)
    const [userInput, setUserInput] = useState("")
    const [flag, setflag] = useState(false)
    const [maxTime, setMaxTime] = useState(difficulty[props.location.state.difficultyLevel].time)
    const [maxStackSize, setMaxStackSize] = useState(difficulty[props.location.state.difficultyLevel].stack_size)
    const [currentStack, setCurrentStack] = useState(1)
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(0);
    const [multiplier, setMultiplier] = useState(0)
    const [runOnce, setRunOnce] = useState(true)
    const [currentWord, setCurrentWord] = useState(difficulty[selectedDifficulty].words[0])
    const [gameOverModal, setGameOverModal] = useState(false)
    const [time, setTime] = useState(10)
    const [termsModal, setTermsModal] = useState(true)
    const [reduceRate, setReduceRate] = useState(0)
    const [divider, setDivider] = useState(maxTime - reduceRate)
    const soundSuccess = new Howl({
        src: [complete, 'sound.mp3']
    });
    const soundFailure = new Howl({
        src: [fail, 'sound.mp3']
    });
    const soundGameOver = new Howl({
        src: [gameover, 'sound.mp3']
    });
    const saveData = (userObject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": userObject.email,
            "score": userObject.score,
            "name": userObject.name,
            "difficulty": userObject.difficulty,
            "max_level": level
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${ENDPOINTS}/api/leaderboard/`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setGameOverModal(false)
            })
            .catch(error => console.log('error', error));
    }
    console.log("reduceRate", reduceRate)
    const getWord = (wordList) => {
        if (wordList) {
            var word = wordList[Math.floor(Math.random() * wordList.length)];
            setCurrentStack(prev => prev + 1)
            return word
        }

    }
    const performCheck = () => {
        setRunOnce(false)
        if (userInput === currentWord) {

            if (flag) {
                Howler.volume(1.5);
                soundSuccess.play();
                let addBonous = 0
                if (TRENDINGWORDS.includes(userInput)) {
                    addBonous = 10
                }
                setCurrentStack(prev => prev - 1)
                setScore(score + difficulty[props.location.state.difficultyLevel].score * (multiplier > 0 ? multiplier : 1) + difficulty[props.location.state.difficultyLevel].score * (reduceRate > 0 ? reduceRate : 1) + addBonous)
                setMultiplier(multiplier + 1)
                setCurrentWord(getWord(difficulty[selectedDifficulty].words))
                
            }
        }
        else {

            Howler.volume(1.5);
            soundFailure.play();
            if (currentStack === maxStackSize) {
                soundFailure.stop()
                soundGameOver.play()
                setGameOverModal(true)
                return


            }
            else {
                if (flag) {
                    setCurrentWord(getWord(difficulty[selectedDifficulty].words))
                    setMultiplier(0)

                }
            }
        }
        document.getElementById('progbar').getElementsByClassName('progress-bar')[0].style.backgroundColor = '#51cbce'
        setReducebar(100)
        setUserInput("")
        setflag(false)
        setRunOnce(true)
    }
    useEffect(() => {
        const timer = window.setInterval(() => {
            setTime(prevTime => prevTime - 1); // <-- Change this line!
        }, 1000);
        return () => {
            window.clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (!termsModal)
            if (reducebar > 5 && reducebarData > 0) {
                setReducebar(prev => prev - parseInt(100 / divider))
            }
            else {
                runOnce && performCheck()
                setReducebarData(maxTime - reduceRate + 1)
                setDivider(maxTime - reduceRate)
            }
    }, [time])

    useEffect(() => {

        if (reducebar < 85) {
            document.getElementById('progbar').getElementsByClassName('progress-bar')[0].style.backgroundColor = 'yellow'
        }
        if (reducebar < 50) {
            document.getElementById('progbar').getElementsByClassName('progress-bar')[0].style.backgroundColor = 'red'
        }
        if (reducebarData > 1)
            setReducebarData(prev => prev - 1)

    }, [reducebar])

    useEffect(() => {
        if (reducebarData === 1) {
            setflag(true)
        }
    }, [reducebarData])

    useEffect(() => {

        if (score > 100) {
            setLevel(parseInt(score / 100))
        }
    }, [score])

    useEffect(() => {
        if (level > 0)
            setScore(score + 20)
        if (maxTime - reduceRate > 3) {
            setReduceRate(level)
        }

    }, [level])

    return (
        <div
            className="page-header"
            style={{
                backgroundImage:
                    "url(" + require("assets/img/ilya-yakover.jpg").default + ")",
            }}>

            <Modal isOpen={termsModal} >
                <ModalHeader style={{ fontWeight: '700 !important', color: '#000' }} toggle={() => setTermsModal(false)}>Terms And Conditions !</ModalHeader>
                <ModalBody style={{
                    alignContent: 'center', alignContent: 'center',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '2rem'
                }}>
                    <p>
                        * Each trending words give extra 10 points
                    </p>
                    <p>
                        * Each level  up  gives an extra 20 points
                    </p>
                    <p>
                        * Your time will decrease with increase in level
                    </p>
                    <p>
                        * After a certain level you timer will be fixed to 3s
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        setTermsModal(false)
                    }}>Continue</Button>{' '}

                </ModalFooter>

            </Modal>

            <Modal isOpen={gameOverModal} >
                <ModalHeader toggle={() => setGameOverModal(false)}>Game Over !</ModalHeader>
                <ModalBody style={{
                    alignContent: 'center', alignContent: 'center',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '2rem'
                }}>
                    <>
                        Score: {score}
                    </>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        window.location.reload()
                    }

                    }>Play Again</Button>{' '}


                    <Button color="secondary" onClick={() => {
                        saveData({
                            "name": props.location.state.userData.name,
                            "email": props.location.state.userData.email,
                            "difficulty": props.location.state.difficultyLevel,
                            "score": score
                        })
                        props.history.push('/register-page')
                    }

                    }>Save and Close</Button>{' '}
                    <Button color="danger" onClick={() => {
                        props.history.push('/register-page')
                    }}>Cancel</Button>
                </ModalFooter>

            </Modal>
            <Container className="themed-container" fluid="xl" style={{
                height: '33rem'
            }} >

                <Row style={{
                    height: '8rem',
                    margin: '1rem'
                }}>
                    <Col className="ml-auto mr-auto" lg="4">
                        <div className="text-center" style={{
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{reducebar < 9 ? reducebarData - 1 + ' s' : reducebarData + ' s'}</div>
                        <Progress id="progbar" className=".text-danger" value={reducebar > 5 ? reducebar : 0} />
                    </Col>
                </Row>
                <Row style={{
                    height: '28rem'
                }}>
                    <Col className=".col-6" lg="4">
                        <div className="    ">
                            <Card body className="text-center" style={{ backgroundColor: '#8abe5e' }}>
                                <CardTitle tag="h5" style={{ color: '#fff', fontWeight: 'bold' }}>Score: {score}</CardTitle>
                            </Card>
                            <Card body className="text-center" style={{ backgroundColor: '#51b2da' }}>
                                <CardTitle tag="h5" style={{ color: '#fff', fontWeight: 'bold' }}>Level:{level}</CardTitle>
                            </Card>
                            <Card body className="text-center" style={{ backgroundColor: '#8061d8' }}>
                                <CardTitle tag="h5" style={{ color: '#fff', fontWeight: 'bold' }}>Multiplier:  {multiplier > 0 ? multiplier + 'X' : multiplier}</CardTitle>
                            </Card>
                        </div>
                    </Col>
                    <Col className=".col-6" lg="4" >
                        <div className="ml-auto mr-auto">
                            <Card body className="text-center">
                                <CardTitle tag="h3">{currentWord}</CardTitle>
                            </Card>
                        </div>
                        <div className='flex-bottom'>
                            <Card body className="text-center">
                                <Input id='input_field' type="text" style={{ textAlign: 'center' }} value={userInput === "" ? "" : userInput} onChange={(e) => setUserInput(e.target.value)} />
                            </Card>
                        </div>
                    </Col>
                    <Col className=".col-6" lg="4">
                        <div className="" >

                            <div className="text-center" style={{
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Chances Left : {difficulty[props.location.state.difficultyLevel].stack_size - currentStack}/{difficulty[props.location.state.difficultyLevel].stack_size}</div>
                            <Progress value={100 / difficulty[props.location.state.difficultyLevel].stack_size * currentStack} style={{
                                transform: "rotate(-90deg)",
                                height: "100px",
                                marginTop: '9rem',

                            }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Game
