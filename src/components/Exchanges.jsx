import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Baseurl } from "./baseUrl";
import Loader from "./Loader";
import coin from "../coin.png"; // Import coin image
import eth from "../eth.png"; // Import eth image
import "./Exchanges.css";
import OurModel from "./OurModel";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${Baseurl}/exchanges`);
      console.log(data);
      setExchanges(data);
      setLoading(false);
    };
    getExchangesData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <OurModel />
          <div className="exchange-container">
            <div className="exchange-images">
              <img src={coin} alt="Coin" width={50} height={50} />
              <img src={eth} alt="Ethereum" width={50} height={50} />
            </div>
            <div>
              {exchanges.map((item, i) => {
                return (
                  <div key={i} className="ex-cards">
                    <div className="image">
                      <img height={"80px"} src={item.image} alt="" />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="price">
                      {item.trade_volume_24h_btc.toFixed(0)}
                    </div>
                    <div className="rank">{item.trust_score_rank}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
