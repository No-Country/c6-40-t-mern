import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const ButtonNavar = ({ children, href }) => {
  const { asPath } = useRouter();
  // console.log("CURRENT", asPath);
  const isActive = asPath == href;

  return (
    <Link href={href}>
      <a className="hover:bg-gray-700 hover:text-white hover:rounded-lg hover:p-2.4 flex items-center gap-1"
        css={css`
          color: white;
          padding: 5px 10px;
          border: none;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          -webkit-user-select: none;
          -ms-user-select: none; 
          user-select: none; 
          text-decoration: ${isActive ? "underline" : "none"};
          color: ${isActive ? "#9c6419" : "white"};
        `}
      >
        {children}
      </a>
    </Link>
  );
};