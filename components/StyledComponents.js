import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export const FlexChild = styled.div`
  flex: 1;
  margin: 10px;
`;