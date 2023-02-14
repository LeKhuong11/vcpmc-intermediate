import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { auth } from './firebase/configfb';
import { fetchStoreMusic } from './redux/slice/storeSlice';
import { fetchUser } from './redux/slice/userSlice';
import { useAppDispatch } from './redux/store';
import { Router } from './routes';


function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  

  //authenticaton current user 
  //if don't user redirect to login
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

  useEffect(() => {
    dispatch(fetchStoreMusic())
  }, [navigate])


  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default App;
