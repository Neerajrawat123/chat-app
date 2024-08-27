import { create } from 'zustand'

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  conId:null,
  setConId: (newCon) => set({conId: newCon}),
  chatUsers: [],
  OnlineStatus : false,
  addChatUsers: (newchatUser) => set((state) => ({chatUsers: [...state.chatUsers, newchatUser]})),
  setChatUsers: (chatUser) => set({chatUsers: chatUser}),
  updateLastMessage: (userId, msg) => set((state) => ({
    chatUsers: state.chatUsers.map((user) => 
      user.userId === userId ? { ...user,lastMessage: msg.content } : user
    )
  })),
  changeChat : (newChatId, newChatUser) => set({chatId:newChatId, user: newChatUser}),
  setOnlineStatus: (status) =>{
    console.log(status)
    return  set({ OnlineStatus: status})
  }
   
 
 
}))