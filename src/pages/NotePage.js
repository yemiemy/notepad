import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
// import axios from '../api/axios';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
// import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const NotePage = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams();
    const [note, setNote] = useState(null)
    const [errMsg, setErrMsg] = useState("")
    const errRef = useRef()
    // const { auth } = useAuth()
    const GET_NOTE_URL = `/api/notes/${id}/`
    const CREATE_NOTES_URL = '/api/notes/'
    const axiosPrivate = useAxiosPrivate()

    // const config = {
        // headers:{
        //   'Content-Type':'application/json',
        //   'Authorization':'Bearer ' + String(auth?.auth_token)
        // }
    // };

    useEffect(() => {
        getNote()
    }, [])

    let getNote = async () => {
        if (id === 'new') return
        try {
            let response = await axiosPrivate.get(GET_NOTE_URL)
            setNote(response.data)
            setErrMsg('')
        } catch (err){
            handleErrorCode(err?.response?.status, err?.response)
        }
    }

    let handleErrorCode = (code, response) => {
        if (code === 401){
            navigate('/login', {state:{from: location}, replace:true})
            // logOutUser()
        }else if (code === 400){
            setErrMsg("Something went wrong, please try again.")
        }else if (code=== 403){
            setErrMsg("Oops, you do not have access to perform that action.")
        }else if (code=== 404){
            setErrMsg("Page not found")
        }else{
            console.log(code, response)
            setErrMsg("An error occured.")
        }
        errRef?.current?.focus()
        navigate('/')
    }

    let createNote = async () => {
        try {
            await axiosPrivate.post(CREATE_NOTES_URL, JSON.stringify({...note}))
            setErrMsg('')
        } catch (err) {
            handleErrorCode(err?.response.status, err?.response)
        }
    }

    let updateNote = async () => {
        try {
            await axiosPrivate.put(GET_NOTE_URL, JSON.stringify({...note, 'updated': new Date()}))
            setErrMsg('')
        } catch (err) {
            handleErrorCode(err?.response.status, err?.response)
        }        
    }

    let deleteNote = async () => {
        try {
            await axiosPrivate.delete(GET_NOTE_URL)
            setErrMsg('')
            navigate('/')
        } catch (err) {
            handleErrorCode(err?.response.status, err?.response)
        }
    }

    let handleSubmit = () => {
        if (id !== 'new' && !note?.body){
            deleteNote()
        } else if (id !== 'new'){
            updateNote()
        } else if (id === 'new' && note !== null){
            createNote()
        }
        navigate('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {
                    id==='new' ? <button onClick={handleSubmit} style= {{cursor: 'pointer'}}>Done</button>
                    : <button onClick={deleteNote}>Delete</button>
                }
            </div>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body} placeholder="Type something here...">

            </textarea>
        </div>
    )
}

export default NotePage
