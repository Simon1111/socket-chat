import { combineReducers } from 'redux';
import messages from './messages';

const allReducers = combineReducers({
    messages: messages
});

export default allReducers;