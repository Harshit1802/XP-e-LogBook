import { Component, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Menu } from "src/app/models/menu";
import { User } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { RendererService } from "src/app/services/renderer.service";

@Component({
  selector: "app-menu",
  templateUrl: "./app-menu.component.html",
  styleUrls: ["./app-menu.component.less"],
})
export class AppMenuComponent implements OnInit {
  menus: Menu[] = [];
  userPermissions: any[] = [];
  permissionName: any[] = [];
  user: User;
  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private rendererService: RendererService
  ) { }
  ngOnInit(): void {
    const permissions = sessionStorage.getItem("permissions");
    this.userPermissions = JSON.parse(permissions);
    this.permissionName=[];
    if(this.userPermissions && this.userPermissions.length > 0){
      this.permissionName = this.userPermissions[0].map(
        (permission) => permission.permissionName.trim()
      );
    }
    this.getMenu();
  }

  filterMenus(menuArray, parentPermissions = []) {
    return menuArray.filter(menu => {

      const mergedPermissions = [...parentPermissions, ...(menu.permissions || [])];

      // Check if the menu or any of its parents has any permissions
      if (mergedPermissions.length > 0 && mergedPermissions.some(permission => this.permissionName.includes(permission.trim()))) {
        menu.permissions = mergedPermissions;

        // If the menu has children, recursively filter them
        if (menu.children && menu.children.length > 0) {

          menu.children = this.filterMenus(menu.children, mergedPermissions);

        }
        return true;
      } else if (menu.children && menu.children.length > 0) {
        // If the menu has no permissions, check its children
        menu.children = this.filterMenus(menu.children, mergedPermissions);
        return menu.children.length > 0;;
      } else {
        return false;
      }

    });
  }

  getMenu() {
    this.rendererService.getMenus().subscribe((json) => {
      this.menus = this.filterMenus(json);

      let level = 1;
      this.menus.forEach((a) => {
        a.level = 1;
        a && a.children.forEach((b) => {
          b.level = 2;

          b && b.children.forEach((c) => {
            c.level = 3;
          });
        });
      });
      console.log(this.menus);
    });
  }
  hasPermission(userPermissions: string[], menu: any): boolean {
    if (!menu.permissions) {
      return true; // If menu has no permissions, allow access
    }
    return menu.permissions.some((permission) =>
      userPermissions.includes(permission)
    );
  }
  menuClick(menu: Menu) {
    menu.selected = true;
    this.router.navigateByUrl(menu.href);
  }
}
