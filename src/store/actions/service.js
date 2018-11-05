import axios from 'axios'
import * as actionTypes from './actionTypes'


 const setAll=(services)=>
 {
     return{
         type: actionTypes.SERVICE_LOAD_SERVICE,
         services: services
     }
 }

export const getAll = ()=>{
    return dispatch=>{
        axios.get('/Services').then(result => {
            dispatch(setAll(result.data))
        })
    }
}

export const onFieldChanged = (field, value) => {
    return {
        type: actionTypes.SERVICE_FIELD_CHANGE,
        field: field,
        value: value
    }
}

export const newPropertyHandler = ()=>{
    return {
        type: actionTypes.SERVICE_ADD_NEW_PROPERTIES
    }
}

export const removePropertyHandler = (index)=>{
    return{
        type: actionTypes.SERVICE_DELETE_NEW_PROPERTIES,
        index: index

    }
}

export const onPropertyTitleChanged = (index,value)=>{
    return{
        type: actionTypes.SERVICE_PROPERTY_TITLE_CHANGED,
        index: index,
        value: value
    }
}

export const onPropertyCodeChanged = (index, value) => {
    return {
        type: actionTypes.SERVICE_PROPERTY_CODE_CHANGED,
        index: index,
        value: value
    }
}


/*export const addService=(props)=>{
    return dispatch=>{
        axios.post('/services',)
    }
}*/