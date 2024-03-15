export class Menu {
    menuName: string;
    icon: string | null;
    href: string | null;
    tooltip: string | null;
    level: number;
    disabled: boolean;
    selected: boolean;
    children: Menu[];
    permissions:[];
}