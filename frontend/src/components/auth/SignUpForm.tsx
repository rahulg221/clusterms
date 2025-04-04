import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    AuthPageContainer,
    FormContainer,
    Title,
    Form,
    FormGroup,
    Input,
    ErrorMessage,
    StyledLink,
    LinkText,
    SuccessMessage
} from './Auth.styles';
import { PrimaryButton } from '../../styles/shared/Button.styles';

export const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { signUp, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(''); 
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        const message = await signUp(email, password);
        console.log("Message:", message);
        if (message === 'Signup successful. Please log in.') {
            setSuccess(message);
        } else {
            setError(message);
        }
    };

    return (
        <AuthPageContainer>
            <FormContainer>
                <Title>Sign Up</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                    <FormGroup>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </FormGroup>
                    <PrimaryButton type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </PrimaryButton>
                </Form>
                <LinkText>
                    Already have an account? <StyledLink to="/login">Login</StyledLink>
                </LinkText>
            </FormContainer>
        </AuthPageContainer>
    );
};
