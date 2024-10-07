//import logo from './logo.svg';
import './App.css';

import Frame from 'react-frame-component';
import Login from './Components/Login';


function App() {
  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body><div></div></body></html>`;
  return (
    <div className="App">
      <header className="App-header">
        My Demo
      </header>
      <body>
      <div>
      <div>
      <Frame initialContent={initialContent} className="iFrame" >
      <Login variant={1}/>
      </Frame>
      <Frame initialContent={initialContent} className="iFrame" >
      <Login variant={2}/>
      </Frame>
      <Frame initialContent={initialContent} className="iFrame" >
      <Login variant={3}/>
      </Frame>
      <Frame initialContent={initialContent} className="iFrame" >
      <Login variant={4}/>
      </Frame>
  
              <div className="App-header">
      </div>
      </div>
      </div>
        </body>
  
    </div>
  );
}

export default App;
