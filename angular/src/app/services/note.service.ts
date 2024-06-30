import { Injectable, inject } from '@angular/core';
import { Note } from '../data_classes/note';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [];
  noteSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  dataService = inject(DataService);

  constructor() {
    this.init();
  }

  init() {
    this.dataService.getNotes().subscribe((notes: any) => {
      this.notes = [...notes];
      this.noteSubject.next(this.notes);
    });
  }

  getNotes() {
    return this.noteSubject;
  }

  addNote(note: Note) {
    this.dataService.addNote(note).subscribe((res: any) => {
      if (res.status == 200) {
        this.init();
      }
    });
  }

  deleteNote(id: string) {
    this.dataService.deleteNote(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.notes = this.notes.filter((note) => note.id !== id);
        this.noteSubject.next(this.notes);
      }
    });
  }

  updateNote(note: Note) {
    this.dataService.updateNote(note).subscribe((res: any) => {
      if (res.status == 200) {
        this.notes = this.notes.map((n) => {
          if (n.id === note.id) {
            return note;
          }
          return n;
        });
        this.noteSubject.next(this.notes);
      }
    });
  }
}
