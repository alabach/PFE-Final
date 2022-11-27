import { Component,OnInit } from '@angular/core';


import { MENU_ITEMS_ADMIN } from './pages-admin-menu';
import {MENU_ITEMS_MANAGER} from './pages-manager-menu';
import {MENU_ITEMS_COL} from './pages-collaborator-menu';
import { CurUser } from "./all/models/CurUser";
import {Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  curUser: CurUser;
  menu = [];

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.curUser = this.tokenStorageService.getUser();
    if (this.curUser.roles.includes('ADMIN')) {
      this.menu = MENU_ITEMS_ADMIN;
    }
    if (this.curUser.roles.includes('MANAGER')) {
      this.menu = MENU_ITEMS_MANAGER;
    }
    if (this.curUser.roles.includes('COLLABORATOR'))  {
        this.menu = MENU_ITEMS_COL ;
    }
  }
  }

