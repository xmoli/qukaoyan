function* genNumber (val = 0, step = 1) {
    let n = val
    while(true) {
        yield n
        n = n + step
    }
}

module.exports = {genNumber}