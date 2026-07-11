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

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');
const MAILER_ENDPOINT = 'https://formsubmit.co/ajax/anoopmca15@gmail.com';

function setFormStatus(message, type = '') {
  formNote.textContent = message;
  formNote.className = type ? `form-note form-note--${type}` : 'form-note';
}

contactForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  if (contactForm.querySelector('[name="_honey"]').value) return;

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || '-',
    service: formData.get('service'),
    message: formData.get('message'),
    _subject: `New project enquiry from ${formData.get('name')}`,
    _replyto: formData.get('email'),
    _template: 'table',
    _captcha: 'false'
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  setFormStatus('Sending your enquiry, please wait...', 'loading');

  try {
    const response = await fetch(MAILER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || 'Unable to send enquiry');
    }

    contactForm.reset();
    setFormStatus('Thank you! Your enquiry has been sent successfully. We will get back to you soon.', 'success');
  } catch (error) {
    setFormStatus(
      'Unable to send right now. Please email us directly at anoopmca15@gmail.com or call +91 97119 86743.',
      'error'
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Enquiry';
  }
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
