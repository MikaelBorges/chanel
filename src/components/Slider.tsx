import { slides } from "../data/slides";
import { useState } from "react";
import styles from "./Slider.module.scss";

export function Slider() {
  const [sliderPage, setSliderPage] = useState(0);
  const currentTransform = -sliderPage * 100;

  return (
    <article className={styles.slider} aria-label="slider">
      <ul
        style={{ transform: `translateX(${currentTransform}%)` }}
        className={styles.slides}
        aria-label="slides"
      >
        {slides.map(({ image, title, description, link }, index) => (
          <li key={index} className={styles.slide} aria-label="slide">
            {sliderPage !== 0 && (
              <button
                aria-label="previous slide"
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={() => setSliderPage((prev) => prev - 1)}
              />
            )}
            <div className={styles.slideText}>
              <div className={styles.slideTextSubcontainer}>
                <h2 className="title titleLevel2">{title}</h2>
                <p className="description">{description}</p>
                <a href={link.url} className={styles.link}>
                  {link.text}
                </a>
              </div>
            </div>
            <figure className={styles.slideImage}>
              <img src={image} alt="slide image" />
            </figure>
            {sliderPage + 1 !== slides.length && (
              <button
                aria-label="next slide"
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={() => setSliderPage((prev) => prev + 1)}
              />
            )}
          </li>
        ))}
      </ul>
      <div className={styles.pagination} aria-label="pagination">
        {sliderPage !== 0 && (
          <button
            aria-label="previous slide"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => setSliderPage((prev) => prev - 1)}
          />
        )}
        <span className={styles.paginationNumbers} aria-label="number of slide">
          {sliderPage + 1} / {slides.length}
        </span>
        {sliderPage + 1 !== slides.length && (
          <button
            aria-label="next slide"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => setSliderPage((prev) => prev + 1)}
          />
        )}
      </div>
    </article>
  );
}
