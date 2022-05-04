import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import AuthContext from '../context/AuthContext';

const NotePage = (props) => {
    let navigate = useNavigate()
    let { id } = useParams();
    let [note, setNote] = useState(null)
    let { authTokens, logOutUser } = useContext(AuthContext)

    useEffect(() => {
        let getNote = async () => {
            if (id === 'new') return
    
            let response = await fetch(`https://notepad-be.herokuapp.com/api/notes/${id}`, {
                method: 'GET',
                 headers: {
                   'Content-Type':'application/json',
                   'Authorization':'Token ' + String(authTokens?.auth_token)
                 }
            })
            let data = await response.json()
            if (response.status === 200){
                setNote(data)
            }else{
                handleErrorCode(response.status, response)
            }
        }
        getNote()
    }, [id, logOutUser, authTokens])

    let handleErrorCode = (code, response) => {
        if (code === 401){
            logOutUser()
        }else if (code === 400){
            console.log(response.status, response)
            alert("Something went wrong, please try again.")
        }else if (code=== 403){
            console.log(code, response)
            alert("Oops, you do not have access to perform that action.")
        }else{
            console.log(code, response)
        }
        navigate('/')
    }

    let createNote = async () => {
        let response = await fetch(`https://notepad-be.herokuapp.com/api/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token ' + String(authTokens?.auth_token)
            },
            body: JSON.stringify({...note})
        })

        handleErrorCode(response.status, response)
    }

    let updateNote = async () => {
        let response = await fetch(`https://notepad-be.herokuapp.com/api/notes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token ' + String(authTokens?.auth_token)
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
        
        handleErrorCode(response.status, response)
    }

    let deleteNote = async () => {
        let response = await fetch(`https://notepad-be.herokuapp.com/api/notes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token ' + String(authTokens?.auth_token)
            },
            body: JSON.stringify(note)
        })
        handleErrorCode(response.status, response)
        navigate('/')
    }

    let handleSubmit = () => {
        if (id !== 'new' && !note.body){
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
                    id==='new' ? <button onClick={handleSubmit}>Done</button>
                    : <button onClick={deleteNote}>Delete</button>
                }
            </div>

            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage