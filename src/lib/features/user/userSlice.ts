import { PayloadAction } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 'df046d25-645b-496a-8f66-6526b0fb43b6',
    username: 'laurapalmer@vxskitstovel.se',
    firstName: 'Laura',
    lastName: 'Palmer',
  },
];

export default function userReducer(state = initialState, action: PayloadAction<string>) {
  switch (action.type) {
    default:
      return state;
  }
}
