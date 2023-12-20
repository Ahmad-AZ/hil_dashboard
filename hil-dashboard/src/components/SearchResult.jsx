import React, { useState, useEffect } from "react";
import Header from "./InnerHeader";
import HilTile from "./HilTile";
import { Modal, Button } from "react-bootstrap";
import { useParams } from 'react-router';


const SearchResult = () => {
  const params= useParams()
  const [post, getPost] = useState([]);
  const [selectedHils, getSelectedHils] = useState([]);

  const API = `http://127.0.0.1:5000/hils/${params.name}`;
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
    fetch(`http://127.0.0.1:5000/hils/${params.name}`, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.map((item)=>{
          getSelectedHils(selectedHils => [...selectedHils, item]);
        })
        // console.log(res)
      });
  };

  useEffect(() => {
    fetchPost();
    getSelectedHils([])
    fetchSelectedHils();
  }, [params.name]);

  const [selectedHil, setSelectedHil] = useState([]);

  const selectHill = async (event) => {
    setSelectedHil((selectHill) => [...selectedHil, event.target.innerText]);
    
    initListModal();

    var data = {
      name :  event.target.innerText,
    }

    const api = 'http://127.0.0.1:5000/selectedhilspost';
    
    await fetch(api, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
      })
      .then((res) => res)
      // window.location.reload()
      fetchPost();
      getSelectedHils([]);
      fetchSelectedHils();
  };

  // modal open/close
  const [isListShow, invokeListModal] = useState(false);
  const initListModal = () => {
    return invokeListModal(!isListShow);
  };


  return (
    <>
      <Header handleClick={initListModal} />
      <div className="container-lg">
        <div className="row main">
        <h2>Search Results: </h2>
          {
            selectedHils.length == 0 ? <p>No Result found</p> :
            selectedHils.map((item, i) => (
              <div className="col-4" key={i}>
                <div className="hil-tile bg-dark text-white">
                  <HilTile hil={item} />
                </div>
              </div>
            ))
          
          }
        </div>
      </div>
      <Modal show={isListShow}>
        <Modal.Header closeButton onClick={initListModal}>
          <Modal.Title>Available Hils</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="availableHillList">
            {post.map((item, i) => (
              <li key={i} onClick={selectHill}>
                {item.name}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initListModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SearchResult