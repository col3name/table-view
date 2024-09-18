import styled from "styled-components";

export const Container = styled.div<{ $hidden?: boolean }>`
  display: ${(props) => (props.$hidden ? "none" : "flex")};
  flex-direction: column;

  gap: 4px;
  margin: 0 auto;
  max-width: 1400px;
`;
