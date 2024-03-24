import { app } from "../app.js";
import { httpServer } from "../index.js";
import { Message } from "../modals/message.modal.js";
import { Server } from "socket.io";




export function connectWs() {
     let userToSocket = new Map()

    try {

        const io = new Server( httpServer, {
        cors: { origin: "*" },
        });

        io.on('connection', async (socket)=> {
            console.log('ws connection successfully', socket.id)

            socket.on('storeId', (id)=> {
                console.log('socket id',id)
                userToSocket.set(id, socket.id)
            })
            socket.on("send message",async (data)=>{
                console.log(data)
                const {recieverId, senderId, message} = data
                const createdMessage =await Message.create({sender: senderId, reciever: recieverId, content: message})

                io.to(userToSocket.get(recieverId)).to(userToSocket.get(senderId)).emit('receive message', (createdMessage))
                    
            })

            socket.on("disconnect", (reason) => {
                console.log('reason', reason)
              });
        })
       
        
    } catch (error) {
        console.log(error)
    }
}