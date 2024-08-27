import axios from 'axios'
import { create } from 'zustand'

export const useUserStore = create((set) => ({
  currentUser: null,
  loading: false,
  updateUser : (userData) => set({currentUser: userData}),
  friends: [],
  getFriends: (userId) => set(state => {
    if(!userId) return state.friends = []

    try {
      axios.get(`user/getFriends/${userId}`).then((response) => {
        console.log(response)
        return {friends: response.data.friends}
      })
    } catch (error) {
      console.log(error)
      return { friends: []}
      
    }
  }),
  startConversation: (friendId) => set(async (state) => {
    if(!friendId) return 

    try {
      const res = await axios.post(`user/start-conversation`,{
        senderId: state.currentUser.id,
        recieverId: friendId
      })
      return { friends: [...state.friends, res.data]}
    } catch (error) {
      console.log(error)
      
      
    }
  }),
 
  removeUser: () => set({ currentUser: null }),
}))