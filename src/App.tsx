import hero from "./assets/images/hero.jpg";
import giedreMobile from "./assets/images/giedre-mobile.jpg";
import giedreDesktop from "./assets/images/giedre.jpg";
import imariMobile from "./assets/images/imari-mobile.jpg";
import imariDesktop from "./assets/images/imari.jpg";
import { useState, useEffect, useRef } from "react";
import { slides } from "./data/slides";
import { useOnScreen } from "./hooks/useOnScreen";
import styles from "./App.module.scss";

export default function App() {
  const [bottomRef1, setBottomRef1] = useState(0);
  const [bottomRef2, setBottomRef2] = useState(0);
  const [heightParallaxContainer, setHeightParallaxContainer] = useState("");
  const [sliderPage, setSliderPage] = useState(0);
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

  const currentTransform = -sliderPage * 100;

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
        <img className={styles.heroImage} src={hero} alt="hero" />
        <p className={styles.heroTitle}>go to the moon</p>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.titleBlock}>
          <h1 className={`${styles.title} ${styles.titleLevel1}`}>
            over the moon*
          </h1>
          <p className={styles.description}>
            Quatre inconnus se rencontrent dans un ascenseur pour la Lune.
          </p>
        </div>

        <div
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
        </div>

        <div className={styles.slider}>
          <div
            style={{ transform: `translateX(${currentTransform}%)` }}
            className={styles.slides}
          >
            {slides.map(({ image, title, description, link }, index) => (
              <div key={index} className={styles.slide}>
                {sliderPage !== 0 && (
                  <button
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => setSliderPage((prev) => prev - 1)}
                  />
                )}
                <div className={styles.slideText}>
                  <div className={styles.slideTextSubcontainer}>
                    <h2 className={`${styles.title} ${styles.titleLevel2}`}>
                      {title}
                    </h2>
                    <p className={styles.description}>{description}</p>
                    <a href={link.url} className={styles.link}>
                      {link.text}
                    </a>
                  </div>
                </div>
                <div className={styles.slideImage}>
                  <img src={image} alt="slider1" />
                </div>
                {sliderPage + 1 !== slides.length && (
                  <button
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => setSliderPage((prev) => prev + 1)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {sliderPage !== 0 && (
              <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={() => setSliderPage((prev) => prev - 1)}
              />
            )}
            <span className={styles.paginationNumbers}>
              {sliderPage + 1} / {slides.length}
            </span>
            {sliderPage + 1 !== slides.length && (
              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={() => setSliderPage((prev) => prev + 1)}
              />
            )}
          </div>
        </div>

        <div className={styles.miniSection}>
          <a href="#" className={styles.button}>
            découvrir la collection
          </a>
        </div>

        <div
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
        </div>

        <div className={styles.miniSection}>
          <h2 className={`${styles.title} ${styles.titleLevel2}`}>
            Découvrir les pièces en boutique
          </h2>
          <p className={styles.description}>
            Découvrez les nouvelles pièces dans votre boutique CHANEL.
          </p>
          <a href="#" className={styles.button}>
            Trouvez votre boutique
          </a>
        </div>

        <footer className={styles.footer}>
          <p className={styles.disclaimer}>*Destination lune</p>
        </footer>
      </section>
    </>
  );
}
