import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customers',
  standalone: false,
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  //customers: Array<Customer> | undefined;
  customers!: Observable<Array<Customer>>;
  searchFormGroup: FormGroup | undefined;

  errorMessage!: string;
  private cdr = inject(ChangeDetectorRef);
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    /*
      this.customerService.getCustomers().subscribe({
        next: (data) => {
          console.log("Données reçues de l'API :", data);
          this.customers = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err;
          this.cdr.markForCheck();
        },
      });
  */
    /*
       customers!: Observable<Array<Customer>>; declaration
       @for (customer of (customers | async); track customer.id)  // Dans html

    this.customers =
      this.customerService.getCustomers().pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return throwError(err);
        }),
      );
 */
    this.handleSearchFormGroup();

    /*
       this.http.get("http://localhost:8085/customers").subscribe({
         next : (data)=>{
           this.customers = data;
           console.log("pass");
         },error:(err)=>{
           console.log(err);
         }
         }
       )*/
  }

  handleSearchFormGroup() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      }),
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf=confirm("Are you sure to delete this customer?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: resp=>{
        this.customers= this.customers.pipe(
          map(data=>{
            let index = data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        );
    },error: err => {
        console.log(err)
      }
    });
  }
}
