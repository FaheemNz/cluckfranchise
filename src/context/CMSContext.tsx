"use client";

import { createContext, useContext } from "react";

const CMSContext = createContext<any>(null);

export function CMSProvider({
  children,
  cmsData,
}: {
  children: React.ReactNode;
  cmsData: any;
}) {
  return (
    <CMSContext.Provider value={cmsData}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}