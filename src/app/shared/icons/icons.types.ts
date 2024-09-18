import { MouseEventHandler } from "react";

export type IconPropsType = {
  className?: string;
  fill?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};
