import axios from '../api/axiosConfig'
import { request, success, fail, requestDetails, successDetails, failDetails } from '../reducers/OrderReducers'


export const createOrder = (order) => async (dispatch,getState) => {
    try {
      dispatch(request())

      const {userLogin : {userInfo},} = getState()
       console.log('createOrder → userInfo.token:', userInfo?.token);
       console.log('createOrder → order payload:', order);

      const config = {
        headers : {
            'content-Type':'application/json',
            Authorization : `Bearer ${userInfo.token}`,
        },
      }     

      const { data } = await axios.post(`/api/orders`,order,config)
      dispatch(success(data))
   
    } catch (err) {
      const error = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch(fail(error))
    }
  }

  export const getOrderDetails = (id) => async (dispatch,getState) => {
    try {
      dispatch(requestDetails())

      const {userLogin : {userInfo},} = getState()

      const config = {
        headers : {
            'content-Type':'application/json',
            Authorization : `Bearer ${userInfo.token}`,
        },
      }     

      const { data } = await axios.get(`/api/orders/${id}`,config)
      dispatch(successDetails(data))
   
    } catch (err) {
      const error = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch(failDetails(error))
    }
  }