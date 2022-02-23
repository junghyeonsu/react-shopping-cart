import React, { ReactNode } from "react";
import GNB from "../GNB";

interface Props {
  children: ReactNode;
}

const index = ({ children }: Props) => {
  return (
    <>
      <GNB />
      <main>{children}</main>
    </>
  );
};

export default index;
