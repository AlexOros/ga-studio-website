import { UploadFileEntity } from "@models";

export type Heading = {
  type: "header";
  data: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    // Text can contain links..
    text: string;
  };
};

export type Text = {
  type: "paragraph";
  data: {
    // Text can contain links..
    text: string;
  };
};

export type List = {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: string[];
  };
};

export type Quote = {
  type: "quote";
  data: {
    alignment: string;
    caption: string;
    text: string;
  };
};

export type Delimiter = {
  type: "delimiter";
  data: null;
};

export type Table = {
  type: "table";
  data: {
    content: Array<string[]>;
    withHeadings: boolean;
  };
};

export type Image = {
  type: "image";
  data: {
    caption: string;
    stretched: boolean;
    file: UploadFileEntity["attributes"];
  };
};

export type Block = (
  | Image
  | Table
  | Delimiter
  | Quote
  | List
  | Heading
  | Text
) & {
  id: string;
};
