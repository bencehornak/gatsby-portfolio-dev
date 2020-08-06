import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 4rem 0;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;

  h1 {
    font-size: 36pt;
    width: 400px;
  }
  img {
    width: 40%;
    margin: 0.5rem 0;
  }
  @media (max-width: 766px) {
    h1 {
      width: 100%;
    }
    img {
      width: 80%;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const Screenshot = styled.img``;
