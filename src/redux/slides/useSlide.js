import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  avatar: '',
  address: '',
  id: '', // id của user trong database
  access_token: '',
  isAdmin: '',
  city: '',
  

}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const {name='', email='', access_token='', phone='', address='', avatar='', id='', isAdmin='', city=''} = action.payload;
        console.log('action', action);
        state.name = name || '';
        state.email = email || '';
        state.phone = phone || '';
        state.address = address || '';
        state.avatar = avatar || '';
        state.id = id;
        state.isAdmin = isAdmin;  // Kiểm tra user có phải admin hay không
        state.access_token = access_token;
        state.city = city; // Thêm thông tin thành phố vào user

    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.isAdmin = '';  // Kiểm tra user có phải admin hay không
      state.access_token = '';
      state.city = ''; // Thêm thông tin thành phố vào user
    }
  }, 
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer