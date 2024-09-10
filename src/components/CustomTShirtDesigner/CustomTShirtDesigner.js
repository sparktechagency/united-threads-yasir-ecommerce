/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import tshirt from "./white-tshirt.png";
import alternateTshirt from "./orange.png";
import { Type } from "lucide-react";
import { Upload } from "lucide-react";
import { Tooltip } from "antd";
import { Button } from "@/components/ui/button";
import TextStylingWidget from "./_components/TextStylingWidget";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const COLOR_VARIANTS = [
  {
    name: "Black",
    hex: "#000000",
  },
  {
    name: "White",
    hex: "#FFFFFF",
  },
  {
    name: "Blue Spruce",
    hex: "#536758",
  },

  {
    name: "True Navy",
    hex: "#183045",
  },
  {
    name: "Seafoam",
    hex: "#609A95",
  },
  {
    name: "Coral",
    hex: "#F9B9B9",
  },

  {
    name: "Orange",
    hex: "#FFA500",
  },
];

const TShirtDesigner = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [imageUrl, setImageUrl] = useState(tshirt);
  const [overlayColor, setOverlayColor] = useState("");
  const [finalImage, setFinalImage] = useState("");
  const [selectedSizeOptions, setSelectedSizeOptions] = useState(null);
  const [sizeCollapsed, setSizeCollapsed] = useState(false);
  const [colorCollapsed, setColorCollapsed] = useState(false);

  // Currently active image side
  const [activeImageSide, setActiveImageSide] = useState("front");

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
    if (typeof e === "string") {
      setOverlayColor(e);
      return;
    }
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

  // Function to add custom picture
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

  // Function to change image side
  const handleChangeImageSide = () => {
    if (activeImageSide === "front") {
      setActiveImageSide("back");
      return;
    }

    setActiveImageSide("front");
  };

  return (
    <>
      <div className="flex-start-between">
        {/* Left */}
        <div className="lg:w-[25%]">
          <div className="flex w-max flex-col items-center gap-y-7 rounded bg-lightGray p-3 text-primary-black">
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

              <input
                type="file"
                id="custom-image-upload-input"
                onChange={handleCustomPicture}
                className="hidden"
              />
            </Tooltip>

            <Tooltip placement="right" title="Choose T-shirt color">
              <button className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80">
                <input
                  type="color"
                  value={overlayColor}
                  onChange={handleColorChange}
                  title="Choose T-shirt color"
                />
                <p>Color</p>
              </button>
            </Tooltip>
          </div>

          <TextStylingWidget
            handleStyleChange={handleStyleChange}
            activeObject={activeObject}
          />
        </div>

        {/* Center */}
        <div className="lg:w-[50%]">
          <div id="tshirt-div" className="relative mx-auto w-[500px] bg-white">
            <div className="flex-center-center h-max w-full">
              <img
                src={imageUrl?.src}
                alt="tshirt"
                className="mx-auto block w-full"
              />
            </div>

            <div
              className="absolute inset-0"
              style={{
                backgroundColor: overlayColor,
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}
            ></div>

            <div className="absolute inset-0 h-[500px] w-[500px] border border-dashed border-yellow-600">
              <canvas id="tshirt-canvas" ref={canvasRef}></canvas>
            </div>
          </div>

          {/* Change image side buttons */}
          <div className="my-10 flex items-center justify-center gap-x-5 text-primary-black">
            <Button
              variant="outline"
              className={cn(
                "group w-[22%] rounded-full border border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white",
                activeImageSide === "front" &&
                  "bg-primary-black text-primary-white",
              )}
              onClick={handleChangeImageSide}
            >
              Front Side
            </Button>
            <Button
              variant="outline"
              className={cn(
                "w-[22%] rounded-full border border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white",
                activeImageSide === "back" &&
                  "bg-primary-black text-primary-white",
              )}
              onClick={handleChangeImageSide}
            >
              Back Side
            </Button>
          </div>
        </div>

        {/* Right */}
        <div className="h-full lg:w-[30%]">
          <Tabs defaultValue="options" className="w-full">
            <TabsList className="w-full py-5">
              <TabsTrigger
                value="options"
                className="w-1/2 px-10 py-2 font-medium data-[state=active]:font-extrabold"
              >
                Options
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="w-1/2 px-10 py-2 font-medium"
              >
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="options" className="py-4">
              <div>
                <div className="flex-center-between rounded-t-3xl bg-lightGray p-3">
                  <h5 className="text-base font-semibold">Select Size</h5>
                  <ChevronsUpDown size={20} />
                </div>
                <Separator className="bg-primary-black/50" />

                <div className="mx-auto grid gap-2 rounded-b-3xl bg-lightGray px-6 py-4 lg:grid-cols-2">
                  {SIZE_OPTIONS.map((size) => (
                    <div
                      key={size}
                      className="flex-center-start gap-x-2 text-lg"
                    >
                      <Checkbox id={size} />
                      <label htmlFor={size}>{size}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex-center-between rounded-t-3xl bg-lightGray p-3">
                  <h5 className="text-base font-semibold">Color Variants</h5>
                  <ChevronsUpDown size={20} />
                </div>
                <Separator className="bg-primary-black/50" />

                <div className="mx-auto grid gap-2 rounded-b-3xl bg-lightGray px-6 py-4 lg:grid-cols-2">
                  {COLOR_VARIANTS.map((color) => (
                    <button
                      key={color.hex}
                      className="flex-center-start gap-x-2"
                      onClick={() => handleColorChange(color.hex)}
                    >
                      <div
                        style={{ backgroundColor: color.hex }}
                        className={cn(
                          "h-5 w-5 rounded-full",
                          overlayColor === color.hex &&
                            "border-2 border-yellow-500",
                        )}
                      />
                      <h5 className="text-lg font-medium">{color.name}</h5>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview">
              Change your password here.
            </TabsContent>
          </Tabs>

          <button onClick={handleExportImage}>Get Final Image</button>
          {finalImage && <img src={finalImage} alt="Final T-shirt Design" />}
        </div>
      </div>
    </>
  );
};

export default TShirtDesigner;
