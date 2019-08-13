import { get } from "./api";

// Move all routes to this file so we don't manually have to handle all onSucces, onFail functions.
// Something like:


// export function handleApiRequest(method, params, onSuccess) {
//     return dispatch => {
//         get( 'stuff' ,
//         result => onSuccess(result),
//         error => {
//             dispatch('API_ERROR')
//         })
//     }
   
// }