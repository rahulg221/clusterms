import { useEffect, useState } from 'react';
import {
  TextBarForm,
  TextInput,
  SummaryContainer,
  BulletIcon,
  BulletItem,
  BulletList,
  EventsContainer,
  Divider,
  FloatingButton,
} from './SideBar.Styles';
import { NoteService } from '../../api/noteService';
import { useAuth } from '../../context/AuthContext';
import { Note } from '../../models/noteModel';
import { Notification } from '../notif/Notification';
import { useActions } from '../../context/ActionsContext';
import { PrimaryButton, SecondaryButton } from '../../styles/shared/Button.styles';
import { ResizableSidebar } from '../resize/Resize';
import { CountdownTimer } from '../sidebar/CountdownTimer';
import { FaLightbulb, FaRegCalendarCheck, FaThumbtack } from 'react-icons/fa';
import { MdClose, MdMenu } from 'react-icons/md';

export const SideBar = () => {
  const [text, setText] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuth();
  const {
    setNotificationMessage,
    setShowNotification,
    getLastSnapshot,
    updateTasks,
    updateEvents,
    isLoading,
    notificationMessage,
    showNotification,
    bulletPoints,
    calendarEvents,
    tasks,
  } = useActions();

  useEffect(() => {
    getLastSnapshot();
  }, []);  

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);  

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
      <FloatingButton onClick={() => setSidebarOpen(prev => !prev)}>
        {sidebarOpen ? '-' : '+'}
      </FloatingButton>
      <ResizableSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
        <TextBarForm onSubmit={handleSubmit}>
          <h2>Capture a thought</h2>
          <TextInput
            as="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            disabled={isLoading}
            rows={1}
          />
          <PrimaryButton width="100%" type="submit" disabled={isLoading || noteLoading}>
            {noteLoading ? 'Creating...' : 'Create Note'}
          </PrimaryButton>
        </TextBarForm>

        <h2>My Calendar</h2>
        <EventsContainer>
          <BulletList>
            {tasks.map((string, index) => (
              <BulletItem key={index}>
                <BulletIcon>
                  <FaThumbtack size={16} />
                </BulletIcon>
                <span>{string}</span>
              </BulletItem>
            ))}
            <Divider />
            {calendarEvents.map((event, index) => (
              <BulletItem key={index}>
                <BulletIcon>
                  <FaRegCalendarCheck size={16} />
                </BulletIcon>
                <CountdownTimer eventString={event} />
              </BulletItem>
            ))}
          </BulletList>
        </EventsContainer>

        <h2>My Summary</h2>
        <SummaryContainer>
          <BulletList>
            {bulletPoints.map((bulletPoint, index) => (
              <BulletItem key={index}>
                <BulletIcon>
                  <FaLightbulb size={16} />
                </BulletIcon>
                <span>{bulletPoint}</span>
              </BulletItem>
            ))}
          </BulletList>
        </SummaryContainer>
      </ResizableSidebar>

      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

