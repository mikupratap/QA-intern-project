import './app.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
const headers = new Headers();
headers.append("Accept", "application/json");

headers.append('Accept-Encoding', 'gzip, deflate, br');
const instance = axios.create(
  {
    baseURL: "",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  })
function App() {
  const [array, setarray] = useState([]);
  const [data, setdata] = useState();
  const [name, setname] = useState("Select Property");
  const solve = async () => {

    let arr = new Promise((resolve, reject) => {
      axios.get('https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22').then((arr) => {
        resolve(arr);
      }).catch((err) => {
        console.log(err, "ho gya kaam");
      })
    })
    arr.then((omfo) => {
      setarray(omfo);
      console.log(omfo.data.list);
      let list = [];
      omfo.data.list.map((ok) => {
        list.push(ok);
      }
      )
      setarray(list);
      //console.log(list, "mydata")
    })
    // setarray(arr.list);

  }
  //console.log(array)
  useEffect(() => {
    solve();
  }, [])
  const handlebutton = (e) => {
    let temp = 0;
    let pressure = 0;
    let speed = 0;
    console.log(e.target.name)
    if (e.target.name == "Select property") {
      setname(e.target.name);
      setdata("");
      return;
    }
    let date = prompt("Enter the date in (YYYY-MM-DD) format");
    let dataobj = null;
    let ok = 0;
    array.map((element) => {
      let x = element.dt_txt;
      let val = x.split(" ");
      x = val[0];
      console.log(x);
      if (date == x) {
        temp = element.main.temp;
        pressure = element.main.pressure;
        speed = element.wind.speed;
        ok = 1;

      }
      console.log(temp, pressure, speed)
    })
    if (ok === 0) {
      window.alert("this date is not present please enter date between 27-03-2019 to 30-03-2019");
      return;
    }
    if (e.target.name === 'Temperature') {
      setdata(temp);
      setname(e.target.name);
    }
    else if (e.target.name === "Wind Speed") {
      setname(e.target.name);
      setdata(speed);

    }
    else if (e.target.name === "Pressure") {
      setname(e.target.name);
      setdata(pressure);
    }

  }
  return (
    <>
      <div className="full">
        <div className="display">
          <div className='property'>{name}</div>
          <div className='value'>{data}</div>
        </div>
        <div className="btns">
          <button className="btn" name="Temperature" onClick={handlebutton}>1</button>
          <button className="btn" name="Wind Speed" onClick={handlebutton}>2</button>
          <button className="btn" name="Pressure" onClick={handlebutton}>3</button>
          <button className="btn" name="Select property" onClick={handlebutton}>0</button>
        </div>
      </div>

    </>
  );
}

export default App;
