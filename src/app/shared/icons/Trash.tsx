import React, { SVGProps, Ref, forwardRef } from 'react';
import { IconPropsType } from './icons.types';
type Props = IconPropsType & SVGProps<SVGSVGElement>;
export const TrashIcon: React.FC<Props> = forwardRef(function TrashIcon(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      ref={ref}
      {...props}
    >
      <path fill="#9DA6B4" d="M7.333 6v6H6V6zM10 6v6H8.667V6z" />
      <path
        fill="#9DA6B4"
        fillRule="evenodd"
        d="M4.853.667h6.294l.667 2h2.853V4h-1.334l-.666 11.333H3.333L2.667 4H1.333V2.667h2.853zm.739 2h4.816L10.186 2H5.814zM4 4l.667 10h6.666L12 4z"
        clipRule="evenodd"
      />
    </svg>
  );
});
