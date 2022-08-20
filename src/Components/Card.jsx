import React from 'react';
import styled from 'styled-components';
const StyledCard = styled.div`
box-shadow: 1px 3px 16px 4px #7a7a7a4a ;
padding:1rem;
height:28em;
width:20em;
`;
const Card = ({children}) => {
  return (
    <StyledCard className="card  col-sm-12 col-md-5  col-lg-6 mx-auto">
      {children}
    </StyledCard>
  )
}

export default Card
