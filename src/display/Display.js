import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Display = ({ sizeInfo }) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [paths, setPaths] = useState([]);
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);
  const canvasRef = React.useRef(null);

  const blockSize = 6;
  const lineThickness = 3;
  const lineColour = "black";
  const maxPointOffset = blockSize * 1.2;

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
      const blockData = getBlockData(smallCanvas);

      // const { w, h } = drawCanvas(
      //   blockCanvas,
      //   canvasRef.current,
      //   sizeInfo.width,
      //   sizeInfo.height
      // );

      // const x = (sizeInfo.width - w) / 2;
      // const y = (sizeInfo.height - h) / 2;

      // setCanvasX(x);
      // setCanvasY(y);

      setPaths(createPaths(blockData, blockSize, maxPointOffset));
    }
  }, [sourceImg, sizeInfo]);

  return (
    <Container>
      <CanvasHolder left={canvasX} top={canvasY}>
        {/* <canvas ref={canvasRef} /> */}
        <svg width={sizeInfo.width} height={sizeInfo.height}>
          {paths.map((path, index) => (
            <polyline
              key={index}
              fill={"none"}
              stroke={lineColour}
              strokeWidth={lineThickness}
              points={path}
            />
          ))}
        </svg>
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

const createPaths = (blockData, blockSize, maxPointOffset) => {
  let points = "0,0";
  let paths = [];

  const { width, height, rows } = blockData;
  const totalRows = rows.length;
  const totalCols = rows[0].length;

  let i, x, y, colIndex, row, rowIndex, pointOffset;

  for (rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    points = "";
    row = rows[rowIndex];

    for (colIndex = 0; colIndex < totalCols; colIndex++) {
      i = rowIndex * totalCols + colIndex;

      x = colIndex * blockSize;
      pointOffset = row[colIndex] * maxPointOffset;
      y = rowIndex * blockSize - pointOffset;

      points += ` ${x},${y}`;
    }

    paths.push(points);
  }

  return paths;
};

const getBlockData = inputCanvas => {
  const { width: inputW, height: inputH } = inputCanvas;
  const blockData = {
    width: inputW,
    height: inputH,
    rows: []
  };

  const blockSize = 50;
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = inputW * blockSize;
  outputCanvas.height = inputH * blockSize;
  const outputCtx = outputCanvas.getContext("2d");

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let i, r, g, b, brightness, decimalPercentage, x, y;
  const colour = "purple";

  for (y = 0; y < inputH; y++) {
    // for (y = 0; y < 5; y++) {
    const row = [];

    for (x = 0; x < inputW; x++) {
      i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

      decimalPercentage = 1 - brightness / 255;
      row.push(decimalPercentage);
    }
    blockData.rows.push(row);
  }

  return blockData;
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
  background: white;
  width: 100%;
  height: 100%;
`;
