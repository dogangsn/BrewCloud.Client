import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    MatTreeFlattener,
    MatTreeFlatDataSource,
} from '@angular/material/tree';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { TranslocoService } from '@ngneat/transloco';
import { RolsService } from 'app/core/services/generalsettings/rols/rols.service';
import {
    compactNavigation,
    defaultNavigation,
    futuristicNavigation,
    horizontalNavigation,
} from 'app/mock-api/common/navigation/data';
import { CreateRoleSettingCommand } from '../../models/CreateRoleSettingCommand';
import { SelectedNavigationDto } from '../../models/SelectedNavigationDto';

interface FoodNode {
    title: string;
    id: string;
    children?: FoodNode[];
    checked: boolean;
}

// const TREE_DATA: FoodNode[] = [
//     {
//         name: 'Fruit',
//         children: [
//             { name: 'Apple' },
//             { name: 'Banana' },
//             { name: 'Fruit loops' },
//         ],
//     },
//     {
//         name: 'Vegetables',
//         children: [
//             {
//                 name: 'Green',
//                 children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
//             },
//             {
//                 name: 'Orange',
//                 children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
//             },
//         ],
//     },
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    title: string;
    level: number;
    id: string;
    checked: boolean;
}




@Component({
    selector: 'app-create-edit-roleDef',
    templateUrl: './create-edit-roleDef.component.html',
    styleUrls: ['./create-edit-roleDef.component.css'],
})
export class CreateEditRoleDefComponent implements OnInit {
    private _defaultNavigation: any[] = defaultNavigation;
    selectedrole: string;
    roles: FormGroup;
    selectedItems: string[] = [];
    selectedItemsTitle: string[] = [];

    rolesAction: any[];
    

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            title: node.title,
            level: level,
            id: node.id,
            children: node.children,
            checked: false,
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        (node) => node.level,
        (node) => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );

    dataSource = new MatTreeFlatDataSource(
        this.treeControl,
        this.treeFlattener
    );


    
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _rolsSettings : RolsService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        //this.dataSource.data = defaultNavigation;
        //this.dataSource.data = TREE_DATA;
        this.dataSource.data = this._defaultNavigation;
        console.log(defaultNavigation);
        // TREE_DATA = defaultNavigation;

 

    }

    ngOnInit() {
        this.roles = this._formBuilder.group({
            rolecode: ['', Validators.required],
            mainpage: ['', Validators.required]
        });

        this.rolesAction = [
            {
                label      : 'Read',
                value      : 'read',
                description: 'Can read and clone this repository. Can also open and comment on issues and pull requests.'
            },
            {
                label      : 'Write',
                value      : 'write',
                description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
            },
            {
                label      : 'Admin',
                value      : 'admin',
                description: 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
            }
        ];

    }

    addOrUpdateRole(): void {
        this.selectedrole ? this.updateRols() : this.addRols();
    }

    addRols(): void {

        debugger;

        const rolsItem = new CreateRoleSettingCommand();
        rolsItem.rolecode = this.getFormValueByName("rolecode");
        rolsItem.mainpage = this.getFormValueByName("mainpage");
        rolsItem.installdevice = true;
    
        rolsItem.SelectedNavigations = [];
        this.selectedItems.forEach((nav) => {
            const selectedNavDto  = new SelectedNavigationDto(nav, null);
            rolsItem.SelectedNavigations.push(selectedNavDto);
        });

        this._rolsSettings.createRols(rolsItem).subscribe(
            (response) => {
                debugger;

                if (response.isSuccessful) {
                    this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                    this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    showSweetAlert(arg0: string) {
        throw new Error('Method not implemented.');
    }

    updateRols(): void {

   
        // const user = new UpdateRoleSettingCommand();

        // this._usersService.addUser(user).subscribe(
        //     (response) => {
        //         debugger;

        //         if (response.isSuccessful) {
        //             this.showSweetAlert('success');
        //             this._dialogRef.close({
        //                 status: true,
        //             });
        //         } else {
        //             this.showSweetAlert('error');
        //         }
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    treeControlbyItem(e): void {
        debugger;
    }
    nodeSelectionToggle(node: any, checked: boolean) {
        if (!node.children) {
            if (checked) {
                this.selectedItems.push(node.id);
                this.selectedItemsTitle.push(node.title);
            } else {
                const index = this.selectedItems.indexOf(node.id);
                if (index !== -1) {
                    this.selectedItems.splice(index, 1);
                }
            }
        } else {
            node.children.forEach((element) => {
                if (checked) {
                    const index = this.selectedItems.indexOf(element.id);
                    if (index === -1) {
                        element.checked = true;
                        this.selectedItems.push(element.id);
                        this.selectedItemsTitle.push(node.title);
                        this.treeControl.dataNodes.forEach((n) => {
                            if (n === element) {
                                n.checked = true;
                            }
                        });
                    }
                } else {
                    const index = this.selectedItems.indexOf(element.id);
                    if (index !== -1) {
                        element.checked = false;
                        this.selectedItems.splice(element.id);
                    }
                }
            });

            const indexData = this.treeControl.dataNodes.indexOf(node);
            if (indexData !== -1) {
                this.treeControl.dataNodes[indexData] = node;
            }
        }
        console.log(this.selectedItems);
    }

    getFormValueByName(formName: string): any {
        return this.roles.get(formName).value;
    }


}
