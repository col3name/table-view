import {MouseEventHandler} from "react";

export type IconPropsType = {
    className?: string;
    onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};