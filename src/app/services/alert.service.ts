import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showSuccess(message: string, title: string = 'Éxito'): void {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  showError(message: string, title: string = 'Error'): void {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  async showSelection(
    message: string,
    confirmationMessage: string,
    title: string
  ): Promise<boolean> {
    try {
      const result = await Swal.fire({
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmationMessage,
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: 'Acción confirmada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en showSelection:', error);
      return false;
    }
  }
}
