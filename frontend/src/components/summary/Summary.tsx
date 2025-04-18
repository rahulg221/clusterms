import ReactMarkdown from 'react-markdown';
import { LoadingSpinner } from '../../styles/shared/LoadingSpinner';
import { SummaryContainer } from './Summary.Styles';
import { Row } from '../../styles/shared/BaseLayout';
import { useSummary } from '../../context/SummaryProvider';
import { FaTimes } from 'react-icons/fa';
import { IconButton } from '../../styles/shared/Button.styles';

export const Summary = () => {
    const { summary, isSummaryLoading, setIsSummaryVisible } = useSummary();   

    return (
    <>            
        <Row main="spaceBetween" cross="start">
            <h1>Summary</h1>
            <IconButton onClick={() => setIsSummaryVisible(false)}>
                <FaTimes size={14} />
            </IconButton>
        </Row>
        <SummaryContainer>
            {isSummaryLoading ? <LoadingSpinner /> : (
                <ReactMarkdown children={summary} />
            )}
        </SummaryContainer>
    </>
    );
};
