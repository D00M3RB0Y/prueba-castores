import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(private toast: ToastrService) {}

  messageError(e: HttpErrorResponse) {
    if (e.error.msg) {
      console.log(e.error.msg);
      this.toast.warning(e.error.msg, 'Error');
    } else {
      this.toast.error('Server error', 'Error');
    }
  }
}
