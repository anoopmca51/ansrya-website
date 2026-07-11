const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

navMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('open'))
);

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const subject = encodeURIComponent(`New project enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Email: ${data.get('email')}
Company: ${data.get('company') || '-'}
Service: ${data.get('service')}

Project Details:
${data.get('message')}`
  );
  window.location.href = `mailto:info@ansrya.com?subject=${subject}&body=${body}`;
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));
