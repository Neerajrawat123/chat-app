export function debounce(func, delay){
    let timer;
    console.log('working')
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { console.log('getting data')}, delay);
      };
}


export function getSuggestions() {
    console.log('getting data')
    
}