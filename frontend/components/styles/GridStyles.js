import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  .chart {
    grid-column: 1 / -1;
  }
`;

export default Grid;
