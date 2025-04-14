import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ListboxModule } from 'primeng/listbox';

@Component({
    imports: [CommonModule, FormsModule, TextareaModule, ListboxModule],
    selector: 'mentionable-textarea',
    template: `
    <div class="w-full">
      <textarea pInputTextarea [(ngModel)]="commentText" (keyup)="onTextChange($event)" rows="5"></textarea>
      <ul *ngIf="filteredUsers.length > 0" class="mention-suggestions">
        <li *ngFor="let user of filteredUsers" (click)="selectUser(user)">{{ user }}</li>
      </ul>
    </div>
  `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MentionableTextareaComponent {
  @Input() public users: string[] = [];
  @Output() public commentCreated = new EventEmitter<string>();

  public commentText: string = '';
  public filteredUsers: string[] = [];

  constructor() {}

  public onTextChange(event: KeyboardEvent): void {
    const textareaValue = this.commentText;
    const mentionMatch = textareaValue.match(/@([\w]*)$/);

    if (mentionMatch) {
      const mentionText = mentionMatch[1];
      this.filteredUsers = this.users.filter(user => user.toLowerCase().startsWith(mentionText.toLowerCase()));
    } else {
      this.filteredUsers = [];
    }
  }

  public selectUser(user: string): void {
    const mentionMatch = this.commentText.match(/@([\w]*)$/);
    if (mentionMatch) {
      const mentionText = mentionMatch[0];
      this.commentText = this.commentText.replace(mentionText, `@${user} `);
      this.filteredUsers = [];
    }
  }

  public createComment(): void {
    this.commentCreated.emit(this.commentText);
    this.commentText = '';
  }
}
