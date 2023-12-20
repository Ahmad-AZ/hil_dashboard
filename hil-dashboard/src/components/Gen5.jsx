import React, { useState, useEffect, useRef, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interationPlugin from '@fullcalendar/interaction'
import { Modal, Button } from 'react-bootstrap'
import moment from "moment";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Header from './Header';
import HilTile from './HilTile';



const Gen5 = () => {

    const [gen5List, setGen5] = useState([]);
    const [loading, setLoading] = useState(true)



    //const genController = new AbortController();
    //const genSignal = genController.signal;


    const API = "http://127.0.0.1:5000/hils/gen/GEN5";

    const fetchGen5 = async () => {

        try {
            const response = await fetch(API, {
                method: "GET",
                mode: "cors",
                headers: {
                    accept: "application/json",
                },
                
            });
            if (!response.ok) {
                throw new Error(`Error fetching Gen5 HiLs: ${response.statusText}`)
            }

            const data = await response.json();
            setGen5(data);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted')
            }
            else {
                console.error(error);
            }

        } finally {
            setLoading(false)
        }

        
    };
    useEffect(() => {

        fetchGen5();

    }, []);



    return (
        <>
            <Header />

            <div className="container-lg">


                {loading ? (
                    <p>loading...</p>
                ) : (



                    <div className="row main">
                        {gen5List.map((item, index) => (
                            <div className="col-4" key={index}>
                                
                                    <HilTile hil={item} />

                             
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )

}

export default Gen5