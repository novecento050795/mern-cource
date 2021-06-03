import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')
  
  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch(e) {

      }
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row">
      <div className="col s8 offset-s2" stype={{paddingTop: '2rem'}}>
        <div className="input-field">
            <input
              placeholder="Type link" 
              id="link" 
              type="text" 
              onChange={e => setLink(e.target.value)}
              value={link}
              onKeyPress={pressHandler}
            />
            <label for="email">enter link</label>
          </div>
      </div>
    </div>
  )
}