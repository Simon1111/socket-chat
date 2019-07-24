import {combineReducers} from 'redux';
import MessagesReducers from './messages';

const allReducers = combineReducers({
    messages: MessagesReducers,
    tech: "React "
});

export default allReducers;