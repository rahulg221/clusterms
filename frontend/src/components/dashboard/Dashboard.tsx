import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { 
    DashboardWrapper,
} from './Dashboard.Styles';
import { SecondaryButton, TextButton } from '../../styles/shared/Button.styles';
import { NoteCategories } from '../categories/NoteCategories';
import { NotesList } from '../noteslist/NotesList';
import { NoteService } from '../../api/noteService';
import { Notification } from '../notif/Notification';
import { Modal } from '../modal/Modal';
import { useActions } from '../../context/ActionsContext';
import { MdEventAvailable, MdLogout } from 'react-icons/md';
import CalendarService from '../../api/calendarService';
import { ThemeToggle } from '../themetoggle/ThemeToggle';
import { NotesRow } from '../notesrow/NotesRow';
import { Grid, ElevatedContainer, Spacer, Row } from '../../styles/shared/BaseLayout';
import { MdArrowBack } from 'react-icons/md';
import { LoadingSpinner } from '../../styles/shared/LoadingSpinner';
import { TreeView } from '../tree/Tree';
import { Summary } from '../summary/Summary';
import { IoSparkles } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';
import { useSummary } from '../../context/SummaryProvider';
import { useNotes } from '../../context/NotesProvider';
import { Container } from '../../styles/shared/BaseLayout';
import { FaPen, FaTrash } from 'react-icons/fa';
import { NoteCard, NoteContent, NoteInfo, SmallIconButton } from '../noteslist/NotesList.Styles';
import { Note } from '../../models/noteModel';
import { CustomDropdown } from '../dropdown/Dropdown';
import { ModalContent } from '../modal/Modal.Styles';
import { SmallHeader } from '../toolbar/ToolBar.Styles';
import { UpdateNoteModal } from '../modal/UpdateNoteModal';
import { EventsRow } from '../calendar/EventsRow';
import { TasksRow } from '../calendar/TasksRow';

