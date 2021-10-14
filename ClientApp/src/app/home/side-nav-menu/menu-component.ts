export class MenuItem {
    constructor(
        public name: string,
        public route: string,
        public icon: string = ''
    ) {}
}
export const adminList = [
  new MenuItem('Dashboard', 'dashboard','nav-icon fas fa-tachometer-alt mr-3 fa-2x'),
    new MenuItem('Manage Admin','manage-admin' ,'nav-icon fas fa-user-cog mr-3 fa-2x'),
  new MenuItem('Manage Items', 'manage-items', 'nav-icon fas fa-layer-group mr-3 fa-2x'),
  new MenuItem('Manage Kitchen', 'manage-kitchen', 'nav-icon fas fa-pizza-slice mr-3 fa-2x'),
  new MenuItem('Order Reports', 'order-reports', 'nav-icon fas fa-chart-bar mr-3 fa-2x'),
];
