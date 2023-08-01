import "./App.css";
import hero from "./assets/images/hero.jpg";
import giedreMobile from "./assets/images/giedre-mobile.jpg";
import giedreDesktop from "./assets/images/giedre.jpg";
import imariMobile from "./assets/images/imari-mobile.jpg";
import imariDesktop from "./assets/images/imari.jpg";
import { useState, useEffect, useRef } from "react";
import { slides } from "./data/slides";
import { useOnScreen } from "./hooks/useOnScreen";
import "./App.css";

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
    const containers = document.getElementsByClassName("parallax-container");
    Array.from(containers).forEach((container) => {
      const image = container.children[0];
      setHeightParallaxContainer(image.height - image.height * 0.1);
    });
  };

  const isInViewport1 = useOnScreen(ref1);
  if (isInViewport1) window.addEventListener("scroll", handleScroll1);
  else window.removeEventListener("scroll", handleScroll1);

  const isInViewport2 = useOnScreen(ref2);
  if (isInViewport2) window.addEventListener("scroll", handleScroll2);
  else window.removeEventListener("scroll", handleScroll2);

  const currentTransform = -sliderPage * 100;

  useEffect(() => {
    const containers = document.getElementsByClassName("parallax-container");
    Array.from(containers).forEach((container) => {
      const image = container.children[0];
      image.onload = () =>
        setHeightParallaxContainer(image.height - image.height * 0.1);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll1);
      window.removeEventListener("scroll", handleScroll2);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="hero-section">
        <img className="hero-image" src={hero} alt="hero" />
        <p className="hero-title">go to the moon</p>
      </section>

      {/* <picture>
        <img src={giedreMobile} alt="giedre" />
        <source media="(min-width: 1440px)" srcSet={giedreDesktop} />
      </picture> */}

      <section className="main-section">
        <div className="title-block">
          <h1 className="title title-level1">over the moon*</h1>
          <p className="description">
            Quatre inconnus se rencontrent dans un ascenseur pour la Lune.
          </p>
        </div>

        <div
          style={{ height: heightParallaxContainer }}
          className="parallaxContainer"
          ref={ref1}
        >
          <img
            style={{
              bottom: -bottomRef1,
              position: heightParallaxContainer ? "absolute" : "initial",
            }}
            className="parallax-image mobile"
            src={giedreMobile}
            alt="giedre mobile"
          />
          <img
            style={{
              bottom: -bottomRef1,
              position: heightParallaxContainer ? "absolute" : "initial",
            }}
            className="parallax-image desktop"
            src={giedreDesktop}
            alt="giedre"
          />
        </div>

        <div className="slider">
          <div
            style={{ transform: `translateX(${currentTransform}%)` }}
            className="slides"
          >
            {slides.map(({ image, title, description, link }, index) => (
              <div key={index} className="slide">
                <div className="slide-text">
                  <div className="slide-text-subcontainer">
                    <h2 className="title title-level2">{title}</h2>
                    <p className="description">{description}</p>
                    <a href={link.url} className="link">
                      {link.text}
                    </a>
                  </div>
                </div>
                <div className="slide-image">
                  <img src={image} alt="slider1" />
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {sliderPage !== 0 && (
              <button
                className="arrow arrow-left"
                onClick={() => setSliderPage((prev) => prev - 1)}
              />
            )}
            <span className="pagination-numbers">
              {sliderPage + 1} / {slides.length}
            </span>
            {sliderPage + 1 !== slides.length && (
              <button
                className="arrow arrow-right"
                onClick={() => setSliderPage((prev) => prev + 1)}
              />
            )}
          </div>
        </div>

        <div className="mini-section">
          <a href="#" className="button">
            découvrir la collection
          </a>
        </div>

        <div className="parallax-container" ref={ref2}>
          <img
            style={{
              bottom: -bottomRef2,
            }}
            className="parallax-image"
            src={imariMobile}
            alt="imari mobile"
          />
        </div>

        <div className="mini-section">
          <h2 className="title title-level2">
            Découvrir les pièces en boutique
          </h2>
          <p className="description">
            Découvrez les nouvelles pièces dans votre boutique CHANEL.
          </p>
          <a href="#" className="button">
            Trouvez votre boutique
          </a>
        </div>

        <footer className="footer">
          <p className="disclaimer">*Destination lune</p>
        </footer>
      </section>
    </>
  );
}
