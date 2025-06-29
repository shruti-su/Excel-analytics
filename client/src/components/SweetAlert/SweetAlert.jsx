import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const sweetAlert = () => {
  const MySwal = withReactContent(Swal)
    const showSuccess = (message) => {
        MySwal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
    const showError = (message) => {
        MySwal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }
    const showWarning = (message) => {
        MySwal.fire({
            title: 'Warning!',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
    }
    return {
        showSuccess,
        showError,
        showWarning
    };
}