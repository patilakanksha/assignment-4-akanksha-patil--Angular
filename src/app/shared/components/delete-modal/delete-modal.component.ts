import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Output() close = new EventEmitter();
  @Output() confirmedDelete = new EventEmitter();

  public onClose(): void {
    this.close.emit();
  }

  public delete(): void {
    this.confirmedDelete.emit();
  }
}

