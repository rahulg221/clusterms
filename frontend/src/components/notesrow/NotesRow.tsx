import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Note } from '../../models/noteModel';
import { NoteService } from '../../api/noteService';
import { NoteInfo, NotePreview } from '../../styles/shared/Notes.styles';
import { NewNoteCard } from '../../styles/shared/Notes.styles';
import { TrashIcon } from '../noteslist/NotesList.Styles';
import { Row, ScrollView } from '../../styles/shared/BaseLayout';
import { Container } from '../../styles/shared/BaseLayout';
import ReactMarkdown from 'react-markdown';
import { LoadingSpinner } from '../../styles/shared/LoadingSpinner';

export const NotesRow = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecentNotes = async () => {
      setIsLoading(true);

      try {
        const recentNotes = await NoteService.getMostRecentNotes(user?.id!, 10);
        setNotes(recentNotes);
      } catch (err) {
        console.error('Error fetching recent notes:', err);
      } finally {
        setIsLoading(false);
      }   
    };

    fetchRecentNotes();
  }, []);

  const handleDeleteNote = async (noteId: string) => {
    try {
      await NoteService.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <>            
        <h1>Recent Sparks</h1>
        {isLoading ? (
            <LoadingSpinner />
        ) : (
            <ScrollView direction='horizontal'>
                <Container width="100%">
                    <Row main="start" cross="start" gap="md">
                    {notes.map(note => (
                        <NewNoteCard key={note.id}>
                            <NotePreview>
                              <ReactMarkdown
                                components={{
                                  ul: ({ node, ...props }) => <ul className="markdown-ul" {...props} />,
                                  li: ({ node, ...props }) => <li className="markdown-li" {...props} />,
                                }}
                              >
                                {note.content}
                              </ReactMarkdown>
                            </NotePreview>
                            <NoteInfo>
                                {new Date(note.created_at!).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                })}
                                <TrashIcon onClick={() => handleDeleteNote(note.id!)} />
                            </NoteInfo>
                        </NewNoteCard>
                    ))}
                </Row>
            </Container>
          </ScrollView>
        )}
    </>
  );
};
