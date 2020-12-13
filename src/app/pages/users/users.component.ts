import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserRecap } from '../../models/UserRecap';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxCreditComponent } from '../../components/dialog-box-credit/dialog-box-credit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: UserRecap[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<UserRecap>(this.users);

  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers() {
    this.usersService.getUsers().subscribe( (data) => {
      this.users = data.body;
      this.users = this.sortUsersByName(this.users);
      console.log(this.users);
      this.dataSource.data = this.users;
    })
  }

  // function that orders users alphabetically by name
  sortUsersByName(users :UserRecap[])  {
    let sortedUsers = users.sort((a,b) => {
      if( a.name.toLowerCase() < b.name.toLowerCase()) {
        return - 1;
      }
      if( a.name.toLowerCase() > b.name.toLowerCase()) {
        return - 0;
     }
     return 0;
     })
     return sortedUsers;
  }

  // callback function on btn to credit user
  openDialog(id: number) {
    let dialogRef = this.dialog.open(DialogBoxCreditComponent, {data: {userId: id}})

    dialogRef.afterClosed().subscribe( creditAmount => {
      console.log(`montant crédité : ${creditAmount}€`);
    })
  }

}
