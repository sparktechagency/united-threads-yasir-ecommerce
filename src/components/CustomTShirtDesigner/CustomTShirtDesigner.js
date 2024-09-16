/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import front from "./front.jpg";
import back from "./back.jpg";
import alternateTshirt from "./orange.png";
import { Type } from "lucide-react";
import { Upload } from "lucide-react";
import { ColorPicker, Tooltip } from "antd";
import { Button } from "@/components/ui/button";
import TextStylingWidget from "./_components/TextStylingWidget";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import { Image as AntImage } from "antd";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

// Motion variants
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
  },
};

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

export default function CustomTShirtDesigner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const canvasRef = useRef(null);
  const [color, setColor] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [overlayColor, setOverlayColor] = useState("");
  const [finalImage, setFinalImage] = useState("");
  const [selectedSizeOptions, setSelectedSizeOptions] = useState(null);
  const [sizeCollapsed, setSizeCollapsed] = useState(false);
  const [colorCollapsed, setColorCollapsed] = useState(false);

  // Currently active image side
  const [activeImageSide, setActiveImageSide] = useState("front");
  const [activeImage, setActiveImage] = useState(front);
  const [savedFrontImage, setSavedFrontImage] = useState("");
  const [savedBackImage, setSavedBackImage] = useState("");

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
  }, [activeImage]);

  //  // Handle changing the image side on button click
  const handleChangeImageSide = (whichSide) => {
    Swal.fire({
      title: "Save Changes?",
      text: "Save this before editing the other part or the progress will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleExportImage();
        } catch (error) {
          console.log(error);
        }

        if (activeImageSide !== whichSide) {
          setActiveImageSide(activeImageSide === "front" ? "back" : "front");
        }
      } else {
        if (activeImageSide !== whichSide) {
          setActiveImageSide(activeImageSide === "front" ? "back" : "front");
        }
      }
    });
  };

  const handleColorChange = (e) => {
    if (typeof e === "string") {
      setOverlayColor(e);
      return;
    }
    setOverlayColor(e.target.value);
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
        canvas.renderAll();
      };

      e.target.value = "";
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Function to merge canvas content and export final image
  // const handleExportImage = () => {
  //   const tempCanvas = document.createElement("canvas");
  //   tempCanvas.width = canvas.getWidth();
  //   tempCanvas.height = canvas.getHeight();
  //   const context = tempCanvas.getContext("2d");

  //   const imgElement = new window.Image();
  //   imgElement.src = activeImage?.src;

  //   imgElement.onload = () => {
  //     context.drawImage(imgElement, 0, 0, tempCanvas.width, tempCanvas.height);

  //     if (overlayColor) {
  //       context.globalCompositeOperation = "source-atop";
  //       context.fillStyle = overlayColor;
  //       context.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  //       context.globalCompositeOperation = "source-over";
  //     }

  //     const canvasDataUrl = canvas.toDataURL();
  //     const canvasImage = new window.Image();
  //     canvasImage.src = canvasDataUrl;
  //     canvasImage.onload = () => {
  //       context.drawImage(canvasImage, 0, 0);
  //       const finalImageUrl = tempCanvas.toDataURL();

  //       setFinalImage(finalImageUrl);
  //       // console.log(activeImageSide);

  //       if (activeImageSide === "front") {
  //         setSavedFrontImage(finalImageUrl);
  //         toast.success("Image saved successfully!");
  //       } else {
  //         setSavedBackImage(finalImageUrl);
  //         toast.success("Image saved successfully!");
  //       }

  //       // Clear the canvas but retain functionality
  //       canvas.clear();
  //       // // Re-add the T-shirt background image after clearing
  //       // const bgImg = new fabric.Image(imgElement, {
  //       //   selectable: false,
  //       // });
  //       // canvas.setBackgroundImage(bgImg, canvas.renderAll.bind(canvas));
  //       // canvas.renderAll(); // Render the canvas again to make it functional
  //     };
  //   };
  // };

  const handleExportImage = () => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.getWidth();
    tempCanvas.height = canvas.getHeight();
    const context = tempCanvas.getContext("2d");

    const imgElement = new window.Image();
    imgElement.src = activeImage?.src;

    imgElement.onload = () => {
      context.drawImage(imgElement, 0, 0, tempCanvas.width, tempCanvas.height);

      if (overlayColor) {
        context.globalCompositeOperation = "lighten"; // Use multiply to blend the color and image
        context.fillStyle = overlayColor;
        context.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        context.globalCompositeOperation = "source-over"; // Reset to default for further operations
      }

      const canvasDataUrl = canvas.toDataURL();
      const canvasImage = new window.Image();
      canvasImage.src = canvasDataUrl;
      canvasImage.onload = () => {
        context.drawImage(canvasImage, 0, 0);
        const finalImageUrl = tempCanvas.toDataURL();

        setFinalImage(finalImageUrl);

        if (activeImageSide === "front") {
          setSavedFrontImage(finalImageUrl);
          toast.success("Image saved successfully!");
        } else {
          setSavedBackImage(finalImageUrl);
          toast.success("Image saved successfully!");
        }

        // Clear the canvas but retain functionality
        canvas.clear();
      };
    };
  };

  const onSendQuoteSubmit = (data) => {
    const toastId = toast.loading("Processing...");

    setTimeout(() => {
      toast.success("Quote sent successfully!", {
        id: toastId,
      });
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSendQuoteSubmit)} className="space-y-8">
        <div className="flex-start-between">
          {/* Left */}
          <div className="lg:w-[25%]">
            <div className="flex w-max flex-col items-center gap-y-7 rounded bg-lightGray p-3 text-primary-black">
              <Tooltip placement="right" title="Add Text">
                <button
                  type="button"
                  className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                  onClick={handleAddText}
                >
                  <Type />
                  <p>Add Text</p>
                </button>
              </Tooltip>

              <Tooltip placement="right" title="Upload Your Logo/Design">
                <button
                  type="submit"
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
                <button
                  type="button"
                  className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                >
                  <input
                    type="color"
                    value={overlayColor}
                    onChange={handleColorChange}
                    className="h-7 w-10"
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
            <div
              id="tshirt-div"
              className="group relative mx-auto w-[500px] bg-white"
            >
              <div className="relative">
                <Image
                  src={activeImageSide === "front" ? front : back}
                  alt="tshirt"
                  height={500}
                  width={500}
                  className="mx-auto block w-[95%]"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: overlayColor,
                    mixBlendMode: "lighten",
                    pointerEvents: "none",
                  }}
                ></div>
              </div>

              <div className="absolute inset-0 h-[500px] w-[500px] border border-dashed border-yellow-600">
                <canvas id="tshirt-canvas" ref={canvasRef}></canvas>
              </div>

              <Button
                type="button"
                className="absolute -right-10 -top-4 gap-x-2 rounded-full px-6 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
                onClick={handleExportImage}
              >
                <Save size={16} /> Save
              </Button>
            </div>

            {/* Change image side buttons */}
            <div className="my-10 flex items-center justify-center gap-x-5 text-primary-black">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "group w-[22%] rounded-full border border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white",
                  activeImageSide === "front" &&
                    "bg-primary-black text-primary-white",
                )}
                onClick={() => handleChangeImageSide("front")}
              >
                Front Side
              </Button>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-[22%] rounded-full border border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white",
                  activeImageSide === "back" &&
                    "bg-primary-black text-primary-white",
                )}
                onClick={() => handleChangeImageSide("back")}
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
                <AnimatePresence initial={false} mode="wait">
                  <motion.div initial="initial" animate="animate" exit="exit">
                    <button
                      type="button"
                      className="flex-center-between w-full rounded-t-3xl bg-lightGray p-3"
                      onClick={() => setSizeCollapsed(!sizeCollapsed)}
                    >
                      <h5 className="text-base font-semibold">Select Size</h5>
                      <ChevronsUpDown size={20} />
                    </button>
                    <Separator className="bg-primary-black/50" />

                    {!sizeCollapsed && (
                      <motion.div
                        variants={fadeVariants}
                        className="mx-auto grid gap-2 rounded-b-3xl bg-lightGray px-6 py-4 transition-all duration-300 ease-in-out lg:grid-cols-2"
                      >
                        {SIZE_OPTIONS.map((size) => (
                          <div
                            key={size}
                            className="flex-center-start gap-x-2 text-lg"
                          >
                            <Checkbox id={size} />
                            <label htmlFor={size}>{size}</label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="mt-8"
                    layout="position"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <button
                      type="button"
                      className="flex-center-between w-full rounded-t-3xl bg-lightGray p-3"
                      onClick={() => setColorCollapsed(!colorCollapsed)}
                    >
                      <h5 className="text-base font-semibold">
                        Color Variants
                      </h5>
                      <ChevronsUpDown size={20} />
                    </button>
                    <Separator className="bg-primary-black/50" />

                    {!colorCollapsed && (
                      <motion.div
                        variants={fadeVariants}
                        className="mx-auto grid gap-2 rounded-b-3xl bg-lightGray px-6 py-4 lg:grid-cols-2"
                      >
                        {COLOR_VARIANTS.map((color) => (
                          <button
                            type="button"
                            key={color.hex}
                            className="flex-center-start gap-x-2"
                            onClick={() => handleColorChange(color.hex)}
                          >
                            <Tooltip placement="top" title={color.hex}>
                              <div
                                style={{ backgroundColor: color.hex }}
                                className={cn(
                                  "h-5 w-5 rounded-full",
                                  overlayColor === color.hex &&
                                    "border-2 border-yellow-500",
                                )}
                              />
                            </Tooltip>
                            <h5 className="text-lg font-medium">
                              {color.name}
                            </h5>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
              <TabsContent
                value="preview"
                className="rounded-b-xl border border-dashed p-3"
              >
                <div>
                  <h4 className="text-lg font-semibold">Front Side</h4>
                  {savedFrontImage ? (
                    <div className="mx-auto h-[300px] w-[300px]">
                      <AntImage src={savedFrontImage} alt="front side image" />
                    </div>
                  ) : (
                    <p className="text-center">No saved image</p>
                  )}
                </div>

                <Separator className="my-10" />

                <div>
                  <h4 className="text-lg font-semibold">Back Side</h4>
                  {savedBackImage ? (
                    <div className="mx-auto h-[300px] w-[300px]">
                      <AntImage src={savedBackImage} alt="back side image" />
                    </div>
                  ) : (
                    <p className="text-center">No saved image</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom --- Additional options */}
        <h3 className="mb-8 mt-20 text-2xl font-bold">Additional Options</h3>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="category"
            className="mb-1 block font-semibold text-primary-black"
          >
            Category
          </Label>
          <Input
            type="text"
            id="category"
            defaultValue="T-Shirt"
            disabled={true}
            {...register("category")}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="quantity"
            className="mb-1 block font-semibold text-primary-black"
          >
            Quantity(pcs)
          </Label>
          <Input
            type="number"
            id="quantity"
            placeholder="Enter your quantity"
            {...register("quantity", {
              required: true,
            })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.quantity && (
            <p className="mt-1 text-danger">Quantity is required</p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="materials"
            className="mb-1 block font-semibold text-primary-black"
          >
            Material Preferences
          </Label>
          <Textarea
            id="materials"
            placeholder="Combinations of materials are looking for 10% cotton , 90% polyester"
            {...register("materials", {
              required: true,
            })}
            className="min-h-32 rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.materials && (
            <p className="mt-1 text-danger">
              Tell us about your material preference for better understanding
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="group mt-10 h-[2.8rem] w-full gap-x-2 rounded-xl bg-primary-black font-semibold"
        >
          Send Quote <AnimatedArrow />
        </Button>
      </form>
    </div>
  );
}
