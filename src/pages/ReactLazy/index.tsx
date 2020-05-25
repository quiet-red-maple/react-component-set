import React, { useState, Suspense } from "react";
import { Input } from "antd";
const PDFPreview = React.lazy(() => import("../../containers/PdfView"));

const ReactLazy = () => {
  const [value, setValue] = useState("");

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <h1>用react-pdf库来测试使用react.lazy效果</h1>

      <Input onChange={changeValue} />
      <div style={{ paddingTop: 50 }}>
        {value && (
          <Suspense fallback={<div>Loading...</div>}>
            <PDFPreview title={value} />
          </Suspense>
        )}
      </div>

      <div>
        <h2>未使用lazy</h2>
        <img src={require("../../Img/1.jpg")} alt="" />
        <h2>使用lazy</h2>
        <img src={require("../../Img/2.jpg")} alt="" />
      </div>
    </div>
  );
};

export default ReactLazy;
