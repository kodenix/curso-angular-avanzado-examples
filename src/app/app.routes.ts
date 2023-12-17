import { ResolveFn, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SimpleTemplateForm1Component } from './forms/simple-template-form1/simple-template-form1.component';
import { SimpleTemplateForm2Component } from './forms/simple-template-form2/simple-template-form2.component';
import { SimpleTemplateForm3Component } from './forms/simple-template-form3/simple-template-form3.component';
import { SimpleTemplateForm4Component } from './forms/simple-template-form4/simple-template-form4.component';
import { SimpleReactiveForm1Component } from './forms/simple-reactive-form1/simple-reactive-form1.component';
import { SimpleReactiveForm2Component } from './forms/simple-reactive-form2/simple-reactive-form2.component';
import { ReactiveForm3Component } from './forms/reactive-form3/reactive-form3.component';
import { ReactiveForm4Component } from './forms/reactive-form4/reactive-form4.component';
import { ReactiveForm5Component } from './forms/reactive-form5/reactive-form5.component';
import { ReactiveForm6Component } from './forms/reactive-form6/reactive-form6.component';
import { ReactiveForm7Component } from './forms/reactive-form7/reactive-form7.component';
import { ConditionalStructControlComponent } from './template-syntax/block-controls/conditional-struct-control/conditional-struct-control.component';
import { RepeatersStructControlComponent } from './template-syntax/block-controls/repeaters-struct-control/repeaters-struct-control.component';
import { SwitchStructControlComponent } from './template-syntax/block-controls/switch-struct-control/switch-struct-control.component';
import { Defer1Component } from './template-syntax/defer/defer-1/defer-1.component';
import { ChangeDetContainerComponent } from './change-detection/change-det-container/change-det-container.component';
import { ExampleSignalComponent } from './change-detection/example-signal/example-signal.component';
import { RoutingExampleContainerComponent } from './routing/routing-example-container/routing-example-container.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ChildRoute1Component } from './routing/routing-example-container/child-route1/child-route1.component';
import { ChildRoute2Component } from './routing/routing-example-container/child-route2/child-route2.component';
import { existTokenGuard } from './guards/exist-token.guard';

const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child aaa');

export const routes: Routes = [
  { path: 'temp-form-1', component: SimpleTemplateForm1Component },
  { path: 'temp-form-2', component: SimpleTemplateForm2Component },
  { path: 'temp-form-3', component: SimpleTemplateForm3Component },
  { path: 'temp-form-4', component: SimpleTemplateForm4Component },
  { path: 'react-form-1', component: SimpleReactiveForm1Component },
  { path: 'react-form-2', component: SimpleReactiveForm2Component },
  { path: 'react-form-3', component: ReactiveForm3Component },
  { path: 'react-form-4', component: ReactiveForm4Component },
  { path: 'react-form-5', component: ReactiveForm5Component },
  { path: 'react-form-6', component: ReactiveForm6Component },
  { path: 'react-form-7', component: ReactiveForm7Component },
  { path: 'if-block-control', component: ConditionalStructControlComponent },
  { path: 'for-block-control', component: RepeatersStructControlComponent },
  { path: 'switch-block-control', component: SwitchStructControlComponent },
  { path: 'defer-1', component: Defer1Component },
  { path: 'change-detection', component: ChangeDetContainerComponent },
  { path: 'signal', component: ExampleSignalComponent, canActivate: [existTokenGuard] },
  {
    path: 'routing',
    loadComponent: ()=>import('./routing/routing-example-container/routing-example-container.component').then(x => x.RoutingExampleContainerComponent),
    title: 'Ejemplo routing',
    loadChildren: () => import('./routing/routing.routes').then(x => x.routingRoutes)
    // children: [
    //   {
    //     path: 'child-route1', // child route path
    //     component: ChildRoute1Component, // child route component that the router renders,
    //     title: resolvedChildATitle,
    //   },
    //   {
    //     path: 'child-route2',
    //     title: 'second',
    //     component: ChildRoute2Component, // another child route component that the router renders
    //   },
    // ],
  },
  // { path: 'routing/:id', component: RoutingExampleContainerComponent, title: 'Ejemplo routing 2', data: { customTitle: 'Ejemplo routing con parametro'},
  //   children: [
  //     {
  //       path: 'first-child', // child route path
  //       component: ChildRoute1Component, // child route component that the router renders
  //     },
  //   ],
  // },
  { path: 'main', component: InicioComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
