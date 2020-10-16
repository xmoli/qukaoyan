
export default {
    PAGE_CURRENT (state, page) {
        state.noteInfo.current = page
    },
    PAGE (state, page) {
      state.noteInfo.page = page
      if (state.note.length !== page) {
        state.note = new Array(state.noteInfo.page)
      }
    },
    decrement (state) {
      if ( 0 < state.noteInfo.current) {
        state.noteInfo.current --
      }
    },
    increment (state) {
      if (state.noteInfo.page > state.noteInfo.current) {
        state.noteInfo.current ++
      }
    },
    updateRate (state, {index, rate}) {
      if (state.todos[index].task) {
        state.needSync = true
      }
      state.todos[index].rate = rate
    },
    getNoteToday (state, todo) {
      let index = state.noteInfo.page - 1
      if (index >= 0) {
        state.note.splice(index, 1, {todo})
      }
    },
    getNote (state, note) {
      state.note.splice(state.noteInfo.current - 1,1, note)
    },
    noteInfo (state, {page}) {
      state.noteInfo.page = page
    },
    updateNote (state, newTodos) {
      if (state.note.length > 0) {
        state.note[state.note.length -1] = newTodos
      }
    },
    auth (state, authorized) {
      if (authorized == true) {
        state.user.authorized = true
      } else {
        state.user.authorized = false
      }
    },
    selectDate (state, date) {
      if (new Date(date) == 'Invalid Date') {
        return
      }
      let dateTemp = new Set(state.event.date)
      dateTemp.add(date)
      state.event.date = Array.from(dateTemp).sort()
      state.event.finishDate = date
    },
    userEvent (state, data) {
      state.event = data
    },
    userInfo (state, data) {
        state.user = {
            ...data,
            authorized: state.user.authorized
        }
    },
    loading (state, bool) {
      state.loading = bool
    },
    syncFlag (state, bool) {
      state.needSync = bool
    },
    error (state, {type, message}) {
      state.Error[type] = message
      console.error(type,'\n',message)
    }
  }