import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [selected, setSelected] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mode, setMode] = useState('view') 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setNotes(data)
    setLoading(false)
  }

  const startCreate = () => {
    setSelected(null)
    setTitle('')
    setContent('')
    setMode('create')
  }

  const saveNewNote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from('notes').insert({
      title,
      content,
      user_id: user.id,
    })

    if (!error) {
      await loadNotes()
      setMode('view')
    }
  }

  const openNote = (note) => {
    setSelected(note)
    setTitle(note.title)
    setContent(note.content)
    setMode('view')
  }

const saveEdit = async () => {
  if (!selected) return

  const { error } = await supabase
    .from('notes')
    .update({
      title: title.trim(),
      content: content.trim(),
    })
    .eq('id', selected.id)

  if (error) {
    console.error('Update error:', error)
    alert(error.message)
    return
  }

  // Update UI state immediately
  setSelected({ ...selected, title, content })

  // Refresh list so sidebar title updates
  await loadNotes()

  setMode('view')
}

  const deleteNote = async () => {
    await supabase.from('notes').delete().eq('id', selected.id)
    setSelected(null)
    setMode('view')
    loadNotes()
  }

  if (loading) return <div className="center">Loading…</div>

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside>
        <h3>My Notes</h3>
        <button className="primary" onClick={startCreate}>
          + New Note
        </button>

        {notes.map((n) => (
          <div
            key={n.id}
            className={`note-item ${
              selected?.id === n.id ? 'active' : ''
            }`}
            onClick={() => openNote(n)}
          >
            {n.title}
          </div>
        ))}
      </aside>

      {/* Main */}
      <main>
        <header>
          <h2>Private Notes Vault</h2>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </header>

        {mode === 'view' && selected && (
          <div className="card">
            <h2>{selected.title}</h2>
            <p>{selected.content}</p>

            <div className="actions">
              <button onClick={() => setMode('edit')}>Edit</button>
              <button className="danger" onClick={deleteNote}>
                Delete
              </button>
            </div>
          </div>
        )}

        {mode === 'create' && (
          <div className="card">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write your note…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="primary" onClick={saveNewNote}>
              Save Note
            </button>
          </div>
        )}

        {mode === 'edit' && (
          <div className="card">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="primary" onClick={saveEdit}>
              Save Changes
            </button>
          </div>
        )}

        {!selected && mode === 'view' && (
          <p className="empty">Select a note or create a new one.</p>
        )}
      </main>
    </div>
  )
}
