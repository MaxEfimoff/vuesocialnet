module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Connection has been establiched');

    // This is comming from our client
    // socket.on('event/postSave', function(createdEventPost) {
    //   // This is going to our client
    //   io.emit('event/postPublished', createdEventPost)
    // })
    socket.on('event/subscribe', function(eventId) {
      console.log('joining event', `event-${eventId}`);
      socket.join(`event-${eventId}`);
    })

    socket.on('event/onsubscribe', function(eventId) {
      console.log('leaving event', `event-${eventId}`);
      socket.leave(`event-${eventId}`);
    })

    socket.on('event/postSave', function(createdEventPost) {
      // This is going to our client
      console.log('emitting to event', `event-${createdEventPost.event}`);
      socket.to(`event-${createdEventPost.event}`).emit('event/postPublished', createdEventPost)
    })
  })
}