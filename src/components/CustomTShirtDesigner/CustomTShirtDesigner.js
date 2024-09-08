/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
// import { fabric } from 'fabric';
import tshirt from "./background_tshirt.png";
import Image from "next/image";

const TShirtDesigner = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("");
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasRef.current, options);
    // make the fabric.Canvas instance available to your app
    setCanvas(canvas);
    return () => {
      setCanvas(null);
      canvas.dispose();
    };
  }, []);

  const updateTshirtImage = (imageURL) => {
    fabric.Image.fromURL(imageURL, function (img) {
      img.scaleToHeight(300);
      img.scaleToWidth(300);
      canvas.centerObject(img);
      canvas.add(img);
      canvas.renderAll();
    });
  };

  const handleText = () => {
    const text = prompt("Enter the text:");
    if (text) {
      const newText = new fabric.IText(text, {
        left: 40,
        top: 100,
        fill: "#fff",
      });
      canvas.add(newText);
    }
  };

  const handleCustomPicture = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new window.Image();
      imgObj.src = event.target.result;
      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);
        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      };
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTShirtChange = (e) => {
    const value = e.target.value;
    updateTshirtImage(value);
    setColor(value);
  };

  const handleDeleteObject = (e) => {
    if (e.keyCode === 46) {
      canvas.remove(canvas.getActiveObject());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteObject);
    return () => document.removeEventListener("keydown", handleDeleteObject);
  }, [canvas]);

  return (
    <div className="container mx-auto p-5">
      <h4 className="mb-6 text-center text-2xl font-bold">
        Custom T-Shirt Design Tool
      </h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1 flex justify-center">
          <div id="tshirt-div" className="relative h-96 w-64 bg-white">
            <div id="tshirt-backgroundpicture">
              {/* <img
                id="tshirt-backgroundpicture1"
                src={tshirt}
                alt="background"
              /> */}
              <Image src={tshirt} alt="tshirt" />
              <img
                id="tshirt-backgroundpicture2"
                src="./red.png"
                style={{ display: "none" }}
                alt="red"
              />
              <img
                id="tshirt-backgroundpicture3"
                src="./blue.png"
                style={{ display: "none" }}
                alt="blue"
              />
              <img
                id="tshirt-backgroundpicture4"
                src="./green.png"
                style={{ display: "none" }}
                alt="green"
              />
            </div>
            <div className="absolute inset-0">
              <canvas
                id="tshirt-canvas"
                width="250"
                height="400"
                style={{ border: "2px solid red" }}
                ref={canvasRef}
              ></canvas>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <label htmlFor="tshirt-design" className="mb-2 block font-medium">
            T-Shirt Logo:
          </label>
          <select
            id="tshirt-design"
            className="w-full rounded border p-2"
            onChange={handleTShirtChange}
          >
            <option value="">Select One of Our Logos</option>
            <option value="./batman.png">Batman</option>
          </select>
          <br />
          <br />
          <label htmlFor="tshirt-text" className="mb-2 block font-medium">
            T-Shirt Text:
          </label>
          <button
            id="tshirt-text"
            className="btn btn-outline-dark rounded border bg-gray-200 px-4 py-2"
            onClick={handleText}
          >
            Add Text
          </button>
          <br />
          <br />
          <label
            htmlFor="tshirt-custompicture"
            className="mb-2 block font-medium"
          >
            Upload Your Own Design:
          </label>
          <input
            type="file"
            id="tshirt-custompicture"
            className="w-full rounded border p-2"
            onChange={handleCustomPicture}
          />
        </div>
        <div className="col-span-1">
          <form>
            <p className="mb-4 text-center font-bold">Size</p>
            <div className="flex flex-col items-center">
              <label className="mb-2 inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">S</span>
              </label>
              {/* Add more sizes as needed */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TShirtDesigner;
