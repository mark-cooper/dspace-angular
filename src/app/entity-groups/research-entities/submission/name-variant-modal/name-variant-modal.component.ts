import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * This component a pop up for when the user selects a custom name variant during submission for a relationship$
 * The user can either choose to decline or accept to save the name variant as a metadata in the entity
 */
@Component({
  selector: 'ds-name-variant-modal',
  templateUrl: './name-variant-modal.component.html',
  styleUrls: ['./name-variant-modal.component.scss']
})
export class NameVariantModalComponent {
  @Input() value: string;

  constructor(public modal: NgbActiveModal) {
  }
}