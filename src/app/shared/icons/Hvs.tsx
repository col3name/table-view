import React, { SVGProps, Ref, forwardRef } from 'react'; // import classnames from 'classnames';
import { IconPropsType } from './icons.types';
type Props = IconPropsType & SVGProps<SVGSVGElement>;
export const HvsIcon: React.FC<Props> = forwardRef(function HvsIcon(
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
      <path
        fill="#3698FA"
        d="M8.892 1.42c.002-.023.008-.053.008-.079C8.9 1.153 8.76 1 8.589 1c-.073 0-.125.03-.144.039C7.388 1.49 3.3 5.957 3.3 9.878 3.3 12.707 5.39 15 7.967 15c2.834 0 4.666-2.62 4.666-5.122 0-4.161-4.468-4.93-3.74-8.458"
      />
    </svg>
  );
});
