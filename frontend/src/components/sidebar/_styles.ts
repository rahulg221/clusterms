import { styled } from "styled-components";
import { Container } from "../../styles/shared/BaseLayout";

export const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: ${({ theme }) => theme.spacing.lg};
  padding-left: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bgDark};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    height: 100dvh;
    -webkit-overflow-scrolling: touch;
  }
`;

export const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accentLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const Icon = styled.span<{accent?: boolean }>`
  color: ${({ theme, accent }) => accent ? theme.colors.accent : theme.colors.textLight};
  margin-right: ${({ theme, accent }) => accent ? 0 : theme.spacing.sm};
`;

export const TextBarForm = styled.form`
  align-items: flex-start;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TextInput = styled.textarea`
  flex: 1;
  width: 100%;
  min-height: 25vh;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  resize: none;
  line-height: 1.5;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgLight};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  &.inline {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .content {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    flex: 1;
  }

  .timer {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSize.xxs};
    margin-right: 8px;
  }
`;

export const ListContainer = styled(Container)`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;
