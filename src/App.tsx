import { useEffect, useState } from 'react'
import root from './App.module.scss'

import { Router } from './routes';

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1300;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  
  return (
    <div className={root.App}>
        {width < breakpoint ? 
        <div className={root.resize}>
          <h4>Hiện tại, ứng dụng của chúng tôi chưa hỗ trợ ở kích thước này!</h4>
        </div> : 
        <Router />}
    </div>
  );
}

export default App;
