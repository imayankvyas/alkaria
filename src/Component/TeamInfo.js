import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Col } from "reactstrap"
import "../App.css"
import Skeleton from 'react-loading-skeleton';
import moment from 'moment/moment';
import { toast } from 'react-toastify';

const TeamInfo = ({ teamDetail, setTeamDetail, viewTeam, setViewTeam, ...props }) => {

    const [gameDetail, setGameDetail] = useState([]);
    const [fetchingGame, setFetchingGame] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        if (teamDetail) {
            axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${teamDetail?.id}`).then((response) => {
                setGameDetail(response.data);
                setFetchingGame(false)
                setError(null)
            }).catch((err) => {
                setError(err)
                toast.error(error?.message ?? "Some Error occured")
                setFetchingGame(false)
            })
        }
    }, [teamDetail])

    const totalGame = gameDetail?.data?.length;
    const randomIndex = Math.floor(Math.random() * totalGame);

    function sideBarFun() {
        setViewTeam((viewTeam) => !viewTeam)
    }

    return (
        <div>

            <Offcanvas isOpen={viewTeam} toggle={() => sideBarFun()} direction='end' >
                <OffcanvasHeader toggle={() => sideBarFun()} className='game-detail-header align-item-center'>
                    <div className='h5'>{teamDetail?.name}</div>
                </OffcanvasHeader>
                {fetchingGame ? <Skeleton count={5} /> :
                    <OffcanvasBody className='game-detail-body'>
                        <Row>
                            <Col md={6} sm={6}>Team Full Name</Col>
                            <Col md={6} sm={6}>{teamDetail?.full_name} </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6}>Total Games in 2021</Col>
                            <Col md={6} sm={6}>{totalGame} </Col>
                        </Row>

                        {/* Random Game detail */}
                        <div className='fw-bold p-1'>Random Game Details:</div>

                        <Row>
                            <Col md={6} sm={6} className='fw-bold'>Date</Col>
                            <Col md={6} sm={6}>{moment(gameDetail?.data[randomIndex]?.date).format('YYYY-MM-DD')}</Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6} className='fw-bold'>Home Team</Col>
                            <Col md={6} sm={6}>{gameDetail?.data[randomIndex]?.home_team?.name}</Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6} className='fw-bold'>Home Team Score</Col>
                            <Col md={6} sm={6}>{gameDetail?.data[randomIndex]?.home_team_score}</Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6} className='fw-bold'>Visitor Team</Col>
                            <Col md={6} sm={6}>{gameDetail?.data[randomIndex]?.visitor_team?.name}</Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6} className='fw-bold'>Visitor Team Score</Col>
                            <Col md={6} sm={6}>{gameDetail?.data[randomIndex]?.visitor_team_score}</Col>
                        </Row>
                    </OffcanvasBody>
                }
            </Offcanvas>

        </div>
    )
}

export default TeamInfo 