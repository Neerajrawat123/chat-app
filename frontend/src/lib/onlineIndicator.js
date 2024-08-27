import axios from 'axios';
import { useChatStore } from '../store/chatStore';


const setOnlineStatus = useChatStore.getState().setOnlineStatus

export async function subscribe(id) {
    let retryCount = 0;
    const maxRetries = 5;

    while (true) {
        try {
            const res = await axios.get(`user/isOnline/${id}`);
            
            if (res.status === 200) {
                console.log(res.data.msg)
                if (res.data.msg === 'online') {
                    console.log('i am online')
                    setOnlineStatus(true);
                    await new Promise(resolve => setTimeout(resolve, 120000));  // 2 minutes delay
                } else {
                    setOnlineStatus(false);
                    break;  // Stop checking if the user is offline
                }
            }
        } catch (error) {
            console.error('Error during subscription:', error);

            // Exponential backoff with a cap
            if (retryCount < maxRetries) {
                const delay = Math.min(1000 * 2 ** retryCount, 32000);  // Cap delay at 32 seconds
                await new Promise(resolve => setTimeout(resolve, delay));
                retryCount++;
            } else {
                console.error('Max retries reached. Stopping subscription attempts.');
                break;
            }
        }
    }
}
