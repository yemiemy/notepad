import React, { useEffect, useState, useRef } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
// import axios from '../api/axios'

const NOTES_URL = '/api/notes/'

const NotesListPage = () => {
  const [notes, setNotes] = useState([])
  const [errMsg, setErrMsg] = useState("");
  const { auth } = useAuth()
  const errRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    // console.log("NoteList GET EFFECT");
    let isMounted = true
    const controller = new AbortController()

    const getNotes = async () => {
      try {
        const config = {
          signal: controller.signal,
          // headers:{
          //   'Content-Type':'application/json',
          //   'Authorization':'Bearer ' + String(auth?.auth_token)
          // }
        };
        const response = await axiosPrivate.get(NOTES_URL, config)
        isMounted && setNotes(response.data)
        // console.log("SET NOTES", response.data);
        setErrMsg('')
      } catch (err){
        if (!err?.response){
          // setErrMsg("No Server Response")
        }else if (err.response?.status === 401){
          setErrMsg("Unauthroised")
          navigate('/login', {state:{from: location}, replace:true})
          // logOutUser()
        } else {
          console.log(err.response);
          setErrMsg("An error occured.")
        }
        errRef?.current?.focus();
      }
    }
    getNotes()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [auth, axiosPrivate, location, navigate])

  
  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className='notes-list'>
          {
              notes.map((note, index) => {
                  return <ListItem key={index} note={note} />
              })
          }
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage