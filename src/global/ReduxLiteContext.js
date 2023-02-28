import React, { useState } from 'react';

const ReduxLiteContext = React.createContext()

const ReduxLiteProvider = ({children})=>{
const [test,setTest]= useState(false)
const [get,setGet] = useState([])
const [post,setPost] = useState(null)
const [put,setPut] = useState(null)
const [deletePost,setDeletePost] = useState(null)
return(
 <ReduxLiteContext.Provider value ={{
    test,setTest,get,setGet,post,setPost,put,setPut,deletePost,setDeletePost
 }}>
    {children}
 </ReduxLiteContext.Provider>   
)
}
export {ReduxLiteContext,ReduxLiteProvider}