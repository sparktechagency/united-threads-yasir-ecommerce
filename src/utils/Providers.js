"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

export default function Providers({ children }) {
  return (
    <div>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AntdRegistry>{children}</AntdRegistry>
        </PersistGate>
      </ReduxProvider>
    </div>
  );
}
