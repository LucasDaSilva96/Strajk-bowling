import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import InitialLoader from './pages/InitialLoader';
import Booking from './pages/Booking';
import BookingOverview from './pages/BookingOverview';
import BookingConfirmation from './pages/BookingConfirmation';
import NotFound from './pages/NotFound';
import RootLayout from './layout/RootLayout';
import { AiOutlineClose } from 'react-icons/ai';

const router = createBrowserRouter([
  {
    path: '/',
    element: <InitialLoader />,
  },
  {
    path: '/booking',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Booking />,
      },
      {
        path: 'overview',
        element: <BookingOverview />,
      },
      {
        path: 'confirmation',
        element: <BookingConfirmation />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position='top-center'
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#60d394',
            color: '#fff',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#ee6055',
            color: '#fff',
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <AiOutlineClose size={24} className='drop-shadow-md' />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  </StrictMode>
);
