import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paginationAngular';
  users: any[] = [];
  pagedUsers: any[] = []; // Array to hold currently displayed users
  pageSize = 10; // Number of items per page
  currentPage = 1; // Current page number
  totalPages = 0; // Total number of pages

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllPosts().subscribe(
      (data: any[]) => {
        this.users = data;
        this.updatePagedUsers(); // Initial load of paged users
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  updatePagedUsers(): void {
    // Calculate total number of pages
    this.totalPages = Math.ceil(this.users.length / this.pageSize);

    // Validate current page
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    // Calculate start and end indices for current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.users.length);

    // Slice users array to display paged users
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedUsers();
    }
  }
}