export const Dashboard = () => {
    const { signOut, isGoogleConnected, setIsGoogleConnected } = useAuth();
    const { setIsSettingsVisible, isSettingsVisible, setShowNotification, isLoading, notificationMessage, categories, showNotification, isEventsVisible, setIsEventsVisible, isTasksVisible, setIsTasksVisible   } = useActions();
    const { isSummaryVisible, setIsSummaryVisible } = useSummary();
    const [isUpdateNoteOpen, setIsUpdateNoteOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [noteToUpdate, setNoteToUpdate] = useState<Note | null>(null);
    const { currentCategory, 
            showTree, 
            showRecentNotes, 
            searchResults,
            isSearchLoading,
            setCurrentCategory, 
            setShowTree, 
            setSearchResults,
            setWriteInCurrentCategory,
            setShowRecentNotes,
    } = useNotes();

    const navigate = useNavigate();


    useEffect(() => {
        const runOAuthCallback = async () => {
          if (isGoogleConnected) return;

          const params = new URLSearchParams(window.location.search);
          const code = params.get("code");
          const isCallback = window.location.pathname.includes("/auth/google/callback");
      
          if (!code || !isCallback) return;
      
          try {
            await CalendarService.sendAuthCodeToBackend(code);

            setIsGoogleConnected(true);
    
            window.history.replaceState({}, document.title, "/dashboard");
          } catch (err) {
            console.error("OAuth failed", err);
          }
        };
      
        runOAuthCallback();
    }, []);      

    const handleLogout = async () => {{}
        try {
            handleBackClick();
            await signOut();
            navigate('/login', { replace: true });
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
    };

    const handleBackClick = () => {
        setCurrentCategory('');
        setSearchResults([]);
        setIsSummaryVisible(false);
        setShowTree(false);
        setWriteInCurrentCategory(false);
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
          await NoteService.deleteNote(noteId);
          setSearchResults(searchResults.filter(note => note.id !== noteId));
        } catch (err) {
          console.error('Error deleting note:', err);
        }
    };

    const handleUpdateNote = async (noteId: string) => {
        try {
          await NoteService.updateNote(noteId, newCategory);
          setIsUpdateNoteOpen(false);
        } catch (err) {
          console.error('Error updating note:', err);
        }
    }

    const handleCalendarClick = async () => {
        try {
            const googleAuthUrl = await CalendarService.getGoogleAuthUrl();
            window.location.href = googleAuthUrl; 
        } catch (err) {
            console.error("Failed to get Google auth URL", err);
        }
    };

    const renderDashboardContent = () => {
        // Tree View overrides everything
        if (showTree) {
          return <TreeView showTree={showTree} />;
        }
      
        // Search results mode
        if (searchResults.length > 0) {
          return (
            <>
              <h1>Search Results</h1>
              <ElevatedContainer width="100%" padding="lg">
                {isSearchLoading ? <LoadingSpinner /> :
                <Grid columns={1} $layoutMode="list">
                  {searchResults.map((note) => (
                    <NoteCard key={note.id} $layoutMode="list">
                      <NoteContent>
                        <ReactMarkdown
                          components={{
                            ul: ({ node, ...props }) => <ul className="markdown-ul" {...props} />,
                            li: ({ node, ...props }) => <li className="markdown-li" {...props} />,
                          }}
                        >
                          {note.content}
                        </ReactMarkdown>
                      </NoteContent>
                      <NoteInfo>
                        {note.category === "Unsorted"
                          ? "Miscellaneous"
                          : note.category.replace(/\*\*/g, "").split(" ").slice(0, 2).join(" ")}
                        <br />
                        {new Date(note.created_at!).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        <Spacer expand={true} />
                        <SmallIconButton onClick={() => {
                            setNoteToUpdate(note);
                            setIsUpdateNoteOpen(true);
                        }}>
                        <FaPen size={14} />
                        </SmallIconButton>
                        <Spacer width='sm' />
                        <SmallIconButton onClick={() => handleDeleteNote(note.id!)}>
                        <FaTrash size={14} />
                        </SmallIconButton>
                      </NoteInfo>
                    </NoteCard>
                  ))}
                </Grid>
                }
              </ElevatedContainer>
            </>
          );
        }
      
        // Default dashboard view
        return (
          <>
            {isSummaryVisible && (
              <>
                <Spacer height="xl" />
                <Summary />
              </>
            )}

            {isTasksVisible && (
              <>
                <Spacer height="xl" />
                <TasksRow />
              </>
            )}

            {isEventsVisible && (
              <>
                <Spacer height="xl" />
                <EventsRow />
              </>
            )}
      
            {showRecentNotes && (
              <>
                <Spacer height="xl" />
                <NotesRow />
              </>
            )}
      
            {currentCategory ? (
              <>
                <Spacer height="xl" />
                <NotesList category={currentCategory} />
              </>
            ) : (
              <>
                {categories.length > 0 ? (
                  <>
                    <Spacer height="xl" />
                    <h1>Sparkpads</h1>
                  </>
                ) : (
                  <h1>Welcome to SparkPad!</h1>
                )}
                <NoteCategories handleCategoryClick={handleCategoryClick} />
              </>
            )}
          </>
        );
      };
      

    return (
        <DashboardWrapper>
            {(showTree || currentCategory || searchResults.length > 0) && (
              <TextButton onClick={handleBackClick}>
                  <Row main="start" cross="center">
                      <MdArrowBack size={14} />
                      <Spacer width='sm'/>
                      Back
                  </Row>
              </TextButton>
            )}
            {renderDashboardContent()}
            {isUpdateNoteOpen && (
                <UpdateNoteModal
                    isOpen={isUpdateNoteOpen}
                    onClose={() => setIsUpdateNoteOpen(false)}
                    onSave={() => handleUpdateNote(noteToUpdate!.id!)}
                    noteContent={noteToUpdate?.content || ''}   
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    categories={categories}
                />
            )}
            {isSettingsVisible && (
                <Modal
                    isOpen={true}
                    onSave={() => setIsSettingsVisible(false)}
                    onClose={() => setIsSettingsVisible(false)}
                    title="Settings"
                >
                <ThemeToggle />
                <SecondaryButton onClick={handleCalendarClick}>
                    <MdEventAvailable size={20}/>
                    Sync Google
                </SecondaryButton>
                <SecondaryButton onClick={handleLogout}>
                    <MdLogout size={20}/>
                    Logout
                </SecondaryButton>
            </Modal>
            )}
            {showNotification && (
                <Notification 
                    message={notificationMessage} 
                    onClose={() => setShowNotification(false)} 
                />
            )}
        </DashboardWrapper>
    );
};