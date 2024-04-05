import { useState, useEffect } from 'react';
import { auth, db } from './firebase/firebaseInit';
import { collection, addDoc } from 'firebase/firestore';
import SignOutButton from './firebase/SignOut';
import SignInButton from './firebase/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import Timer from './components/Timer';
import PlayerList from './components/Playerlist';
import './index.css';

function App() {
  const [user] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState('');
  const [foundFigures, setFoundFigures] = useState(0);
  const [timerStopped, setTimerStopped] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [username, setUsername] = useState('');
 
  useEffect(() => {
  
        const imageURL = 'https://firebasestorage.googleapis.com/v0/b/where-s-waldo-e7bad.appspot.com/o/Wimmelbild.webp%2FWimmelbild.webp?alt=media&token=c3ea4108-36fc-4080-9af2-7eca390da7f3';
    setImageUrl(imageURL);
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || 'Unknown'); 
        }
  }, [user]);

  const handleFigureClick = (x:number, y:number) => {
    const correctFigures = [
      { name: 'Benson', x: 44.5, y: 73 },
      { name: 'Chaneira', x: 2, y: 168 },
      { name: 'Karpador', x: 69, y: 144 }
    ];

    const clickedFigure = correctFigures.find(figure => figure.x === x && figure.y === y);
    if (clickedFigure) {
      console.log(`Richtiges Objekt gefunden: ${clickedFigure.name}`);
      setFoundFigures(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (foundFigures === 3) {
      console.log('Alle drei Figuren gefunden');
      setTimerStopped(true);
      setShowLeaderboard(true);
    }
  }, [foundFigures]);

  const handleLeaderboardClose = () => {
    setShowLeaderboard(false);
    setTimerStopped(false); 
    setFoundFigures(0); 
  };  

  const handleSaveLeaderboard = async (time: number) => {
    try {
      const docRef = await addDoc(collection(db, 'Bestenliste'), {
        username: username,
        time: time
      });
      console.log('Bestenliste erfolgreich gespeichert mit ID: ', docRef.id);
    } catch (error) {
      console.error('Fehler beim Speichern der Bestenliste: ', error);
    }
  };
  return (
    <>
      <SignOutButton />
      {user ? null : <SignInButton />}
      {user && imageUrl && (
        <div>
          <div className='search'>
          <img src="src/benson.png" alt="benson" className='search1'/>
          <img src="src/chaneira.png" alt="chaneira" className='search2'/>
          <img src="src/karpador.png" alt="karpador" className='search3'/>
          </div>
          <Timer stopped={timerStopped}/>
          <img src={imageUrl} alt="Wimmelbild" />
          <div className="figure-placeholder" style={{ position: 'absolute', left: '44.5%', top: '73%', width: '30px', height: '70px',
           backgroundColor: 'red' }} onClick={() => handleFigureClick(44.5, 73)} />
          <div className="figure-placeholder" style={{ position: 'absolute', left: '2%', top: '168%', width: '50px', height: '50px', 
          backgroundColor: 'green' }} onClick={() => handleFigureClick(2, 168)} />
          <div className="figure-placeholder" style={{ position: 'absolute', left: '69%', top: '144%', width: '80px', height: '60px', 
          backgroundColor: 'blue' }} onClick={() => handleFigureClick(69, 144)} /> 
          {/*todo: koordinaten aus der collection holen
              todo: skalierung damit die kästchen auf ihrem platz bleiben */}
          {showLeaderboard && (
            <PlayerList
              players={[]} 
              onClose={handleLeaderboardClose} 
              onSave={handleSaveLeaderboard} 
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
