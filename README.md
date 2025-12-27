# LearnAngular

# 🧭 Angular Complete Learning & Reference Outline

---

## Phase 1 — Fundamentals ([full notes](documentation/FUNDAMENTALS.md))

1. Introduction  
   - What is Angular?  
   - Why Angular?  
   - Angular vs React vs Vue  
   - SPA vs MPA  
   - Angular architecture overview  
2. Angular Basics  
   - Angular CLI  
   - Project structure  
   - main.ts  
   - Bootstrap process  
   - Standalone vs NgModules  
3. Components  
   - What is a component?  
   - Component metadata  
   - Templates  
   - Styles  
   - Component lifecycle  
   - constructor vs ngOnInit  
   - Change detection basics  
4. Templates & Data Binding  
   - Interpolation  
   - Property binding  
   - Event binding  
   - Two-way binding  
   - Template expressions  
   - Safe navigation operator  
5. Directives  
   - Attribute directives  
   - Structural directives  
   - `*ngIf`, `*ngFor`, `*ngSwitch`  
   - Custom attribute directives  
   - Custom structural directives  
6. Pipes  
   - Built-in pipes  
   - Custom pipes  
   - Pure vs impure pipes  

---

## Phase 2 — Core Angular Concepts

7. Dependency Injection (DI)  
   - What is DI?  
   - Injectable services  
   - Provider scopes  
   - `providedIn: root / platform / any`  
   - DI hierarchy  
   - DI under the hood  
8. Routing & Navigation  
   - Angular Router  
   - RouterOutlet  
   - RouterLink  
   - Route parameters  
   - Query parameters  
   - Route guards  
   - Lazy loading  
   - Preloading strategies  
9. Forms  
   - Template-driven forms  
   - Reactive forms  
   - FormControl  
   - FormGroup  
   - FormArray  
   - Validators  
   - Custom validators  
   - Async validators  
   - Conditional forms  
   - Dynamic forms  
   - Form best practices  

---

## Phase 3 — Asynchronous & Reactivity

10. RxJS  
    - What is RxJS?  
    - Observables vs Promises  
    - Subscriptions  
    - Operators (`map`, `filter`, `switchMap`, `mergeMap`, `concatMap`, `forkJoin`, `combineLatest`)  
    - Error handling  
    - Unsubscribing  
    - Memory leaks  
11. Signals (Angular 16+)  
    - What are signals?  
    - signal(), computed(), effect()  
    - Signals vs Observables  
    - Zoneless change detection  
    - When to use signals  
12. State Management  
    - Service + RxJS  
    - Signal Store  
    - NgRx  
    - Actions  
    - Reducers  
    - Effects  
    - Selectors  
    - When to use which  

---

## Phase 4 — Advanced Angular

13. Change Detection  
    - How change detection works  
    - Default strategy  
    - OnPush strategy  
    - Zones & Zone.js  
    - Zoneless Angular  
    - Performance implications  
14. Performance Optimization  
    - Lazy loading  
    - trackBy  
    - OnPush  
    - Signals  
    - Pure pipes  
    - Bundle optimization  
15. Dynamic UI  
    - Dynamic components  
    - ViewContainerRef  
    - ContentChild vs ViewChild  
    - Angular Elements  
    - Deferrable views (@defer)  

---

## Phase 5 — Architecture & Enterprise

16. Authentication & Security  
    - JWT authentication  
    - Access tokens  
    - Refresh tokens  
    - HTTP interceptors  
    - Route guards  
    - Role-based access  
    - Secure storage  
17. Server-Side Rendering (SSR)  
    - Angular Universal  
    - SSR vs CSR  
    - Hydration  
    - SEO handling  
    - Browser vs server code  
18. Testing  
    - Unit testing  
    - Component tests  
    - Service tests  
    - Directive tests  
    - Pipe tests  
    - Guard tests  
    - Interceptor tests  
    - TestBed  
    - Mocking  
    - Best practices  
19. CI/CD & Environments  
    - Environment configuration  
    - Dev / Stage / Prod builds  
    - CI pipelines  
    - Deployment strategies  
    - Runtime configuration  
20. Micro-Frontends  
    - Monolithic vs micro-frontends  
    - Module Federation  
    - Nx monorepos  
    - Shared libraries  
    - Cross-app communication  

---

## Phase 6 — TypeScript & JavaScript

21. TypeScript  
    - Types  
    - Interfaces  
    - Enums  
    - Generics  
    - Strict mode  
    - TS with Angular  
22. ES6+ JavaScript  
    - let / const  
    - Arrow functions  
    - Destructuring  
    - Spread operator  
    - Optional chaining  
    - Async / await  

---

## Phase 7 — Real-World & Interviews

23. Real Project Scenarios  
    - Migrating Angular versions  
    - NgModules → Standalone  
    - Performance tuning  
    - Large form handling  
    - State management decisions  
24. Interview Preparation  
    - Common Angular questions  
    - Senior-level questions  
    - Architecture questions  
    - Live coding patterns  
    - Debugging scenarios  

---