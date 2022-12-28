import React from 'react';

export default function FullHeightLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-justify-content-center ">{children}</div>
    </section>
  );
}
