import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    isLoading: true,
    isAdmin: false,
    userLoginSuccess:true,
    selectedPrice: null,
    selectedPlan: null,
    selectedNumber: null,
    
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    adminLogoutSuccess(state) {
      state.isAdmin = false;
      // handle other state changes on successful logout
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    setSelectedNumber: (state, action) => {
      state.selectedNumber = action.payload;
    },
    
  },
});

export const { setToken, setUser, setError, setLoading, setIsAdmin, adminLogoutSuccess,setSelectedPrice,setSelectedPlan,setSelectedNumber  } = authSlice.actions;





export const adminLogin = (username, password) => async (dispatch,getState) => {
  try {
    
    console.log('username: ', username)
    console.log('password: ', password)

    const response = await axios.post('http://127.0.0.1:8000/admins/admin-token/', {
      username: username,
      password: password,
    }).catch((error) => {
      console.log('error', error.message)
    });

    const decodedToken = jwt_decode(response.data.access);

    if (decodedToken.is_admin) {
      const authTokens = {
        access: response.data.access,
        refresh: response.data.refresh,
      };
      dispatch(setToken(authTokens));
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify(decodedToken.user_id));
      dispatch(setUser(decodedToken.username));
      dispatch(setIsAdmin(true));
      alert("Welcome Admin")
      const authState = getState().auth;
    } else {
      alert("UnAuthorized")
    }
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};
export const userLogin = (mob_number, otp) => async (dispatch) => {
  try {
    
    console.log('mob_number: ', mob_number)
    console.log('otp: ', otp)

    const response = await axios.post('http://127.0.0.1:8000/api/user-login/', {
      mob_number:mob_number,
      otp:otp,
    }).catch((error) => {
      console.log('error', error.message)
    });
    console.log('response', response.data)
    const decodedToken = jwt_decode(response.data.access);
    dispatch(setToken(response.data.access));
    localStorage.setItem('authTokens', JSON.stringify(response.data));
    localStorage.setItem('user', JSON.stringify(decodedToken));
    dispatch(setUser(decodedToken.username));
    alert("Welcome User")
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const updateToken = () =>async (dispatch,getState)=>{
  const loading = getState().isLoading
  console.log('update token called')
  try {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    console.log("sending: ",authTokens?.refresh)
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      'refresh': authTokens?.refresh
    }).catch((error) => {
      console.log('error', error.message)
    });
    console.log("response: ",response)
    if (response.status == 200) {
      
      const authTokens = {
        access: response.data.access,
        refresh: response.data.refresh,
      };
      dispatch(setToken(authTokens));
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      console.log("Tokes Updated Successfully")
        }
    else {
      dispatch(logout())
      console.log("logged out")
    }
    if(loading){
      dispatch(setLoading(false))
    }
    } catch (error) {
  // Handle error
      console.error('Error:', error);
    }

}




export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('authTokens');
    dispatch(setLoading(false));
    dispatch(setToken(null));
    dispatch(setUser(null));
    return true;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};


export default authSlice.reducer;