import { slides } from "../data/slides";
import { useState } from "react";
import styles from "./Slider.module.scss";

export function Slider() {
  const [sliderPage, setSliderPage] = useState(0);
  const currentTransform = -sliderPage * 100;

  return (
    <article className={styles.slider}>
      <ul
        style={{ transform: `translateX(${currentTransform}%)` }}
        className={styles.slides}
      >
        {slides.map(({ image, title, description, link }, index) => (
          <li key={index} className={styles.slide}>
            {sliderPage !== 0 && (
              <button
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
            <div className={styles.slideImage}>
              <img src={image} alt="slide image" />
            </div>
            {sliderPage + 1 !== slides.length && (
              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={() => setSliderPage((prev) => prev + 1)}
              />
            )}
          </li>
        ))}
      </ul>
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
    </article>
  );
}
