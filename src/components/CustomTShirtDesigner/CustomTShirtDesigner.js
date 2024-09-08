"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import tshirt from "./background_tshirt.png";
import Image from "next/image";
import { Type } from "lucide-react";
import { Upload } from "lucide-react";
import { Tooltip } from "antd";
import { Label } from "../ui/label";
import TextStylingWidget from "./_components/TextStylingWidget";

const TShirtDesigner = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const activeObjectRef = useRef(null);

  // Initialize the Fabric.js canvas on mount
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      selection: true,
    });

    setCanvas(canvasInstance);

    // Update activeObject on object selection
    canvasInstance.on("selection:created", (event) => {
      setActiveObject(canvasInstance.getActiveObject());
    });

    // Update activeObject on object selection update
    canvasInstance.on("selection:updated", (event) => {
      setActiveObject(canvasInstance.getActiveObject());
    });

    // Clear activeObject when selection is cleared
    canvasInstance.on("selection:cleared", () => {
      setActiveObject(null);
    });

    return () => {
      canvasInstance.dispose();
    };
  }, []);

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
    if (e.keyCode === 46 && activeObject) {
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

  return (
    <>
      <div className="border-red flex-start-between">
        {/* Design Options */}
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
              <button className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80">
                <Upload />
                <p>Upload</p>
              </button>
            </Tooltip>
          </div>

          {/* {activeObject && (
          )} */}
          <TextStylingWidget
            handleStyleChange={handleStyleChange}
            activeObject={activeObject}
          />
        </div>

        {/* Apparel Design */}
        <div className="border-red lg:w-[50%]">
          <div id="tshirt-div" className="relative mx-auto bg-white lg:w-max">
            {/* Product Image */}
            <div className="flex-center-center h-max w-full">
              <Image
                src={tshirt}
                alt="tshirt"
                className="mx-auto block h-max w-max"
              />
            </div>

            {/* Canvas */}
            <div className="absolute inset-0">
              <canvas
                id="tshirt-canvas"
                className="h-full w-full border-2 border-yellow-600"
                ref={canvasRef}
              ></canvas>
            </div>
          </div>
        </div>

        <div className="h-full border-2 border-blue-400 lg:w-[30%]"></div>
      </div>
    </>
  );
};

export default TShirtDesigner;
