import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from '../pages/Login.js';
import { BrowserRouter } from "react-router-dom";


test('renders login form', () => {
  render(
    <BrowserRouter>
    <Login />
    </BrowserRouter>
  );
  expect(screen.getByText(/Login Form/i)).toBeInTheDocument();
});

// test('submits login form', async () => {
//   const mockUser = { email: 'test@example.com', password: 'password' };

//   render(<Login />);
//   fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: mockUser.email } });
//   fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: mockUser.password } });

//   fireEvent.click(screen.getByText(/Login/i));

//   // Mock the API call using jest.mock or a library like msw

//   await waitFor(() => {
//     expect(localStorage.getItem('user')).not.toBeNull();
//   });
// });
