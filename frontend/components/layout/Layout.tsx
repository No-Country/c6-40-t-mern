import { Navbar } from "./Navbar";
import { injectGlobal } from "@emotion/css";
import { css } from "@emotion/react";
import { Footer } from "./Footer";

injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap');
body{
  padding: 0;
margin: 0;
font-family: 'Nanum Gothic', sans-serif;
}

`
export const Layout = ({ children }) => (
  <div css={css`
  display: flex;
  flex-direction: column;
  min-height: 130vh;
  justify-content: space-between;
`}>
    <Navbar>
      <div>{children}</div>
    </Navbar>
    <Footer/>
  </div>
);