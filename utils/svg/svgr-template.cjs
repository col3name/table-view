const getSvgIconTemplate = (variables, { tpl }) => {
  const ComponentName = variables.componentName.substring(3) + 'Icon';
  return tpl`
import React, { SVGProps,  Ref, forwardRef } from "react";

import { IconPropsType } from "./icons.types";

${variables.interfaces};

type Props = IconPropsType & SVGProps<SVGSVGElement>;

export const ${ComponentName}: React.FC<Props> = forwardRef(function ${ComponentName}( props: Props, ref: Ref<SVGSVGElement>) {
    return (${variables.jsx});
});
`;
};

module.exports = getSvgIconTemplate;
