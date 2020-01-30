import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Display = ({ sizeInfo }) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };
      image.src = "img/sample-397x480.png";
    } else {
      const smallCanvas = createSmallCanvas(sourceImg, 128, 128);
      const blockCanvas = createBlockCanvas(smallCanvas);

      const { w, h } = drawCanvas(
        blockCanvas,
        canvasRef.current,
        sizeInfo.width,
        sizeInfo.height
      );
      const x = (sizeInfo.width - w) / 2;
      const y = (sizeInfo.height - h) / 2;

      setCanvasX(x);
      setCanvasY(y);
    }
  }, [sourceImg, sizeInfo]);

  return (
    <Container>
      <CanvasHolder left={canvasX} top={canvasY}>
        <canvas ref={canvasRef} />
      </CanvasHolder>
    </Container>
  );
};

export default Display;

const drawCanvas = (source, targetCanvas, maxTargetWidth, maxTargetHeight) => {
  const ctx = targetCanvas.getContext("2d");

  const sourceW = source.width;
  const sourceH = source.height;

  // limit maximum size to source image size (i.e. don't increase size)
  const maxWidth = Math.min(maxTargetWidth, sourceW);
  const maxHeight = Math.min(maxTargetHeight, sourceH);

  const widthToHeightRatio = sourceH / sourceW;
  const heightToWidthRatio = sourceW / sourceH;

  // set size based on max width
  let w = maxWidth;
  let h = w * widthToHeightRatio;

  // if that makes the h bigger than max
  if (h > maxHeight) {
    // set size based on max height
    h = maxHeight;
    w = h * heightToWidthRatio;
  }

  targetCanvas.width = w;
  targetCanvas.height = h;

  //	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  ctx.drawImage(source, 0, 0, sourceW, sourceH, 0, 0, w, h);

  // return the output width and height so it can be used to position canvas
  return { w, h };
};

const createSmallCanvas = (source, maxWidth, maxHeight) => {
  const sourceW = source.width;
  const sourceH = source.height;

  const wToHRatio = sourceH / sourceW;
  const hToWRatio = sourceW / sourceH;

  // allow maxHeight or maxWidth to be null
  if (!maxWidth) maxWidth = source.width;
  if (!maxHeight) maxHeight = source.height;

  let targetW = maxWidth;
  let targetH = targetW * wToHRatio;

  if (sourceH > maxHeight) {
    targetH = maxHeight;
    targetW = targetH * hToWRatio;
  }

  const smallCanvas = document.createElement("canvas");
  const ctx = smallCanvas.getContext("2d");
  smallCanvas.width = targetW;
  smallCanvas.height = targetH;

  ctx.drawImage(source, 0, 0, sourceW, sourceH, 0, 0, targetW, targetH);

  return smallCanvas;
};

const createBlockCanvas = inputCanvas => {
  const { width: inputW, height: inputH } = inputCanvas;

  const blockSize = 50;
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = inputW * blockSize;
  outputCanvas.height = inputH * blockSize;
  const outputCtx = outputCanvas.getContext("2d");

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let r, g, b, grey;
  const colour = "purple";

  for (let y = 0; y < inputH; y++) {
    for (let x = 0; x < inputW; x++) {
      const i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      grey = r * 0.2126 + g * 0.7152 + b * 0.0722;

      const decimalPercentage = 1 - grey / 255;
      const diam = blockSize * decimalPercentage * 1.3;

      outputCtx.fillStyle = colour;
      outputCtx.beginPath();
      outputCtx.arc(x * blockSize, y * blockSize, diam / 2, 0, 2 * Math.PI);
      outputCtx.fill();
    }
  }

  return outputCanvas;
};

// STYLES
const CanvasHolder = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  line-height: 0;
  /* box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); */
`;

const Container = styled.div`
  background: yellow;
  width: 100%;
  height: 100%;
`;
