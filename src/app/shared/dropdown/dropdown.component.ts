import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @ViewChild(MatMenu) menu!: MatMenu;
  @Input() options: { label: string, icon: string, action: () => void }[] = [];
  @Output() optionSelected = new EventEmitter<any>();

  onOptionClick(option: any) {
    if (option.action) option.action();
    this.optionSelected.emit(option);
  }
}
