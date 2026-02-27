import './style.css';
import { renderRoute } from './router';

// App entrypoint: render once and re-render on hash changes or internal refresh events.
renderRoute();
window.addEventListener('hashchange', renderRoute);
window.addEventListener('app:route-refresh', renderRoute as EventListener);
