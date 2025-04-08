import React from 'react';
import Login from './Form'
import { useParams} from "react-router-dom";




function SinglePage(){
  const { pageId } = useParams();
//console.log("pageId",pageId)

    return (
      
     
  
    <div className="column-container" >
    <div className="singlecolumn" >
    <Login variant={parseInt(pageId)}/>
    </div>

    </div>

    );
  }

  export default SinglePage;