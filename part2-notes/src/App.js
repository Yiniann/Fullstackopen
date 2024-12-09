import { useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]) //应用的笔记列表状态
  const [newNote, setNewNote] = useState('')//输入框的状态
  const [showAll, setShowAll] = useState(false)//展示的列表

  //获取数据库的notes列表
  useEffect(()=>{
    noteService
    .getAll()
    .then(initialNotes=>{
      setNotes(initialNotes)
    })
  },[])
  console.log('render', notes.length, 'notes')

  //增加新笔记的事件处理
  const addNote = (event) => {
    event.preventDefault()//防止默认提交
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,}
    
      //将新笔记发送到数据库
      noteService.
      create(noteObject)
      .then(returnedNote=>{
        setNotes(notes.concat(returnedNote))//将res的数据加入到列表
        setNewNote('')//重置输入框
  })
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
      alert(`the note'${note.content}'was already deleted from server`)
      setNotes (notes.filter(n=> n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
