import React, {useReducer} from "react";

type initialState = {
    status: string
}
const initial = {status: ''}

function reducer(state: initialState,  action: string): initialState {
    switch (action) {
        case "FETCH_SUCCESS":
            return {status: 'success'}
            break;
        
        case "FETCH_ERROR":
            return {status: 'error'}
            break;

        case "FETCH_ERROR":
            return {status: 'loading'}
            break;

        default:
            return initial
    }

}


export function Response() {
  const [FETCH_STATUS, FETCH_STATUS_DISPATCH] = useReducer(reducer, initial)
  return {FETCH_STATUS, FETCH_STATUS_DISPATCH}
}


