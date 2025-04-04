import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    DashboardWrapper,
    Divider,
    Header,
} from './Dashboard.Styles';
import { SecondaryButton } from '../../styles/shared/Button.styles';
import { NoteCategories } from '../categories/NoteCategories';
import { NotesList } from '../noteslist/NotesList';
import { NoteService } from '../../api/noteService';
import { SearchBar } from '../searchbar/SearchBar';
import { NoteCard, NoteMeta, NotesContainer, NoteInfo, TrashIcon, CategoryTitle } from '../noteslist/NotesList.Styles';
import { Note } from '../../models/noteModel';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Notification } from '../notif/Notification';
import { Modal } from '../modal/Modal';
import { useActions } from '../../context/ActionsContext';
import { MdPsychology, MdEventAvailable, MdSettings, MdHome, MdLogout, MdLightbulb } from 'react-icons/md';
import CalendarService from '../../api/calendarService';
import { ThemeToggle } from '../themetoggle/ThemeToggle';
import { AnimatePresence, motion } from "framer-motion";

export const Dashboard = () => {
    const { user, signOut } = useAuth();
    const { semanticSearch, showSnapshot, autoOrganizeNotes, setShowNotification, setSummary, setSearchResults, isLoading, notificationMessage, showNotification, summary, searchResults } = useActions();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const handleGoogleCallback = async () => {
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

        handleGoogleCallback();
    }, []);

    const handleLogout = async () => {
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

    const handleSearch = async (query: string) => {
        if (!user?.id) return;

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

    const handleCalendarClick = async () => {
        try {
            const googleAuthUrl = await CalendarService.getGoogleAuthUrl();

            window.location.href = googleAuthUrl; 
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
                <SecondaryButton onClick={handleBackClick}>
                    <MdHome size={20}/>
                    <span className='text-label'>Home</span>
                </SecondaryButton>
                <SearchBar onSearch={handleSearch} />
                <SecondaryButton onClick={autoOrganizeNotes}>
                    <MdPsychology size={20}/>
                    <span className='text-label'>Organize</span>
                </SecondaryButton>
                <SecondaryButton onClick={() => showSnapshot()}>
                    <MdLightbulb size={20}/>
                    <span className='text-label'>Summarize</span>
                </SecondaryButton>
                <SecondaryButton onClick={handleCalendarClick}>
                    <MdEventAvailable size={20}/>
                    <span className='text-label'>Connect</span>
                </SecondaryButton>
                <SecondaryButton onClick={handleSettingsClick}>
                    <MdSettings size={20}/>
                    <span className='text-label'>Settings</span>
                </SecondaryButton>
            </Header>
            {searchResults.length > 0 ? (
                <>
                <CategoryTitle>Search Results</CategoryTitle>
                <NotesContainer viewMode='list'>
                    {searchResults.map((note) => (
                        <NoteCard key={note.id}>
                            <NoteMeta>
                                {note.content}
                                <NoteInfo>
                                    {note.category}
                                    <br />
                                    {new Date(note.created_at!).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                    <TrashIcon onClick={() => handleDeleteNote(note.id!)} />
                                </NoteInfo>
                            </NoteMeta>
                        </NoteCard>
                    ))}
              </NotesContainer>
              </>
            ) : (
                <>
                    {isLoading ? <Loader /> : (
                        <>  
                            <AnimatePresence mode="wait">
                                {selectedCategory ? (
                                    <motion.div
                                        key="notes-list"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                    <NotesList category={selectedCategory} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="note-categories"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                    <NoteCategories handleCategoryClick={handleCategoryClick} />
                                    </motion.div>
                                )}
                                </AnimatePresence>

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