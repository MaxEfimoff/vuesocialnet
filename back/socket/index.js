module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Connection has been establiched');
    // We are listening our 'event/subscribe' comming from client
    // And when this event is emitted, we are calling function(eventId) {...}
    // And passing eventId from the client to this function
    socket.on('event/subscribe', function(eventId) {
      console.log('joining event', `event-${eventId}`);
      // After passing the id we are joining `event-${eventId}` socket
      // And onli users who joined this socket are listening new messages
      socket.join(`event-${eventId}`);
    })

    // When we are unsibscribing from our socket
    // We are passing eventId from the client to function function(eventId) {...}
    socket.on('event/unsubscribe', function(eventId) {
      console.log('leaving event', `event-${eventId}`);
      // And leaving `event-${eventId}` socket so we won't be listening new messages
      socket.leave(`event-${eventId}`);
    })

    // We are listening to the 'event/postSave' event we sent from EventPostCreate.vue component
    socket.on('event/postSave', function(createdEventPost) {
      // This is going to our client
      console.log('emitting to event', `event-${createdEventPost.event}`);
      // When the eventpost is saved we are emitting 'event/postPublished' 
      // To our new socket `event-${createdEventPost.event}`
      // And we are sending createdEventPost (eventpost we created) 
      socket.to(`event-${createdEventPost.event}`).emit('event/postPublished', createdEventPost)
    })
  })
}