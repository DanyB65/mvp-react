import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Map from './components/Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import FourmBox from "./components/FourmBox";
import FourmBoxList from "./components/FourmBoxList";

function App() {
  const [fourmBoxClicked, setFourmBoxClicked] = useState(false);
  const [fourmData, setFourmData] = useState([]);
  const [address, setAddress] = useState(null);
  const [fourmBoxListClicked, setFourmBoxListClicked] = useState(false);
  const [ticketInfo, setTicketInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/ticketInfo")
      .then((response) => response.json())
      .then((data) => setTicketInfo(data));
      
  }, []);

  return (
    <>
      <NavBar
        setFourmBoxClicked={setFourmBoxClicked}
        setFourmBoxListClicked={setFourmBoxListClicked}
      />
      {fourmBoxClicked ? (
        <FourmBox setTicketInfo={setTicketInfo} setAddress={setAddress} setFourmData={setFourmData} setFourmBoxClicked={setFourmBoxClicked} address={address} />
      ) : fourmBoxListClicked ? (
        <div>
          {ticketInfo.map((ticket) => {
            console.log(ticket)
            return <FourmBoxList
              key={ticket.id}
              id={ticket.id}
              ticketName={ticket.name}
              date={ticket.date}
              issue={ticket.issue}
              location={{ address: ticket.address }}
              setFourmData={setFourmData}
              setFourmBoxClicked={setFourmBoxClicked}
              setFourmBoxListClicked={setFourmBoxListClicked}
              setTicketInfo ={setTicketInfo}
            />
          })}
        </div>
      ) : (
        <Map setAddress={setAddress} />
      )}
      <Footer />
    </>
  );
}

export default App;
