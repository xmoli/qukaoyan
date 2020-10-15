
export default {
    decrement (state) {
      if ( 0 < state.pager.current) {
        state.pager.current --
      }
    },
    increment (state) {
      if (state.pager.current != state.pager.maxPage) {
        state.pager.current ++
      }
    },
    turn (state, page) {
      let max = state.pager.maxPage
      if ((page <= max) && (page > 0)) {
        state.pager.current = page
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
    syncNote (state, data) {
        state.pager.maxPage = data.page
        state.note[state.note.length - 1] = data.note
      if ((data.page >= 1) && (data.page <= state.pager.maxPage)) {
        if (state.note[data.page-1] === undefined) {//同步一次
          state.note.splice(data.page - 1,1, data.note)
          state.pager.current = data.page
        }
      }
    },
    syncPage (state, {page}) {
      state.pager.maxPage = page
    },
    updateNote (state, newTodos) {
      state.todos = newTodos
    },
    auth (state, obj) {
      if (obj.authorized === true) {
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