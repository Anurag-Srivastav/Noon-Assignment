import React from "react";
import FastImage, { FastImageProps } from "react-native-fast-image";

export default function Image(props: FastImageProps) {
  return (
    <FastImage
      {...props}
      resizeMode={props.resizeMode || FastImage.resizeMode.cover}
    />
  );
}
