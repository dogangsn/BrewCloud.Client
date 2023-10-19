import { SelectedNavigationDto } from "./SelectedNavigationDto";

export class UpdateRoleSettingCommand {
    rolecode: string;
    installdevice: boolean;
    selectedSidebarNavigations: SelectedNavigationDto[];
}