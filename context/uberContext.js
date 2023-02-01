import { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const UberContext = createContext();

export const UberProvider = ({ children }) => {
  const [amount, setamount] = useState();
  const [pickup, setpickup] = useState("");
  const [drop, setdrop] = useState();
  const [price, setprice] = useState();
  const [pickupcoordinates, setpickupcoordinates] = useState();
  const [dropcoordinates, setdropcoordinates] = useState();
  const [success, setsuccess] = useState(false);
  const [paid, setpaid] = useState();
  const [type, settype] = useState();
  const { address } = useAccount();

  const createLocationCoordinatePromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/locationCoordinates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: locationName,
          }),
        });

        const data = await response.json();

        if (data.message === "success") {
          switch (locationType) {
            case "pickup":
              setpickupcoordinates(data.data.features[0].center);
              break;
            case "drop":
              setdropcoordinates(data.data.features[0].center);
              break;
          }
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  };

  useEffect(() => {
    if (pickupcoordinates && dropcoordinates) {
      try {
        (async () => {
          const response = await fetch("/api/getDuration", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              pickupcoordinates: pickupcoordinates,
              dropcoordinates: dropcoordinates,
            }),
          });
          const data = await response.json();
          console.log(data);
          setprice(Math.round(await data.data));
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [pickupcoordinates, dropcoordinates]);

  useEffect(() => {
    if (pickup && drop) {
      (async () => {
        await Promise.all([
          createLocationCoordinatePromise(pickup, "pickup"),
          createLocationCoordinatePromise(drop, "drop"),
        ]);
      })();
    } else return;
  }, [pickup, drop]);

  return (
    <UberContext.Provider
      value={{
        pickup,
        setpickup,
        drop,
        setdrop,
        pickupcoordinates,
        setpickupcoordinates,
        dropcoordinates,
        setdropcoordinates,
        address,
        price,
        setpaid,
        success,
        setsuccess,
        type,
        settype,
        amount,
        setamount,
      }}
    >
      {children}
    </UberContext.Provider>
  );
};
