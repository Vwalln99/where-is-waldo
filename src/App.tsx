import { useState, useEffect } from 'react';
import { auth } from './firebase/firebaseInit';
import SignOutButton from './firebase/SignOut';
import SignInButton from './firebase/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import Timer from './components/Timer';
import './index.css';

function App() {
  const [user] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState('');
  const [foundFigures, setFoundFigures] = useState(0);
  const [timerStopped, setTimerStopped] = useState(false);


  useEffect(() => {
  
        const imageURL = 'https://firebasestorage.googleapis.com/v0/b/where-s-waldo-e7bad.appspot.com/o/Wimmelbild.webp%2FWimmelbild.webp?alt=media&token=c3ea4108-36fc-4080-9af2-7eca390da7f3';
    setImageUrl(imageURL);
  }, []);

  const handleFigureClick = (x:number, y:number) => {
    const correctFigures = [
      { name: 'Benson', x: 44, y: 65 },
      { name: 'Chaneira', x: 300, y: 300 },
      { name: 'Karpador', x: 500, y: 400 }
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
    }
  }, [foundFigures]);

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
          <div className="figure-placeholder" style={{ position: 'absolute', left: '44.5%', top: '65%', width: '20px', height: '40px',
           backgroundColor: 'red' }} onClick={() => handleFigureClick(44, 65)} />
          <div className="figure-placeholder" style={{ position: 'absolute', left: '30%', top: '30%', width: '20px', height: '20px', 
          backgroundColor: 'green' }} onClick={() => handleFigureClick(300, 300)} />
          <div className="figure-placeholder" style={{ position: 'absolute', left: '50%', top: '40%', width: '20px', height: '20px', 
          backgroundColor: 'blue' }} onClick={() => handleFigureClick(500, 400)} />
        </div>
      )}
    </>
  );
}

export default App;
