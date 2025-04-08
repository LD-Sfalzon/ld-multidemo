//import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import MultiPage from './Components/multiPage';
import SinglePage from './Components/singlePage';
import Iframer from './Components/Iframer';
import Offline from './Components/Offline';
const DEMOKEY = process.env.REACT_APP_DEMOKEY;

function Errorpage() {
  return (
    <div> Error?</div>
    
  )
}

function App({flags, ldClient,}) {

  // Get the existing context
//console.log("APP LDclient: ",ldClient)

  let context = ldClient.getContext()
  
//console.log("CONTEXT IS : ",context.key)
  if (context.key === DEMOKEY) {
  //console.log("should updateDemo  Context")
    context.key = flags.demoContext;
  //console.log("updating context to be the new user key: ", flags.demoContext)
    ldClient.identify(context, null, () => {
    //console.log("New context's flags available");
      //let updatedContext = ldClient.getContext()
    //console.log("Updated Context", updatedContext)
    //console.log("state-warnings", flags.stateWarnings)

    });

  }

  
  //const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body><div></div></body></html>`;
  return (
    <div className="App">
       
    <HashRouter>
    <Routes>
     <Route path="/" element={<Iframer />} />
     <Route path="ld-multidemo/" element={<MultiPage />} />
     <Route path="/iframe/" element={<Iframer props/>} />
     <Route path="iframe/" element={<Iframer props/>} />
     <Route path="offline/" element={<Offline />} />
     <Route path="/page/:pageId" element={<SinglePage props/>} />
     {/* 404 page */}
     <Route path="*" element={<Errorpage />} />
   </Routes>
    </HashRouter>
  
</div>
  );
}




export default withLDConsumer()(App);
