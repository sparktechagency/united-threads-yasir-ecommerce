import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";

export default function Providers({ children }) {
  return (
    <div>
      <AntdRegistry>{children}</AntdRegistry>
    </div>
  );
}
