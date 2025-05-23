import { styled } from "styled-components";
import { Container } from "../../styles/shared/BaseLayout";

export const SidebarContainer = styled.div<{ isSidebarVisible: boolean }>`
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.bgDark};
  border-radius: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: ${({ theme, isSidebarVisible }) => isSidebarVisible ? theme.spacing.md : '0px'};
  padding-right: ${({ theme, isSidebarVisible }) => isSidebarVisible ? theme.spacing.md : '0px'};
  transition: all 0.4s ease;
  width: ${({ isSidebarVisible }) => isSidebarVisible ? '275px' : '0px'};
  align-items: ${({ isSidebarVisible }) => isSidebarVisible ? 'start' : 'center'};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgDark};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
      width: ${({ isSidebarVisible }) => isSidebarVisible ? '100%' : '0px'};
  }
`;

export const SummaryContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
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

export const DateHint = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textFaint};
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left: 10px;
  bottom: 0px;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const Icon = styled.span<{accent?: boolean }>`
  color: ${({ theme, accent }) => accent ? theme.colors.accent : theme.colors.textLight};
`;

export const TextBarForm = styled.form`
  align-items: flex-start;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TextInput = styled.textarea`
  flex: 1;
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: none;
  background-color: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  resize: none;
  line-height: 1.5;
  font-family: inherit;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }

  &::-webkit-scrollbar {
    width: 4px;
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

  &.inline {
    flex-direction: row;
    align-items: center;

    width: 100%;             
    overflow: hidden;        
  }

  .content {
    flex: 1;
    min-width: 0;              
    max-width: 100%;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  .timer {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

export const ListContainer = styled(Container)`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;
