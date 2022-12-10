import React, { useEffect, useState } from "react";
import Swipe from "react-easy-swipe";
import "./style/carousel.css";

function Carousel({
    data,
    time,
    width,
    height,
    captionStyle,
    slideNumberStyle,
    radius,
    slideNumber,
    style,
    captionPosition,
    dots,
    slideBackgroundColor,
    slideImageFit,
    thumbnails,
    thumbnailWidth,
    showNavBtn = true,
}) {
    //Initialize States
    const [slide, setSlide] = useState(0);
    const [change, setChange] = useState(0);

    //Function to change slide
    const addSlide = (n) => {
        if (slide + n >= data.length) setSlide(0);
        else if (slide + n < 0) setSlide(data.length - 1);
        else setSlide(slide + n);
    };

    function scrollTo(el) {
        const elLeft = el.offsetLeft + el.offsetWidth;
        const elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;

        // check if element not in view
        if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
            el.parentNode.scroll({ left: elLeft - elParentLeft, behavior: "smooth" });
        } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
            el.parentNode.scroll({
                left: el.offsetLeft - el.parentNode.offsetLeft,
                behavior: "smooth",
            });
        }
    }

    //Listens to slide state changes
    useEffect(() => {
        var slides = document.getElementsByClassName("carousel-item");
        var dots = document.getElementsByClassName("dot");

        var slideIndex = slide;
        var i;
        for (i = 0; i < data.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        //If thumbnails are enabled
        if (thumbnails) {
            var thumbnailsArray = document.getElementsByClassName("thumbnail");
            for (i = 0; i < thumbnailsArray.length; i++) {
                thumbnailsArray[i].className = thumbnailsArray[i].className.replace(
                    " active-thumbnail",
                    ""
                );
            }
            if (thumbnailsArray[slideIndex] !== undefined)
                thumbnailsArray[slideIndex].className += " active-thumbnail";
            scrollTo(document.getElementById(`thumbnail-${slideIndex}`));
        }

        if (slides[slideIndex] !== undefined)
            slides[slideIndex].style.display = "block";
        if (dots[slideIndex] !== undefined) dots[slideIndex].className += " active";
    }, [slide]);

    return (
        <div style={style} className="box">
            <div
                style={{
                    maxWidth: width ? width : "600px",
                    maxHeight: height ? height : "400px",
                }}
            >
                <Swipe
                    onSwipeRight={() => {
                        addSlide(-1);
                        setChange(!change);
                    }}
                    onSwipeLeft={() => {
                        addSlide(1);
                        setChange(!change);
                    }}
                >
                    <div
                        className="carousel-container"
                        style={{
                            maxWidth: width ? width : "600px",
                            height: height ? height : "400px",
                            backgroundColor: slideBackgroundColor
                                ? slideBackgroundColor
                                : "darkgrey",
                            borderRadius: radius,
                        }}
                    >
                        {data.map((item, index) => {
                            return (
                                <div
                                    className="carousel-item"
                                    style={{
                                        maxWidth: width ? width : "600px",
                                        maxHeight: height ? height : "400px",
                                    }}
                                    key={index}
                                >
                                    {slideNumber && (
                                        <div className="slide-number" style={slideNumberStyle}>
                                            {index + 1} / {data.length}
                                        </div>
                                    )}
                                    <img
                                        src={require("../../photos/" + item)}
                                        alt={item.caption}
                                        className="carousel-image"
                                        style={{
                                            borderRadius: radius,
                                            objectFit: slideImageFit ? slideImageFit : "cover",
                                        }}
                                    />
                                    <div
                                        className={`carousel-caption-${captionPosition ? captionPosition : "bottom"
                                            }`}
                                        style={captionStyle}
                                        dangerouslySetInnerHTML={{ __html: item.caption }}
                                    ></div>
                                </div>
                            );
                        })}

                        {showNavBtn && (
                            <a
                                className="prev"
                                onClick={(e) => {
                                    addSlide(-1);
                                    setChange(!change);
                                }}
                            >
                                &#10094;
                            </a>
                        )}
                        {showNavBtn && (
                            <a
                                className="next"
                                onClick={(e) => {
                                    addSlide(1);
                                    setChange(!change);
                                }}
                            >
                                &#10095;
                            </a>
                        )}
                        {dots && (
                            <div className="dots">
                                {data.map((item, index) => {
                                    return (
                                        <span
                                            className="dot"
                                            key={index}
                                            onClick={(e) => {
                                                setSlide(index);
                                                setChange(!change);
                                            }}
                                        ></span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </Swipe>
            </div>
            {thumbnails && (
                <div
                    className="thumbnails"
                    id="thumbnail-div"
                    style={{ maxWidth: width }}
                >
                    {data.map((item, index) => {
                        return (
                            <img
                                width={thumbnailWidth ? thumbnailWidth : "100px"}
                                src={require("../../photos/" + item)}
                                alt={item.caption}
                                className="thumbnail"
                                id={`thumbnail-${index}`}
                                key={index}
                                onClick={(e) => {
                                    setSlide(index);
                                    setChange(!change);
                                }}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export { Carousel };