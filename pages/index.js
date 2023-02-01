import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./navbar";
import Map from "./map";
import Travel from "./travel";

export default function Home() {
  return (
    <div className={styles.container} suppressHydrationWarning>
      <Head>
        <title>Web3 Uber Clone</title>
        <meta name="description" content="Uber , Taxi" />
      </Head>
      <main>
        <Navbar />
        <div className={styles.content}>
          <Map />
          <Travel />
        </div>
      </main>
      <footer>
        <p
          style={{
            fontSize: "1rem",
            position: "absolute",
            bottom: "1rem",
            right: "3rem",
          }}
        >
          Made with ❤️ by Vinay
        </p>
      </footer>
    </div>
  );
}
