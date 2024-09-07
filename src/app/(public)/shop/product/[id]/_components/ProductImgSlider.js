"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "./ProductImgSlider.css";
import Lightbox from "yet-another-react-lightbox";
import NextJsImage from "@/components/NextJsImage/NextJsImage";
import {
  Fullscreen,
  Zoom,
  Slideshow,
} from "yet-another-react-lightbox/plugins";
import img1 from "/public/images/shop-product/img1.png";
import img2 from "/public/images/shop-product/img2.png";
import img3 from "/public/images/shop-product/img3.png";
import img4 from "/public/images/shop-product/img4.png";

const images = [
  {
    key: 1,
    url: img1,
  },
  {
    key: 2,
    url: img2,
  },
  {
    key: 3,
    url: img3,
  },
  {
    key: 4,
    url: img4,
  },
];

export default function ProductImgSlider() {
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  // const [lightboxImageIndex, setlightboxImageIndex] = useState(-1); // Hide lightbox if index -1

  // // Define image slides for lightbox
  // const imageSlides = images?.map((image) => {
  //   return { key: 1, src: image.url };
  // });

  const settings = {
    customPaging: function (i) {
      return (
        <div>
          <Image
            src={images[i]?.url}
            alt={`product image ${currentImgIndex}`}
            className="mx-auto block w-1/2 p-4"
            layout="fill"
            objectFit="contain"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "product-img-slider",
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 1000,
    easing: "easeInOut",
  };

  return (
    <>
      <Slider {...settings}>
        {images?.map((img) => (
          <div
            key={img.key}
            onClick={() => setCurrentImgIndex(img.key)}
            className="product-img-container h-[590px] w-full rounded border-none bg-foundation-white-hover outline-none"
          >
            <Image
              src={img.url}
              alt={`product image ${currentImgIndex}`}
              width={300}
              height={300}
              className="mt-10 block object-cover"
              // onClick={() => setlightboxImageIndex(img.key)}
              title="Click to expand"
            />
          </div>
        ))}
      </Slider>

      {/* -------- Image Lightbox --------- */}
      {/* <Lightbox
        index={lightboxImageIndex}
        slides={imageSlides || []}
        open={lightboxImageIndex >= 0}
        close={() => setlightboxImageIndex(-1)}
        // render={{ slide: NextJsImage }}
        // plugins={[Fullscreen, Zoom, Slideshow]}
      /> */}
    </>
  );
}
