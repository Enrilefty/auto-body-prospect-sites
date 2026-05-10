document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-service-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const phone = data.get('phone') || '';
      const email = data.get('email') || '';
      const vehicle = data.get('vehicle') || '';
      const service = data.get('service') || '';
      const location = data.get('location') || '';
      const message = data.get('message') || '';
      const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nVehicle: ${vehicle}\nService needed: ${service}\nService location: ${location}\n\nMessage:\n${message}\n\nSent from the Onsite Auto website.`;
      const subject = `Service request from ${name || 'website visitor'}`;
      window.location.href = `mailto:Mike@onsiteauto303.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});
