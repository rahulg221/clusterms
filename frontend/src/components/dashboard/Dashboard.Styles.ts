import styled from 'styled-components';

export const Divider = styled.div`
  flex: 1; /* This is the key to spacing */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  margin: 0 8px;

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

export const DashboardWrapper = styled.div`
  flex: 1;
  height: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.xl};
  padding-left: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPure};
  
  h1 {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  @media (max-width: 768px) {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: start;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin: 0;
    white-space: nowrap;
  }
`;
