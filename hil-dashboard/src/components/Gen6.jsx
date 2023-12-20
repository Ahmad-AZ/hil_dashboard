import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interationPlugin from '@fullcalendar/interaction'
import { Modal, Button } from 'react-bootstrap'
import moment from"moment";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Header from './Header' 
import HilTile from './HilTile';


const Gen6 = () =>{


    const [gen6List, setGen6] = useState([]);


    const API = "http://127.0.0.1:5000/hils/gen/GEN6";
    const fetchGen6 = () => {
        fetch(API, {
            method: "GET",
            mode: "cors",
            headers: {
                accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setGen6(res);
            }).catch((error) => {
                console.error('Error fetching Gen5 HiLs', error)
            })

    };

    useEffect(() => {
        fetchGen6();
    }, []);

    return (
        <>
            <Header />

            <div className="container-lg">
                <div className="row main">
                    {gen6List.map((item, index) => (
                        <div className="col-4" key={index}>
                      
                                <HilTile hil={item} />
               
                         
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default Gen6;