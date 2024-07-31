import axios from "axios";
import cn from "classnames";
import { LayoutGroup, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Confetti from "react-dom-confetti";

const confettiConfig = {
  angle: 90,
  spread: 144,
  width: "10px",
  height: "10px",
  duration: 3000,
  dragFriction: 0.12,
  stagger: 2,
  startVelocity: 23,
  elementCount: 40,
  colors: ["#6ed2b7", "#98d0ff", "#ffc6d7", "#ffe3a4", "#1ac194"],
};

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    getSubscriberCount();
  }, []);

  useEffect(() => {
    success &&
      setTimeout(function () {
        setActive(true);
      }, 600);
  }, [success]);

  const getSubscriberCount = async () => {
    try {
      const response = await axios.get("api/subscriber-count");
      const count = response.data.count;
      setMemberCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  const setSubscriberCount = async () => {
    try {
      await axios.post("api/subscribe", {
        email: email,
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      controls.start({
        x: [0, 5, -5, 5, -5, 0],
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.copy}>
        <h2 className={styles.title} style={{ marginBottom: 10 }}>
          Let&apos;s talk about design, development and technology.
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 1024 1024"
            style={{ marginLeft: "20px" }}
          >
            <path
              fill="currentColor"
              d="M424.816 679.344c230.944 0 409.902-131.903 407.15-327.631c0-173.184-183.216-311.632-414.16-311.632C186.83 40.081-.353 178.529-.353 351.713c0 107.872 52.912 222.88 163.408 279.376c0 .656-.192 1.152-.192 1.872c0 46.88-39.025 111.152-54.4 137.664h.064c-1.216 2.88-1.952 6-1.952 9.344c0 13.12 10.576 23.664 23.696 23.664c1.935 0 5.088-.4 6.223-.4c.32 0 .433 0 .4.095c81.665-13.344 202.257-105.248 220.129-127.024c18.336 2.72 30.72 3.152 46.08 3.152c6.528-.016 13.473-.112 21.713-.112m-94.129-68.879l-40.977 34.032c-9.504 10.976-50.8 45.44-86.351 67.808c21.648-61.68 20.704-81.216 20.704-81.216l3.008-39.152l-34.88-17.808c-88.672-45.344-128.528-139.744-128.528-222.4c0-137.664 158.864-247.632 354.16-247.632c195.28 0 350.16 109.968 350.16 247.632c-.609 152.608-145.872 264.624-341.152 264.624c0 0-29.808 1.152-60.4-3.376zm693.643-.272c0-86.736-33.887-152.881-118.446-202.513c-2.064 23.072-8.64 47.824-15.793 69.568c54.656 37.777 70.256 76.56 70.256 132.944c0 69.025-32.16 119.09-106.912 157.345l-31.84 15.808s3.312 82 8.224 102.752c-62.448-45.776-83.905-84-83.905-84l-33.664 5.184c-13.311 1.935-49.311 1.967-49.311 1.967c-86.944 0-151.376-20.72-206.336-63.744c14.928-.912-89.185-.88-91.505 1.153c63.568 77.631 167.473 126.592 297.84 126.592c7.089 0 13.089.064 18.72.064c13.28 0 24-.368 39.84-2.688c15.489 18.784 102.225 101.504 172.816 113.008c-.032-.065.064-.065.368-.065c.944 0 3.68.336 5.344.336c11.344 0 20.496-9.12 20.496-20.464c0-2.88-.656-5.6-1.68-8.063h.064c-13.28-22.88-34.128-89.744-34.128-130.256c0-.624-.192-1.056-.192-1.632c95.504-48.832 139.744-120.08 139.744-213.296"
            />
          </svg>
        </h2>
        <p className={styles.body}>
          Software as a service, product design, application development, coffee
          and more.
        </p>
      </div>
      <motion.input
        name="email"
        className={styles.emailInput}
        placeholder="Email address"
        value={email}
        onChange={(event) => {
          return setEmail(event.target.value);
        }}
        animate={controls}
      />
      <div className={styles.footer}>
        <button className={styles.subscribeButton} onClick={setSubscriberCount}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.256"
            height="18.256"
            viewBox="0 0 18.256 18.256"
          >
            <g transform="translate(5.363 5.325)">
              <path
                d="M14.581,7.05,7.05,14.581"
                transform="translate(-7.05 -7.012)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
              <path
                d="M10,7l5.287.037.038,5.287"
                transform="translate(-7.756 -7)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </g>
            <path d="M0,0H18.256V18.256H0Z" fill="none"></path>
          </svg>
          Let&apos;s work
        </button>
        <p
          style={{ color: "#8A949E" }}
          className={cn(styles.pica, styles.counter)}
        >
          You&apos;ll be partner number{" "}
          <span
            className={styles.count}
            style={{
              fontFamily: "var(--moranga)",
              fontSize: 24,
              color: "var(--text)",
            }}
          >
            {memberCount}
          </span>
        </p>
        <p
          style={{ color: "#8A949E" }}
          className={cn(styles.pica, styles.mobileCounter)}
        >
          <span
            className={styles.count}
            style={{
              fontFamily: "var(--moranga)",
              fontSize: 24,
              color: "var(--text)",
            }}
          >
            {memberCount}
          </span>{" "}
          subscribers
        </p>
      </div>
      <LayoutGroup>
        {success && (
          <motion.div
            className={styles.success}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.img
              className={styles.memoji}
              src="images/confeti.png"
              initial={{
                scale: 0,
                rotate: 45,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.5,
              }}
            />
            <div className={styles.confettiContainer}>
              <Confetti active={active} config={confettiConfig} />
            </div>
          </motion.div>
        )}
      </LayoutGroup>
    </div>
  );
};
