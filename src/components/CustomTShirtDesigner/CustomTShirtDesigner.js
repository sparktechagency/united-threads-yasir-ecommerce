/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import tshirt from "./background_tshirt.png";
import alternateTshirt from "./orange.png";
import { Type } from "lucide-react";
import { Upload } from "lucide-react";
import { Tooltip } from "antd";
import TextStylingWidget from "./_components/TextStylingWidget";

const TShirtDesigner = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const activeObjectRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(tshirt);
  const [overlayColor, setOverlayColor] = useState("");
  const [finalImage, setFinalImage] = useState("");

  // Initialize the Fabric.js canvas on mount
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      selection: true,
    });

    setCanvas(canvasInstance);

    // Update activeObject on object selection
    canvasInstance.on("selection:created", () => {
      setActiveObject(canvasInstance.getActiveObject());
    });

    canvasInstance.on("selection:updated", () => {
      setActiveObject(canvasInstance.getActiveObject());
    });

    canvasInstance.on("selection:cleared", () => {
      setActiveObject(null);
    });

    canvasInstance.on("mouse:wheel", (opt) => {
      opt.e.preventDefault();
      opt.e.stopPropagation();

      let delta = opt.e.deltaY;
      let zoom = canvasInstance.getZoom();
      zoom = zoom + delta / 200;

      if (zoom > 3) zoom = 3;
      if (zoom < 0.5) zoom = 0.5;

      canvasInstance.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    });

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  // Handle changing the image on button click
  const handleChangeImage = () => {
    if (canvas) {
      canvas.clear();
    }
    setImageUrl((prev) => (prev === tshirt ? alternateTshirt : tshirt));
  };

  const handleColorChange = (e) => {
    setOverlayColor(e.target.value); // Set the overlay color to the selected color
  };

  const handleAddText = () => {
    const text = new fabric.IText("Double click to edit", {
      left: 50,
      top: 100,
      fill: "#000000",
      fontFamily: "Arial",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setActiveObject(text);
    canvas.renderAll();
  };

  const handleStyleChange = (style, value) => {
    if (activeObject && activeObject?.type === "i-text") {
      activeObject?.set(style, value);
      canvas.renderAll();
    }
  };

  const handleDeleteObject = (e) => {
    if (e.key === "Delete" && activeObject) {
      canvas.remove(activeObject);
      setActiveObject(null);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteObject);
    return () => {
      document.removeEventListener("keydown", handleDeleteObject);
    };
  }, [activeObject, canvas]);

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
        canvas.setActiveObject(img);
        setActiveObject(img);
        canvas.renderAll();
      };
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Function to merge canvas content and export final image
  const handleExportImage = () => {
    // Create a temporary canvas element
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.getWidth();
    tempCanvas.height = canvas.getHeight();
    const context = tempCanvas.getContext("2d");

    // Draw the T-shirt image
    const imgElement = new window.Image();
    imgElement.src = imageUrl?.src;

    imgElement.onload = () => {
      // Draw the T-shirt image on the canvas first
      context.drawImage(imgElement, 0, 0, tempCanvas.width, tempCanvas.height);

      // Add overlay color, but clip it to the T-shirt's area
      if (overlayColor) {
        // Set the global composite operation to "source-atop" to draw within the image boundaries
        context.globalCompositeOperation = "source-atop";
        context.fillStyle = overlayColor;
        context.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Reset the composite operation to the default
        context.globalCompositeOperation = "source-over";
      }

      // Now draw the canvas content (text and custom images) on top of the T-shirt and overlay
      const canvasDataUrl = canvas.toDataURL(); // Get the current canvas content (text, images, etc.)
      const canvasImage = new window.Image();
      canvasImage.src = canvasDataUrl;
      canvasImage.onload = () => {
        context.drawImage(canvasImage, 0, 0); // Draw the canvas content on top of the overlay

        // Export the final merged image as data URL
        const finalImageUrl = tempCanvas.toDataURL();
        setFinalImage(finalImageUrl); // Save the final image URL
      };
    };
  };

  return (
    <>
      <div className="border-red flex-start-between">
        <div className="border-red lg:w-[25%]">
          <div className="flex w-max flex-col items-center gap-y-7 bg-lightGray p-3 text-primary-black">
            <Tooltip placement="right" title="Add Text">
              <button
                className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                onClick={handleAddText}
              >
                <Type />
                <p>Add Text</p>
              </button>
            </Tooltip>

            <Tooltip placement="right" title="Upload Your Logo/Design">
              <button
                className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                onClick={() =>
                  document.getElementById("custom-image-upload-input").click()
                }
              >
                <Upload />
                <p>Upload</p>
              </button>

              <button onClick={handleChangeImage}>Change Image</button>

              <input
                type="file"
                id="custom-image-upload-input"
                onChange={handleCustomPicture}
                className="hidden"
              />
            </Tooltip>

            <input
              type="color"
              value={overlayColor}
              onChange={handleColorChange}
              title="Choose T-shirt color"
            />
          </div>

          <TextStylingWidget
            handleStyleChange={handleStyleChange}
            activeObject={activeObject}
          />
        </div>

        <div className="border-red lg:w-[50%]">
          <div id="tshirt-div" className="relative mx-auto bg-white lg:w-max">
            <div className="flex-center-center h-max w-full">
              <img
                src={imageUrl?.src}
                alt="tshirt"
                className="mx-auto block h-max w-max"
              />
            </div>

            <div
              className="absolute inset-0"
              style={{
                backgroundColor: overlayColor,
                mixBlendMode: "lighten",
                pointerEvents: "none",
              }}
            ></div>

            <div className="absolute inset-0">
              <canvas
                id="tshirt-canvas"
                className="h-full w-full border-2 border-yellow-600"
                ref={canvasRef}
              ></canvas>
            </div>
          </div>
        </div>

        <div className="h-full border-2 border-blue-400 lg:w-[30%]">
          <button onClick={handleExportImage}>Get Final Image</button>
          {finalImage && <img src={finalImage} alt="Final T-shirt Design" />}
        </div>
      </div>
    </>
  );
};

export default TShirtDesigner;
