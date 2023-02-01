import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSendTransaction } from "wagmi";
import { UberContext } from "../context/uberContext";
import styles from "../styles/ride.module.css";

const Rideselect = () => {
  const { price, success, settype, setamount } = useContext(UberContext);
  const [ridelist, setridelist] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/getRides");
        const data = await response.json();
        setridelist(data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className={styles.container}>
      <p style={{ color: "black", textAlign: "center", fontSize: "0.8rem" }}>
        Choose a ride from below
      </p>
      <hr style={{ opacity: "0.4" }}></hr>
      {success ? (
        <p
          style={{
            color: "black",
            textAlign: "center",
            fontSize: "1.5rem",
            marginTop: "6rem",
          }}
        >
          Your Ride is arriving 🚖
        </p>
      ) : (
        <div>
          {ridelist.map((e) => {
            return (
              <div
                key={e.service}
                className={[`${styles.rides}`]}
                onClick={() => {
                  settype(e.service);
                  price < 10000
                    ? setamount((price * e.pricemultiplier) / 1000)
                    : setamount((price * e.pricemultiplier) / 300000);
                }}
              >
                <img src={e.iconUrl}></img>
                <div className={styles.inner_header}>
                  <p className={styles.name}>{e.service}</p>
                  <p className={styles.arrive}>5 min away</p>
                </div>
                <div className={styles.price}>
                  <p>{`${
                    price < 8000
                      ? ((price * e.pricemultiplier) / 1000).toFixed(2)
                      : ((price * e.pricemultiplier) / 300000).toFixed(2)
                  } Matic`}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Rideselect;
