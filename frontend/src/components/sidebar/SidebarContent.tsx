// components/sidebar/SidebarContent.tsx
import React, { useEffect, useState } from 'react';
import { ItemList } from './components/ItemList';
import { NoteInput } from './components/NoteInput';
import { useActions } from '../../context/ActionsContext';
import { NoteService } from '../../api/noteService';
import { Note } from '../../models/noteModel';
import { useAuth } from '../../context/AuthContext';
import { Column, HorizontalDivider, Row, ScrollView, Spacer } from '../../styles/shared/BaseLayout';
import { SearchBar } from '../searchbar/SearchBar';
import { EmptyButton } from '../../styles/shared/Button.styles';
import { FaGear } from 'react-icons/fa6';

export const SidebarContent = () => {
  const {tasks, calendarEvents, bulletPoints, isLoading, setNotificationMessage, setShowNotification, updateTasks, updateEvents, getLastSnapshot, semanticSearch, searchResults, setSearchResults} = useActions();
  const [text, setText] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getLastSnapshot();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setNoteLoading(true);

      const note: Note = {
        content: text.trim(),
        user_id: user?.id || '',
        category: 'Unsorted',
        cluster: -1,
      };

      const notificationMessage = await NoteService.addNote(note);

      if (notificationMessage === 'Calendar task created') {
        updateTasks();
      } else if (notificationMessage === 'Calendar event created') {
        updateEvents();
      }

      setNotificationMessage(notificationMessage);
      setShowNotification(true);
      setText('');
    } catch (error) {
      console.error('Unexpected error in handleSubmit:', error);
    } finally {
      setNoteLoading(false);
    }
  };

  return (
    <>
      <ScrollView direction='vertical'>
        <Column main='start' cross='start'>
          <Spacer height='md'/>
          <Row main='spaceBetween' cross='center'>
            <h1>Sparkpad</h1>
            {/* Add buttons here later */}
          </Row>
          <ItemList items={tasks} title='Tasks' />
          <HorizontalDivider />
          <ItemList items={calendarEvents} title='Events' /> 
          <HorizontalDivider />
          <ItemList items={bulletPoints} title='Snapshot' />
        </Column>
      </ScrollView>
      <Spacer expand={true} />
      <NoteInput
        text={text}
        isLoading={isLoading}
        noteLoading={noteLoading}
        setText={setText}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
