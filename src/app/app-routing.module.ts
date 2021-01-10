import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleListComponent} from './article-list/article-list.component';
import {NewArticleComponent} from './new-article/new-article.component';

const routes: Routes = [
  {path: '', component: ArticleListComponent, pathMatch: 'full'},
  {path: 'ArticleList', component: ArticleListComponent},
  {path: 'NewArticle', component: NewArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
