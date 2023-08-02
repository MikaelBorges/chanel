import hero from "./assets/images/hero.jpg";
import giedreMobile from "./assets/images/giedre-mobile.jpg";
import giedreDesktop from "./assets/images/giedre.jpg";
import imariMobile from "./assets/images/imari-mobile.jpg";
import imariDesktop from "./assets/images/imari.jpg";
import { useState, useEffect, useRef } from "react";
import { useOnScreen } from "./hooks/useOnScreen";
import styles from "./App.module.scss";
import { Slider } from "./components/Slider";

export default function App() {
  const [bottomRef1, setBottomRef1] = useState(0);
  const [bottomRef2, setBottomRef2] = useState(0);
  const [heightParallaxContainer, setHeightParallaxContainer] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const handleScroll1 = () => setBottomRef1(window.scrollY / 15);
  const handleScroll2 = () => setBottomRef2(window.scrollY / 15);

  const handleResize = () => {
    const image = ref1.current.children[0];
    setHeightParallaxContainer(image.height - image.height * 0.1);
  };

  const isInViewport1 = useOnScreen(ref1);
  if (isInViewport1) window.addEventListener("scroll", handleScroll1);
  else window.removeEventListener("scroll", handleScroll1);

  const isInViewport2 = useOnScreen(ref2);
  if (isInViewport2) window.addEventListener("scroll", handleScroll2);
  else window.removeEventListener("scroll", handleScroll2);

  useEffect(() => {
    const image = ref1.current.children[0];
    image.onload = () =>
      setHeightParallaxContainer(image.height - image.height * 0.1);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll1);
      window.removeEventListener("scroll", handleScroll2);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className={styles.heroSection}>
        <img className={styles.heroImage} src={hero} alt="hero section" />
        <p className={styles.heroTitle}>go to the moon</p>
      </section>

      <section className={styles.mainSection}>
        <article className={styles.titleBlock}>
          <h1 className="title titleLevel1">over the moon*</h1>
          <p className="description">
            Quatre inconnus se rencontrent dans un ascenseur pour la Lune.
          </p>
        </article>

        <picture
          style={{ height: heightParallaxContainer }}
          className={styles.parallaxContainer}
          ref={ref1}
        >
          <img
            style={{
              bottom: -bottomRef1,
              position: heightParallaxContainer ? "absolute" : "initial",
            }}
            className={`${styles.parallaxImage} ${styles.mobile}`}
            src={giedreMobile}
            alt="giedre mobile"
          />
          <img
            style={{
              bottom: -bottomRef1,
              position: heightParallaxContainer ? "absolute" : "initial",
            }}
            className={`${styles.parallaxImage} ${styles.desktop}`}
            src={giedreDesktop}
            alt="giedre desktop"
          />
        </picture>

        <Slider />

        <article className={styles.miniSection}>
          <a href="#" className={styles.button}>
            découvrir la collection
          </a>
        </article>

        <picture
          style={{ height: heightParallaxContainer }}
          className={styles.parallaxContainer}
          ref={ref2}
        >
          <img
            style={{
              bottom: -bottomRef2,
              position: heightParallaxContainer ? "absolute" : "initial",
            }}
            className={`${styles.parallaxImage} ${styles.mobile}`}
            src={imariMobile}
            alt="imari mobile"
          />
          <img
            style={{
              bottom: -bottomRef2,
              position: heightParallaxContainer ? "absolute" : "initial",
            }}
            className={`${styles.parallaxImage} ${styles.desktop}`}
            src={imariDesktop}
            alt="imari desktop"
          />
        </picture>

        <article className={styles.miniSection}>
          <h2 className="title titleLevel2">
            Découvrir les pièces en boutique
          </h2>
          <p className="description">
            Découvrez les nouvelles pièces dans votre boutique CHANEL.
          </p>
          <a href="#" className={styles.button}>
            Trouvez votre boutique
          </a>
        </article>

        <footer className={styles.footer}>
          <p className={styles.disclaimer}>*Destination lune</p>
        </footer>
      </section>
    </>
  );
}
