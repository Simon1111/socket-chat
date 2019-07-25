export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [...state, action.payload];
        case 'LOAD_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}