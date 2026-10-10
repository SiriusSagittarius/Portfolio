import { RenderMode, ServerRoute } from '@angular/ssr';

// Alle Seiten werden beim Build als statisches HTML vorgerendert (kein Node-Server noetig)
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
