import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import moment from "moment";



const HilTile = (props) => {
  const [hilNote, setHilNote] = useState('');
  const [occupan, setOccupan] = useState('');
  const [note, setnote] = useState('');
  const [hilText, getHilText] = useState([]);
  const [hilStatus, setHilStatus] = useState();
  const [hilActivity, getHilActivity] = useState();
  const [isListShow, invokeListModal] = useState(false);
  const [isoccListShow, setIsoccListShow] = useState(false);
  const [istextListShow, setIstextListShow] = useState(false);



  const initListModal = () => {
    return invokeListModal(!isListShow);
  };
  const handleNote = () => {
    initListModal();
    fetchPost();
    if (events.length != 0) {
      events.map((item) => {
        var startdate = moment(item.startDate, 'YYYY-MM-DD')
        var startTime = moment(item.startTime, 'hh-mm-ss')
        var enddate = moment(item.endDate, 'YYYY-MM-DD')
        var endTime = moment(item.endTime, 'hh-mm-ss')
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0)
        if (enddate >= currentDate && startdate <= currentDate) {
          if (startTime < moment() && endTime > moment()) {
            setHilNote(item.notes);
          }
          else if (startTime > moment() && endTime > moment()) {
            setHilNote(item.notes);
          }
        }
        else if (enddate >= currentDate && startdate >= currentDate) {
          setHilNote(item.notes);
        }

      })
    }
    else {
      setHilNote('No Notes Available!')
    }
  }
  const [events, getEvents] = useState([])

  const API = 'http://127.0.0.1:5000/eventslist/' + props.hil.name;
  const fetchPost = () => {

    fetch(API, {
      method: 'GET',
      mode: 'cors',
      headers: {
        accept: 'application/json',
      },
    })

      .then((res) => res.json())
      .then((res) => {
        getEvents(res);
      }).catch((error) => {

        console.error('Error:', error);


      })
  }


  const [lastStatusUpdate, setLastStatusUpdate] = useState('')
  const [lastActivityUpdate, setLastActivityUpdate] = useState('')

  //const [lastUpdate, setLastUpdate] = useState('')
  const [SW_Release, set_SW_Release] = useState('')




  /*  useEffect(() => {

     setInterval(() => {
        fetchStatus()
        fetchActivity()
        setLastUpdate(new Date().toLocaleTimeString())
      }, 60000); 
  }, [props.hil.name]);
*/

  const statusAPI = 'http://127.0.0.1:5000/status/' + props.hil.name;
  const fetchStatus = () => {


    fetch(statusAPI, {
      method: 'GET',
      mode: 'cors',
      headers: {
        accept: 'application/json',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        res.map((item) => {
          setHilStatus(item.status),
            set_SW_Release(item.sw_release)
        }
        )
      }).catch((error) => {
        
        setHilStatus(''),
        set_SW_Release('')

      }
      )
  }

  const fetchAPI = 'http://127.0.0.1:5000/activity/' + props.hil.name;
  const fetchActivity = () => {

    fetch(fetchAPI, {
      method: 'GET',
      mode: 'cors',
      headers: {
        accept: 'application/json',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        res.map((item) => {
          getHilActivity(item.activity)
        }
        )

      }).catch((error) => { console.error('Error: ', error) })
  };





  useEffect(() => {
    const activityInterval = setInterval(() => {
      fetchActivity();

      setLastActivityUpdate(new Date().toLocaleTimeString());
    }, 30000); // You can adjust the interval as needed



    return () => {
      clearInterval(activityInterval);

    };
  }, [props.hil.name]);







  useEffect(() => {

    const statusInterval = setInterval(() => {
      fetchStatus();
      setLastStatusUpdate(new Date().toLocaleTimeString());
    }, 60000);


    return () => {
      clearInterval(statusInterval);
    };
  }, [props.hil.name]);




  const handleOccupan = () => {
    fetchPost();
    setIsoccListShow(!isoccListShow)
    if (events.length != 0) {
      events.map((item) => {
        var startdate = moment(item.startDate, 'YYYY-MM-DD')
        var startTime = moment(item.startTime, 'hh-mm-ss')
        var enddate = moment(item.endDate, 'YYYY-MM-DD')
        var endTime = moment(item.endTime, 'hh-mm-ss')
        // console.log(enddate)
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0)
        if (enddate >= currentDate && startdate <= currentDate) {
          if (startTime < moment() && endTime > moment()) {
            setOccupan('hil is occupied till ' + moment(item.endTime, 'hh-mm-ss').format('hh:mm A'));
            console.log('working')
          }
          else if (startTime > moment() && endTime > moment()) {
            setOccupan('hil is not occupied till ' + moment(item.startTime, 'hh-mm-ss').format('hh:mm A'));
            console.log('not working')
          }
        }
        else if (enddate >= currentDate && startdate >= currentDate) {
          setOccupan('hil is not occupied till ' + moment(item.startTime, 'hh-mm-ss').format('hh:mm A') + ' of ' + moment(item.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        }

      })
    }
    else {
      setOccupan('hil has no booking, you can book this hill for anytime!')
    }

  }


  const handleText = () => {
    const textAPI = 'http://127.0.0.1:5000/text/' + props.hil.name;

    fetch(textAPI, {
      method: 'GET',
      mode: 'cors',
      headers: {
        accept: 'application/json',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        getHilText(res);


      })

    setIstextListShow(!istextListShow)
  }

  const [name, setName] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var data = {
      name: props.hil.name,
      text: name
    }
    // console.log(data)

    const API = 'http://127.0.0.1:5000/text';

    await fetch(API, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        // accept: 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res)
    handleText();
    setName('')
  }


  return (
    <div>
      <div className='hil-tile'>
        
        <div className='row'>
        <div className="col-4">
            <div className="box hil-name">
              <p className='text-center'> <em>{props.hil.name}</em> </p>
            </div>
          </div>
          <div className="col-8">
            <div className="box hil-bmu">

              <p className='text-center' onClick={handleNote}>HiL-Properties</p>
            </div>
          </div>

          <div className="col-4">
            <div className="box hil-booking">
              <p className='text-center'><Link to={'/calendar/' + props.hil.name}>Booking</Link></p>
            </div>
          </div>



          <div className="col-4">
            <div className="box hil-r33">
              <p className='text-center'>{SW_Release == '' ? 'No SW-Info' : SW_Release}</p>
            </div>
          </div>

          <div className="col-4">
            <div className="box hil-notes">
              <p className='text-center' onClick={handleText}>Notes</p>
            </div>
          </div>
          <div className="col-4">
            <div className="box hil-occuoan">
              <p className='text-center' onClick={handleOccupan}>Occupancy</p>
            </div>
          </div>


          <div className="col-4">
            <div className={`box ${hilActivity === 'userActivity' ? 'userActivity' : hilActivity == 'inactive' ? 'inactive' : hilActivity == 'offline' ? 'offline' : hilActivity == 'automatedTestExecution' ? 'automatedTestExecution' : hilActivity == 'ciActivity' ? 'ciActivity' : 'hil-activity'}`}>
              <p className='text-center'>
                {hilActivity == 'userActivity' ? 'userActivity' : hilActivity == 'inactive' ? 'inactive' : hilActivity == 'offline' ? 'offline' : hilActivity == 'automatedTestExecution' ? 'automatedTest' : hilActivity == 'ciActivity' ? 'ciActivity' : '-'}
              </p>
            </div>
          </div>


          <div className="col-4">
            <div className={`box ${hilStatus == 'good' ? 'hil-status-good' : hilStatus == 'bad' ? 'hil-status-bad' : hilStatus == 'notperfect' ? 'hil-status-np' : 'hil-status'}`}>
              <p className='text-center'>
                {
                  hilStatus == 'good' ? 'Status-PASSED' : hilStatus == 'bad' ? 'Status-FAILED' : hilStatus == 'notperfect' ? 'Status-NONE' : 'Status-NONE'
                }
              </p>
            </div>
         
        </div>

        </div>
 
      </div>
      <Modal show={isListShow}>
        <Modal.Header closeButton onClick={initListModal}>
          <Modal.Title>Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{hilNote}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initListModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isoccListShow}>
        <Modal.Header closeButton onClick={() => setIsoccListShow(!isoccListShow)}>
          <Modal.Title>Occupancy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{occupan}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsoccListShow(!isoccListShow)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={istextListShow}>
        <Modal.Header closeButton onClick={() => setIstextListShow(!istextListShow)}>
          <Modal.Title>Texts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {
              hilText.map((item, index) => (
                <li>
                  {item.text}
                </li>
              )

              )
            }

          </ul>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Enter New Text"
              aria-label="Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className="btn btn-outline-success" type="submit">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIstextListShow(!istextListShow)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default HilTile