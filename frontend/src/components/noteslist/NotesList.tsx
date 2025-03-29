import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Note } from '../../models/noteModel';
import { NoteService } from '../../api/noteService';
import { NotesContainer, NoteCard, NoteMeta, CategoryTitle, NoteInfo, TrashIcon } from './NotesList.Styles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useActions } from '../../context/ActionsContext';

interface NotesListProps {
  category: string;
}

export const NotesList = ({ category }: NotesListProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { setCurrentNotes } = useActions();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const userNotes = await NoteService.getNotesByCategory(user.id, category);
        setNotes(userNotes);
        setCurrentNotes(userNotes);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch notes');
        console.error('Error fetching notes:', err);
        setIsLoading(false);
      } 
    };

    fetchNotes();
  }, [user?.id]);

  const handleDeleteNote = async (noteId: string) => {
    try {
      await NoteService.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Error deleting note');
    }
  };

  return (
    <>
      <CategoryTitle>{category}</CategoryTitle>
      <NotesContainer>
      {notes.map((note) => (
        <NoteCard key={note.id}>
          <NoteMeta>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
            <NoteInfo>
                {note.category}
                <br />
                {new Date(note.created_at!).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                <TrashIcon onClick={() => handleDeleteNote(note.id!)} />
            </NoteInfo>
          </NoteMeta>
        </NoteCard>
      ))}
    </NotesContainer>
    </>
  );
}; 