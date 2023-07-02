import SocketIO from "socket.io";
import { User } from "../classes/User";

const users = new User();

export const socketController = (client: SocketIO.Socket) => {
  console.log("conectado");

  client.on("enter-room", (data, callback) => {

    // console.log('data ',data);
    if (!data.user) {
      return callback({
        error: true,
        message: "El nombre es necesario"
      })
    }

    let personas = users.addPerson(client.id, data.user);

    client.broadcast.emit('people-list', users.getPeople());

    callback({people:personas,me:client.id})

  })

  client.on('leave-room', (data) => {
    let deletedPerson = users.deletePerson(data.id);
    client.broadcast.emit('notify', { user: 'Admin', message: `${deletedPerson.name} has left room` });
    client.broadcast.emit('people-list', users.getPeople());
  })

  client.on("disconnect", () => {
    let deletedPerson = users.deletePerson(client.id);
    client.broadcast.emit('notify', { user: 'Admin', message: `${deletedPerson.name} has left room` });
    client.broadcast.emit('people-list', users.getPeople());
  })


}