import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChabotDemoComponent} from "./chabot-demo/chabot-demo.component";
import {ChatWidgetComponent} from "./chat-widget/chat-widget.component";
import {ChabotFullpageComponent} from "./chabot-fullpage/chabot-fullpage.component";

const routes: Routes = [
  {path: 'chatbot/:clientId', component: ChabotFullpageComponent},
  {path: 'old', component: ChatWidgetComponent},
  {path: 'demo', component: ChabotDemoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
