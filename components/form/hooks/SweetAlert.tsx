import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const SweetAlert = {
    success: (title: string, imageUrl?: string) => {
      return Swal.fire({
        title,
        imageUrl,
        confirmButtonText: 'Add Another Response',
        customClass: {
        title: 'custom-css-sweetalert-title',
        confirmButton: 'custom-css-confirm-button',
        },
        width: '32vw',
      });
    },
    error: (title: string, text?: string) => {
      return Swal.fire({
        icon: 'error',
        title : 'text-text',
        text,
      });
    },
    info: (title: string, text?: string) => {
      return Swal.fire({
        icon: 'info',
        title,
        text,
      });
    },
    warning: (title: string, text?: string) => {
      return Swal.fire({
        icon: 'warning',
        title,
        text,
      });
    },
    confirm: (title: string, text: string, onConfirm: () => void, onCancel: () => void) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        return swalWithBootstrapButtons.fire({
          title,
          text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            onConfirm();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            );
            onCancel();
          }
        });
      },
  };

export default SweetAlert
