import React, { useState } from 'react'
import { createContext } from 'react'
export const addBlogContext =createContext()
export const editBlogContext = createContext()

const ContextShare = ({children}) => {
    const [addBlogResponse,setAddBlogResponse] = useState("")
    const [editBlogResponse,setEditBlogResponse] = useState("")
  return (
    <>
    <addBlogContext.Provider value={{addBlogResponse,setAddBlogResponse}}>
       <editBlogContext.Provider value={{editBlogResponse,setEditBlogResponse}}>
         {children}
       </editBlogContext.Provider>
    </addBlogContext.Provider>
    </>
  )
}

export default ContextShare