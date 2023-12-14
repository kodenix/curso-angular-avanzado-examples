import { RoutingExampleContainerComponent } from './routing-example-container/routing-example-container.component';
import { ResolveFn, Routes } from '@angular/router';

const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child aaa');

export const routingRoutes: Routes = [
      {
        path: 'child-route1', // child route path
        loadComponent: ()=>import('./routing-example-container/child-route1/child-route1.component').then(x => x.ChildRoute1Component),
        title: resolvedChildATitle,
      },
      {
        path: 'child-route2',
        loadComponent: ()=>import('./routing-example-container/child-route2/child-route2.component').then(x => x.ChildRoute2Component),
        title: 'second',
      },
]
