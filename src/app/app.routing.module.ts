import { DescriptionComponent } from './description/description.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: 'description/:id', component: DescriptionComponent },
  { path: '', component: SearchComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
