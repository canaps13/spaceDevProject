import {RouteReuseStrategy,DetachedRouteHandle,ActivatedRouteSnapshot} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    handlers: {[key: string]: DetachedRouteHandle} = {};
  
    constructor() {
      console.log('constructed');
    }
  
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
      if (!route.data['shouldReuse']) {
        return false;
      }
      console.log('Attach cached page for: ', route.data['key']);
      return this.handlers[route.data['key']];
    }
  
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      if (route.data['shouldReuse']) {
        this.handlers[route.data['key']] = handle;
      }
    }
  
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return !!route.data['shouldReuse'];
    }
  
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      return !!route.data['shouldReuse'] && !!this.handlers[route.data['key']];
    }
  
    shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
      return !!future.data['shouldReuse'];
    }
  }