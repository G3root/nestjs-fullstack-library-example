import * as React from "react";
import { Navbar } from "~/components";
import Toolbar from "@mui/material/Toolbar";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Toolbar />
      {children}
    </>
  );
}
