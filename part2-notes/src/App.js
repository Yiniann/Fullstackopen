import { useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([]) //应用的笔记列表状态
  const [newNote, setNewNote] = useState('')//输入框的状态
  const [showAll, setShowAll] = useState(false)//展示的列表
  const [noticeMessage,setNoticeMessage] = useState(null)//通知信息状态
  const [username,setUsername] = useState('')//账号状态
  const [password,setPassword] = useState('')//密码状态
  const [user,setUser] = useState(null)

  //获取数据库的notes列表
  useEffect(()=>{
    noteService
    .getAll()
    .then(initialNotes=>{
      setNotes(initialNotes)
    })
  },[])
  console.log('render', notes.length, 'notes')

  //检查是否存在登录token
  useEffect(()=>{
    const loggedUserToken = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserToken){
      const user =JSON.parse(loggedUserToken)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])
  //登录处理
  const handleLogin = async(event) =>{
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNoticeMessage('Wrong credentials')
      setTimeout(()=>{
        setNoticeMessage(null)
      },5000)
    }
    console.log('logging in with',username, password)
  }
  //登出处理
  const handleLogout = () =>{
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
  }

  //增加新笔记的事件处理
  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };
    
      //将新笔记发送到数据库
      try {
        const returnedNote = await noteService.create(noteObject);
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      } catch (error) {
        console.error('Error adding note:', error);
        setNoticeMessage('Failed to add note');
        setTimeout(() => setNoticeMessage(null), 5000);
      }
  }
  
  //处理表单变化，注册事件处理
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  //处理显示
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  //查找目标的ID
  const toggleImportanceOf=(id)=>{
    const note = notes.find(n=> n.id === id)
    const changedNote= { ...note, important :! note.important}//处理重要性切换
    
    //变更数据库
    noteService
    .update(id,changedNote)
    .then(returnedNote=>{
      setNotes(notes.map(note=> note.id !== id? note : returnedNote))
    })
    .catch(error=>{
      setNoticeMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setNoticeMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  //登录表单
  const loginForm = () =>(
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({target})=>setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({target})=>setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
  )

  //note表单
  const noteForm = () =>(
    <form onSubmit={addNote}>
        <input 
        value={newNote} 
        onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
  )

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={noticeMessage} />

      {user === null ?
        loginForm():
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {noteForm()}
        </div>
    }
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note}
          toggleImportance={()=>toggleImportanceOf(note.id)} />
        )}
      </ul>
      
      <Footer />
    </div>  
  )
}

export default App
