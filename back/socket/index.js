module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Connection has been establiched');

    // This is comming from our client
    socket.on('event/postSave', function(post) {
      // This is going to our client
      socket.emit('event/postPublished', post)
    })

  })
}