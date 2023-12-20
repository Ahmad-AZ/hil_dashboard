import React, { useState, useEffect } from "react";
import Header from "./Header";
import HilTile from "./HilTile";
import { Modal, Button } from "react-bootstrap";

const IndexNew = () => {
  const [post, getPost] = useState([]);
  const [selectedHils, setSelectedHils] = useState([]);
  const [isListShow, invokeListModal] = useState(false);

  const API = "http://127.0.0.1:5000/hils";
  const fetchPost = () => {
    fetch(API, {
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

  const fetchSelectedHils = () => {
    fetch('http://127.0.0.1:5000/selectedhils', {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.map((item) => {
          setSelectedHils(selectedHils => [...selectedHils, item]);
        })
      });
  };

  useEffect(() => {
    fetchPost();
    fetchSelectedHils();
    tempfunc();
  }, []);


  const selectHill = async (event) => {
    await setSelectedHils((selectedHils) => [...selectedHils, event.target.innerText]);

    initListModal();

    var data = {
      name: event.target.innerText,
    }

    const api = 'http://127.0.0.1:5000/selectedhilspost';

    fetch(api, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res)
    // zzzzzwindow.location.reload()
    fetchPost();
    setSelectedHils([]);
    fetchSelectedHils();
  };

  // modal open/close
  const initListModal = () => {
    tempfunc();
    return invokeListModal(!isListShow);
  };

  const [temp, settemp] = useState([])
  const tempfunc = () => {
    var arr = [];
    selectedHils.map((item, i) => {
      arr.push(item.name)
      settemp(arr)
    })

  }
  return (
    <>
      <Header handleClick={initListModal} />
      <div className="container-lg">
        <div className="row main">
          {selectedHils.map((item, i) => (
            <div className="col-4" key={i}>
                <HilTile hil={item} />

            </div>
          ))}
        </div>
      </div>
      <Modal show={isListShow}>
        <Modal.Header closeButton onClick={initListModal}>
          <Modal.Title>Available Hils</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="gen-container">

            <div className="gen-section">

              <h4>Gen5</h4>
              <ul className="availableHillList">
                {post.filter((item) => item.location === 'GEN5')
                  .map((item, i) =>
                    !temp.includes(item.name) ? (
                      <li key={i} onClick={selectHill}>
                        {item.name}
                      </li>
                    ) : ("")
                  )}
              </ul>

            </div>
            
            <div className="gen-section">

              <h4>Gen6</h4>
              <ul className="availableHillList">
                {post.filter((item) => item.location === 'GEN6')
                  .map((item, i) =>
                    !temp.includes(item.name) ? (
                      <li key={i} onClick={selectHill}>
                        {item.name}
                      </li>
                    ) : ("")
                  )}
              </ul>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initListModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IndexNew;
