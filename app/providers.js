"use client";
import { Toaster } from "react-hot-toast";
import React from "react";

function Providers({ children }) {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}

export default Providers;
