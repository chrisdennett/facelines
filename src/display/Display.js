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
      const { w, h } = drawCanvas(
        sourceImg,
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

const CanvasHolder = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  line-height: 0;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

const Container = styled.div`
  background: yellow;
  width: 100%;
  height: 100%;
`;
