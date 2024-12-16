import { useAuth } from '../../contexts/AuthContext'

function HomePage() {
    const user = useAuth();
    return (
        <>
            <p>{user.user}</p>
            <h2>Главная</h2>
        </>
    )
}

export default HomePage;
