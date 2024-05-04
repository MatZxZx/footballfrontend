import { toast } from 'react-toastify'

export const notify = (m) => (toast(m, {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  className: 'text-xs font-poppins font-black italic ',
  rtl: false,
  style: {
    background: '#247855',
    color: '#fff'
  },
  icon: <i className="fa-solid fa-circle-check"></i>
}))

export const errorNotify = (m) => (toast(m, {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  className: 'text-xs font-poppins font-black italic',
  closeButton: false,
  rtl: false,
  style: {
    background: '#B81212',
    color: '#fff'
  },
  icon: <i className="fa-solid fa-triangle-exclamation"></i>
}))