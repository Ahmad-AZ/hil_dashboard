import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interationPlugin from '@fullcalendar/interaction'
import Header from './InnerHeader'
import { Modal, Button } from 'react-bootstrap'
import moment from "moment";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';





const Hilscalendar = () => {

  const params = useParams()
 
  useEffect(()=> {
    toast.success(`${params.name} HiL has been selected`)
  },[params.name])

  const [post, getPost] = useState([]);

  const [selectedHilName, setSelectedHilName] = useState(params.name)
  const [formStartDate, setformStartDate] = useState('');
  const [formStartTime, setformStartTime] = useState('');

  const [formEndDate, setformEndDate] = useState('');
  const [formEndTime, setformEndTime] = useState('');

  const [formNotes, setformNotes] = useState('');
  const [formName, setformName] = useState('');


  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleClick = (info) => {
    const { start, end } = info;
    var startdate = new Date(start);
    var startdate = moment(startdate).format('YYYY-MM-DD');
    var varstartTime = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    setStartDate(startdate)
    setformStartDate(startdate)
    setStartTime(varstartTime)
    setformStartTime(varstartTime)

    var endDate = new Date(end);
    var endDate = moment(endDate).format('YYYY-MM-DD');
    var varendTime = end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    setEndDate(endDate)
    setEndTime(varendTime)
    setformEndDate(endDate)
    setformEndTime(varendTime)
    initModal();
  }


  // modal open/close
  const [isShow, invokeModal] = useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }

  const handleEmptyName = () => toast.error('Name field is required.');
  const handleEmptyNotes = () => toast.error('Notes field is required.')

  const handleSubmit = () => {
    initModal();
    var data = {
      startDate: formStartDate,
      startTime: formStartTime,
      endDate: formEndDate,
      endTime: formEndTime,
      notes: formNotes,
      name: formName,
      hilName: params.name,
    }

    const API = 'http://127.0.0.1:5000/event';

    fetch(API, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        // accept: 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res)
    // window.location.reload()
    fetchPost();
  }


  const [events, getEvents] = useState([])

  const arr = [];

  const API = 'http://127.0.0.1:5000/eventslist/' + params.name;
  const fetchPost = () => {
    fetch(API, {
      method: 'GET',
      mode: 'cors',
      headers: {
        accept: 'application/json',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        getEvents(res);

      })
  }


  const hilsAPI = "http://127.0.0.1:5000/selectedhils";
  const fetchHils = () => {
    fetch(hilsAPI, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getPost(res);
      });
  };
  useEffect(() => {
    fetchPost();
    fetchHils();
  }, [])

  events.map((item, i) => {

    const obj = {
      id: item.id,
      title: item.name,
      start: new Date(item.startDate + 'T' + item.startTime),
      end: new Date(item.endDate + 'T' + item.endTime),
      notes: item.notes
    };
    arr.push(obj);
    // console.log(obj);
  })
  // console.log(arr);

  const [popnotes, setPopNotes] = useState('');
  const [popid, setPopId] = useState();
  const [popnotesmodal, setPopNotesmodal] = useState(false);
  const showinfo = (e) => {
    const eventid = e
    console.log(arr);
    const filtered = arr.filter(employee => {
      return employee.id == eventid;
    });
    // alert(filtered[0].notes)
    setPopNotes(filtered[0].notes)
    setPopId(filtered[0].id)
    setPopNotesmodal(!popnotesmodal)
  }

  const deleteEvent = async (e) => {
    const api = 'http://127.0.0.1:5000/deleteEvent/' + e
    console.log(api)
    await fetch(api, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    setPopNotesmodal(!popnotesmodal)
    fetchPost();
  }

  const reload = () => {
    window.location.reload()
  }
  


  return (
    <>
      <Header />
      <div className='container-lg mt-3'>
        <div className="row">
          <div className="col-md-2">
            <h2>Hils</h2>
            <ul>
              {
                post.map((items, index) => (
                  <li key={index} onClick={reload}>
                    <Link  to={`/gencalendar/${items.name}`}>
                    {items.name}
                    
                    </Link></li>
                ))
              }
            </ul>
          </div>
          <div className="col-md-10">
            <h3 className="hil-title">{selectedHilName}</h3>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interationPlugin]}
              initialView='timeGridWeek'
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}

              editable={false}
              selectable={true}
              dayMaxEvents={true}
              eventOverlap={false}
              aspectRatio={6}
              height={800}
              events={arr}
              dragScroll={true}
              select={handleClick}
              eventClick={
                function (arg) {
                  showinfo(arg.event.id)
                  // alert(arg.event.id)
                }
              }

              eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: false }}
            />
          </div>


        </div>


        <Modal show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title>{params.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <label htmlFor="" className="form-label">From</label>
                <div className="col-6 mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={startDate}
                    onChange={(e) => setformStartDate(moment(new Date(e.target.value)).format('YYYY-MM-DD'))}
                  />
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="time"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={startTime}
                    onChange={(e) => setformStartTime(moment(new Date(e.target.value)).format('hh:mm:ss'))}

                  />
                </div>
                <label htmlFor="" className="form-label">To</label>
                <div className="col-6 mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={endDate}
                    onChange={(e) => setformEndDate(moment(new Date(e.target.value)).format('YYYY-MM-DD'))}
                  />
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="time"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={endTime}
                    onChange={(e) => setformEndTime(moment(new Date(e.target.value)).format('hh:mm:ss'))}
                  />
                </div>
                <label htmlFor="" className="form-label">Notes</label>
                <div className={`col-12 mb-3 ${formNotes.trim() === '' ? 'empty-field' : ''}`}>
                  <input
                    type="text"
                    className={`form-control ${formNotes.trim() === '' ? 'empty-field-border' : ''}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={formNotes}
                    onChange={(e) => setformNotes(e.target.value)}
                    required
                  />
                </div>
                <label htmlFor="" className="form-label">Name</label>
                <div className={`col-12 mb-3 ${formName.trim() === '' ? 'empty-field' : ''}`}>
                  <input
                    type="text"
                    className={`form-control ${formName.trim() === '' ? 'empty-field-border' : ''}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={formName}
                    onChange={(e) => setformName(e.target.value)}
                    required
                  />
                </div>
              </div>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button
              variant="dark"
              onClick={() => (formName.trim() === '' ? handleEmptyName() : formNotes.trim() === '' ? handleEmptyNotes() : handleSubmit())}>
              Store
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={popnotesmodal}>
          <Modal.Header closeButton onClick={() => setPopNotesmodal(!popnotesmodal)}>
            <Modal.Title>Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{popnotes}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => deleteEvent(popid)}>
              Delete
            </Button>
            <Button variant="danger" onClick={() => setPopNotesmodal(!popnotesmodal)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />

      </div>
    </>
  )
}

export default Hilscalendar