
// the first entry will be used as home / default
export default [
    ['/home', () => import('./routes/home'), "Home", "fas fa-home fa-fw"],
    ['/chat', () => import('./routes/chat'), "Chat", "fas fa-tasks fa-fw"],
];