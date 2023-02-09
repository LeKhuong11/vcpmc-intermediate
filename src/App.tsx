import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { auth } from './firebase/configfb';
import { fetchUser } from './redux/slice/userSlice';
import { useAppDispatch } from './redux/store';
import { Router } from './routes';


function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    const unSub = auth.onAuthStateChanged((currentUser) => {
        if(currentUser) {
          const { uid } = currentUser;
          dispatch(fetchUser(uid))
          
          return
        }
        navigate('login')        
    })

    //cleanup function
    return () => {
        unSub();
    }
}, [navigate])


  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default App;
