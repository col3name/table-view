import React, { SVGProps, Ref, forwardRef } from 'react';
import { IconPropsType } from './icons.types';
type Props = IconPropsType & SVGProps<SVGSVGElement>;
export const CloseIcon: React.FC<Props> = forwardRef(function CloseIcon(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        fill="#333"
        d="M16.067 15.183a.624.624 0 1 1-.884.884L10 10.884l-5.183 5.183a.625.625 0 1 1-.884-.884L9.117 10 3.933 4.817a.625.625 0 1 1 .884-.884L10 9.117l5.183-5.184a.625.625 0 0 1 .884.884L10.884 10z"
      />
    </svg>
  );
});
