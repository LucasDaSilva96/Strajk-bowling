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
import ErrorElement from './components/ErrorElement';
import { updatePageTitle } from './services/updatePageTitle';

const router = createBrowserRouter(
  [
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
          loader: () => {
            updatePageTitle('Booking');
            return null;
          },
        },
        {
          path: 'overview',
          element: <BookingOverview />,
          loader: () => {
            updatePageTitle('Overview of bookings');
            return null;
          },
        },
        {
          path: 'confirmation',
          element: <BookingConfirmation />,
          loader: () => {
            updatePageTitle('Confirmation');
            return null;
          },
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
      loader: () => {
        updatePageTitle('Not found');
        return null;
      },
    },
    {
      errorElement: <ErrorElement />,
    },
  ],
  // This is the new `future` option that we're passing to the router
  {
    future: {
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
    },
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
      router={router}
      // This is the new `future` option that we're passing to the router provider
      future={{
        v7_startTransition: true,
      }}
    />
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
            background: '#208b3a',
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
