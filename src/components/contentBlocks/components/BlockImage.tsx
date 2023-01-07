import React, { useState } from "react";
import { UploadFileEntity } from "@models";
import { ContentImage } from "components/contentImage";

const BlockImage = ({ file }: { file: UploadFileEntity["attributes"] }) => {
  const [open, setOpen] = useState(false);

  return (
    <ContentImage
      image={{ attributes: file }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    />
  );
};

export default BlockImage;
