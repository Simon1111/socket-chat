import axios from 'axios';

export const loadMessages = () => dispatch => {
    axios.get('/api')
        .then(res => {
            let payload = res.data.map(req => req.message);
            dispatch({
                type: 'LOAD_MESSAGE',
                payload
            })
        });
}