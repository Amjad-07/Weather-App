import React, { useState } from 'react'
// import cloud from "./assets/images/cloud.png"
// import cloudysun from "./assets/images/cloudysun.png"
// import rain from "./assets/images/rain.png"
// import snow from "./assets/images/snow.png"
// import sun from "./assets/images/sun.png"
import humidity from "./assets/images/humidity.png"
import wind from "./assets/images/wind.png"





export const App = () => {
  const [image, setImage] = useState(null);
  const [cel, setCel] = useState(0)
  const [city, setCity] = useState("")
  const [bm, setCbm] = useState("")
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [hum, setHum] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [text, setText] = useState("")
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);





  async function search() {
    setLoading(true)
    let key = "bd99b662d00c065c05523382965ea092"
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}&units=Metric`;


    try {
      let res = await fetch(api);
      let data = await res.json();
      setLoading(false)


      if (data.cod === "404") {
        console.log("not found");
        setNotFound(true)
        setLoading(false)
        return
      }
      let apil = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setImage(apil)


      setNotFound(false)

      setCel(data.main.temp);
      setCity(data.name);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setHum(data.main.humidity);
      setSpeed(data.wind.speed);
      setCbm(data.sys.country);








    } catch (error) {
      console.error("error occured:", error.message);


    }
    finally {
      setLoading(false)

    }
  }
  function onCity(e) {
    setText(e.target.value)




  }


  function entering(e) {
    if (e.key === "Enter") {
      search()
    }


  }












  return (
    <>
      <div className='input-container'>
        <div className='inputs'>
          <input type="text" onChange={onCity} value={text} onKeyDown={entering} placeholder='Chennai' />
          <i class="fa-solid fa-magnifying-glass fa-beat-fade" onClick={search}></i></div>

{!loading?(
!notFound ? (
        <><div className='image'>
            <img src={image} alt="" />
          </div><div className='place'>
              <h2 style={{ marginBottom: "10px" }}>{cel}°C</h2>
              <h1 style={{ marginBottom: "10px", color: "orange" }}>{city}</h1>
              <p style={{ marginBottom: "10px" }}>{bm}</p>
              <div className='size'>
                <div className='lat'>
                  <p style={{color:"black"}}>Latitude</p><span>{lat}</span>
                </div>
                <div className='lon'>
                  <p style={{color:"black"}}>Longitude</p><span>{lon}</span>
                </div>
              </div>
            </div><div className='humy'>
              <div>
                <img src={humidity} alt="" /><br />
                <p>{hum}%</p>
                <p style={{ opacity: "0.7",  color:"black"}}>Humidity</p>
              </div>
              <div>
                <img src={wind} alt="" />
                <p>{speed} km/hr</p>
                <p style={{ opacity: "0.7", color:"black"}  }>Speed</p>
              </div>
            </div>
            </>):
            (<h4 style={{ textAlign: "center", color: "red" }}>City not found. Please try again.</h4>)):
            (<h4 style={{textAlign:"center"}}>loading....</h4>)}


        <div className='footer'>
          <p style={{opacity:"0.5"}}>Developed by</p><span style={{color:"black"}}>Amjad</span>

        </div>



      </div>

    </>
  )
}
