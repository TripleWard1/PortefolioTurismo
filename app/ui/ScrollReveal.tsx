'use client';

import { useEffect } from 'react';

/**
 * ScrollReveal
 * ------------
 * Observer global e único. Revela qualquer elemento com [data-reveal] quando
 * entra no viewport. Não é preciso importar nada nos componentes - basta
 * adicionar o atributo no JSX.
 *
 *   <section data-reveal>…</section>
 *   <h2 data-reveal="up" data-reveal-delay="120">…</h2>
 *   <div data-reveal="stagger">…filhos entram em cascata…</div>
 *
 * Variantes: up (default) | fade | blur | scale | stagger
 * Respeita prefers-reduced-motion (o CSS trata disso).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const reveal = (el: HTMLElement) => {
      // Cascata: aplica delay incremental aos filhos diretos
      if (el.dataset.reveal === 'stagger') {
        const step = Number(el.dataset.revealStep || 90);
        Array.from(el.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty(
            '--reveal-delay',
            `${i * step}ms`
          );
        });
      } else if (el.dataset.revealDelay) {
        el.style.setProperty('--reveal-delay', `${el.dataset.revealDelay}ms`);
      }
      el.classList.add('is-revealed');
    };

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );

    if (prefersReduced || !('IntersectionObserver' in window)) {
      // Sem animação: garante que tudo fica visível.
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    // Só agora ativamos o estado "escondido" no CSS (gate de segurança).
    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));

    // Reobserva conteúdo que entre depois (ex.: troca de idioma / overlay)
    const mo = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
        .forEach((el) => observer.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}