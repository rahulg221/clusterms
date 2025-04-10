import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    DashboardWrapper,
    Header,
} from './Dashboard.Styles';
import { SecondaryButton, EmptyButton } from '../../styles/shared/Button.styles';
import { NoteCategories } from '../categories/NoteCategories';
import { NotesList } from '../noteslist/NotesList';
import { NoteService } from '../../api/noteService';
import { SearchBar } from '../searchbar/SearchBar';
import { NoteCard, NoteContent, NoteInfo } from '../../styles/shared/Notes.styles';
import { TrashIcon } from '../noteslist/NotesList.Styles';
import { Note } from '../../models/noteModel';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Notification } from '../notif/Notification';
import { Modal } from '../modal/Modal';
import { useActions } from '../../context/ActionsContext';
import { MdEventAvailable, MdLogout } from 'react-icons/md';
import CalendarService from '../../api/calendarService';
import { ThemeToggle } from '../themetoggle/ThemeToggle';
import { NotesRow } from '../notesrow/NotesRow';
import { Column, Grid, ElevatedContainer, Spacer, Row } from '../../styles/shared/BaseLayout';
import { FaArrowLeft, FaGoogle, FaLightbulb, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaGear, FaWandSparkles } from 'react-icons/fa6';

export const Dashboard = () => {
    const { signOut } = useAuth();
    const { showSnapshot, semanticSearch, autoOrganizeNotes, setShowNotification, setSearchResults, isLoading, notificationMessage, showNotification, searchResults, calendarEvents, tasks } = useActions();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showRecentNotes, setShowRecentNotes] = useState(false);

    useEffect(() => {
        /*
        const handleGoogleCallback = async () => {
            // Add more robust check for calendar and task connections
            if (calendarEvents.length || tasks.length) {
                console.log("Already connected to Google");
                return;
            }

            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            if (!code || !window.location.pathname.includes("/auth/google/callback")) return;

            try {
                await CalendarService.sendAuthCodeToBackend(code);
                
                console.log("Calendar connected successfully");
            } catch (err) {
                console.error("Failed to complete Google OAuth callback", err);
            }
        };

        handleGoogleCallback();*/
    }, []);

    const handleLogout = async () => {{}
        try {
            await signOut();
            navigate('/login', { replace: true });
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const handleBackClick = () => {
        setSelectedCategory(null);
        setSearchResults([]);
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
          await NoteService.deleteNote(noteId);
          setSearchResults(searchResults.filter(note => note.id !== noteId));
        } catch (err) {
          console.error('Error deleting note:', err);
        }
    };

    const handleSettingsClick = () => {
        setShowSettings(true);
    };

    const handleSearch = async (query: string) => {
        try {
            if (!query.trim()) {
                setSearchResults([]);
                return;
            }
    
            semanticSearch(query);
    
            console.log("searchResults", searchResults);
        } catch (error) {
            console.error('Search failed:', error);
        } 
      };

    const handleCalendarClick = async () => {
        try {
            /*
            if (calendarEvents.length > 0) {
                updateEvents();
            }
            if (tasks.length > 0) {
                updateTasks();
            }*/

            if (calendarEvents.length === 0 && tasks.length === 0) {
                const googleAuthUrl = await CalendarService.getGoogleAuthUrl();
                window.location.href = googleAuthUrl; 
            }
        } catch (err) {
            console.error("Failed to get Google auth URL", err);
        }
    };
    
    const Loader = () => (
        <div style={{
            display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <h1>Loading...</h1>
        </div>
    );

    return (
        <DashboardWrapper>
            <Header>
                <Column main='start' cross='start'>
                    <Row main='start' cross='start' gap='md'>
                        <SearchBar onSearch={handleSearch} />
                        <EmptyButton onClick={handleSettingsClick}>
                            <FaGoogle size={14}/>
                            <span className='text-label'>Sync</span>
                        </EmptyButton>
                        <EmptyButton onClick={handleSettingsClick}>
                            <FaGear size={14}/>
                            <span className='text-label'>Settings</span>
                        </EmptyButton>
                    </Row>
                    <Row main='start' cross='start' gap='md'>
                        { selectedCategory || searchResults.length > 0 ? 
                            <SecondaryButton onClick={handleBackClick}>
                                <FaArrowLeft size={14}/>
                                <span className='text-label'>Back</span>
                            </SecondaryButton>
                        : null }
                        <SecondaryButton onClick={() => setShowRecentNotes(prev => !prev)}>
                            {showRecentNotes ? <FaEyeSlash size={14}/> : <FaEye size={14}/>}
                            {showRecentNotes ? <span className='text-label'>Hide Recent</span> : <span className='text-label'>Show Recent</span>}
                        </SecondaryButton>
                        <SecondaryButton onClick={autoOrganizeNotes}>
                            <FaWandSparkles size={14}/>
                            <span className='text-label'>Auto-Organize</span>
                        </SecondaryButton>
                        <SecondaryButton onClick={() => showSnapshot()}>
                            <FaLightbulb size={14}/>
                            <span className='text-label'>Snapshot</span>
                        </SecondaryButton>
                    </Row>
                </Column>
            </Header>
            {searchResults.length > 0 ? (
                <>
                <h1>Search Results</h1>
                <ElevatedContainer width='100%' padding='lg'>
                    <Grid columns={1} $layoutMode='list'>
                        {searchResults.map((note) => (
                            <NoteCard key={note.id}>
                            <NoteContent>
                                {note.content}
                            </NoteContent>
                                <NoteInfo>
                                    {note.category == 'Unsorted' ? 'Miscellaneous' : note.category.replace(/\*\*/g, "").split(" ").slice(0, 2).join(" ")}
                                    <br/>
                                    {new Date(note.created_at!).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    <TrashIcon onClick={() => handleDeleteNote(note.id!)} />
                                </NoteInfo>
                            </NoteCard>
                        ))}
                    </Grid>
                </ElevatedContainer>
              </>
            ) : (
                <>
                    {isLoading ? <Loader /> : (
                        <>  
                            {showRecentNotes ? 
                                <>
                                    <NotesRow/>
                                    <Spacer height='lg'/>
                                </>
                             : null}
                            {selectedCategory ? (
                                <NotesList category={selectedCategory} />
                            ) : (
                                <>
                                    <h1>Sparkpads</h1>
                                    <NoteCategories handleCategoryClick={handleCategoryClick} />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            {showSettings && (
                <Modal
                    isOpen={true}
                    onClose={() => setShowSettings(false)}
                    title="Settings"
                >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>Under construction</ReactMarkdown>     
                <ThemeToggle />
                <SecondaryButton onClick={handleCalendarClick}>
                    <MdEventAvailable size={20}/>
                    <span className='text-label'>Connect</span>
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