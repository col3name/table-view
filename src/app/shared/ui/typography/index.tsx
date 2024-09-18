import { HTMLProps } from 'react';

import styled from 'styled-components';

type H2Props = HTMLProps<HTMLHeadingElement> & {
  textAlign?: 'left' | 'center' | 'right';
};

export const H2 = ({ textAlign = 'left', ...props }: H2Props) => {
  return <H2Elelement style={{ textAlign }} {...props}></H2Elelement>;
};

const H2Elelement = styled.h2`
  font-family: Roboto, Arial, serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  color: #1f2939;
`;
