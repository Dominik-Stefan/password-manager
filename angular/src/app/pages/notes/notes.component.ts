import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Note } from '../../data_classes/note';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../data_classes/user';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor() {
    this.init();
  }

  router = inject(Router);
  userService = inject(UserService);
  noteService = inject(NoteService);

  init() {
    this.user = this.userService.getUser();
    this.cardSubject = this.noteService.getNotes();
    this.cardSubject.subscribe((res) => {
      this.notes = res;
    });
  }

  deleteNote(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(id);
    }
  }

  goToAdd() {
    this.router.navigate(['new', 'note']);
  }
}
