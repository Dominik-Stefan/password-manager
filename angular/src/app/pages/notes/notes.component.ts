import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Note } from '../../data_classes/note';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../data_classes/user';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  user: User = new User();

  notes: Note[] = [];
  cardSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor() {}

  userService = inject(UserService);
  noteService = inject(NoteService);

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.cardSubject = this.noteService.getNotes();
    this.cardSubject.subscribe((res) => {
      this.notes = res;
    });
  }
}
