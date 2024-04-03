import { Component, OnInit } from '@angular/core';
import { LoaderSpinnerService } from '../../../core/services/loader-spinner.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss'],
  standalone: true,
  imports:[MatProgressSpinnerModule]
})

class LoaderSpinnerComponent implements OnInit{
    isLoading = false;

    constructor(private loaderSpinnerService: LoaderSpinnerService) {}

    ngOnInit() {
      this.loaderSpinnerService.isLoading.subscribe((isLoading: boolean) => {
        console.log(isLoading)
        this.isLoading = isLoading;
      });
    }
  }

export default LoaderSpinnerComponent;
