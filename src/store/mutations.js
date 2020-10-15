
export default {
    PAGE_CURRENT (state, page) {
      let max = state.noteInfo.page
      if ((page <= max) && (page > 0)) {
        state.noteInfo.current = page
      }
    },
    PAGE (state, page) {
      state.noteInfo.page = page
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
    addTask (state) {
      state.needSync = true
      const task = { task: null, rate: 0, key: new Date().getTime()}

      let offset = 1
      if (state.note.length === 0) {
        state.note.push([])
        offset = 0
        }

      state.note[offset].push(task)
    },
    removeTask (state, index) {
      state.needSync = true
      if (state.note.length > 0) {
        state.note[state.note.length - 1].splice(index, 1)
      }
    },
    updateTask (state, {index, task}) {
      state.needSync = true
      if (state.note.length > 0) {
        state.note[state.note.length - 1][index].task = task
      }
    },
    updateRate (state, {index, rate}) {
      if (state.todos[index].task) {
        state.needSync = true
      }
      state.todos[index].rate = rate
    },
    getNoteToday (state, data) {
      state.note.pop()
      state.note.push(data.note)
    },
    getNote (state, data) {
      if (state.note.length > 0) {
        state.note.splice(data.page - 1,1, data.note)
      }
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