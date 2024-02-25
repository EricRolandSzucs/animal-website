import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Schedule from "./Schedule";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  const handleSideImageClick = (index) => {
    setSlide(index);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data.map((item, idx) => {
        return (
          <img
            src={`/images/user/${item.image}`}
            alt={item.image}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
      <div className="mini-images">
            {data.length > 1 &&
              [1, 2, 3]
                .slice(0, Math.min(data.length - 1, 3))
                .map((offset) => {
                  const sideImageIndex =
                    (slide + offset) % data.length;
                  return (
                    <img
                      key={sideImageIndex}
                      src={`/images/user/${data[sideImageIndex].image}`}
                      alt={`Side ${offset + 1}`}
                      onClick={() => handleSideImageClick(sideImageIndex)}
                    />
                  );
                })}
      </div>
    </div>
  );
};