export default [
    ['/', () => import('./routes/home'), "Home"],
    ['/about', () => import('./routes/about'), "About"],
    ['/blog', () => import('./routes/blog'), "Blog"],
    ['/blog/:id', () => import('./routes/article')],
    ['/imprint', () => import('./routes/imprint'), "Contact"],
];
