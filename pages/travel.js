import React, { useEffect, useState } from "react";
import styles from "../styles/travel.module.css";
import Rideselect from "./rideselect";
import { useSendTransaction } from "wagmi";
import { useContext } from "react";
import { UberContext } from "../context/uberContext";

const Travel = () => {
  const [point, setpoint] = useState("from");
  const [showbtn, setshowbtn] = useState(true);
  const {
    pickup,
    setpickup,
    drop,
    setdrop,
    address,
    type,
    amount,
    paid,
    success,
    setsuccess,
  } = useContext(UberContext);

  const to = process.env.WALLET_ADDRESS;

  const { sendTransaction } = useSendTransaction({
    request: {
      to,
      value: (amount * 1e18).toString(),
    },
    onSuccess: () => {
      setsuccess(true);
      setpaid(amount);
    },
  });

  useEffect(() => {
    if (success) {
      storeTripDetails();
    }
  }, [success]);

  const storeTripDetails = async () => {
    try {
      await fetch("/api/collectDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickuplocation: pickup,
          droplocation: drop,
          user: address,
          price: amount,
          ridetype: type,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {address ? (
        <div className={styles.container}>
          <div className={styles.location}>
            <div>
              <h3 className={styles.point}>
                {point === "from" ? "Where can we pick you up ?" : "Where to ?"}
              </h3>
            </div>
            <div className={styles.travel}>
              <input
                onFocus={() => setpoint("from")}
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => {
                  setpickup(e.target.value);
                }}
              ></input>
            </div>
            <div className={styles.symbols}>
              <div className={styles.circle}>◦</div>
              <hr className={styles.line}></hr>
              <div className={styles.square}>⌑</div>
            </div>
            <div className={styles.travel}>
              <input
                onFocus={() => setpoint("to")}
                value={drop}
                placeholder="Drop location"
                onChange={(e) => {
                  setdrop(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {pickup && drop && <Rideselect />}
          {type && !success && (
            <div>
              <button
                className={styles.btn}
                onClick={() => {
                  sendTransaction();
                }}
              >
                Confirm {type}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className={styles.connect}>Please connect wallet</p>
      )}
    </div>
  );
};

export default Travel;
