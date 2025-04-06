import { styled } from "styled-components";

export const SidebarContainer = styled.div`
  height: 100vh;
  width: 280px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.bgDark};

  h2 {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.bgLight};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textLight};
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 100vh;
    max-height: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    -webkit-overflow-scrolling: touch;
  }
`;

export const DragHandle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 100%;
  cursor: ew-resize;
  background-color: transparent;

  @media (max-width: 768px) {
    display: none; // hide drag handle on mobile
  }
`;
