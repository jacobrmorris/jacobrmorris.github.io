// Turn email placeholders into working mailto: links. The address is split
// across two data attributes so it never appears whole in the HTML.
for (const link of document.querySelectorAll('a[data-email-user]')) {
  const address = `${link.dataset.emailUser}@${link.dataset.emailDomain}`;
  link.href = `mailto:${address}`;
  if (link.hasAttribute('data-email-show')) link.textContent = address;
  else link.title = address; // links labelled e.g. "Email" show the address on hover
}

// "Abstract" toggles. Each button starts hidden, so without JavaScript every
// abstract is simply shown. Collapsed abstracts use hidden="until-found", which
// lets the browser's find-in-page search them and open them on a match.
for (const button of document.querySelectorAll('.abstract-toggle')) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) continue;
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = open ? false : 'until-found';
  };
  setOpen(false);
  button.hidden = false;
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('beforematch', () => setOpen(true));
}
