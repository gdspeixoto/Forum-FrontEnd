import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { ForumViewComponent } from './forum/forum-view/forum-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'forum', pathMatch: 'full'},
  { path: 'forum', component: ForumComponent },
  { path: 'forum/:id/respostas', component: ForumViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
