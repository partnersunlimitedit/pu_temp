import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient.js';

/**
 * Contact Form Controller with Supabase Persistence and XSS Protection
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const statusMsg = document.getElementById('statusMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (!contactForm) return;

  const showStatus = (type, message) => {
    statusMsg.className = `form-status ${type}`;
    statusMsg.textContent = message;
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('inputName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const enquiry = document.getElementById('inputEnquiry').value.trim();

    if (!name || !email || !enquiry) {
      showStatus('error', 'Please fill in all required fields.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        showStatus(
          'success',
          'Thank you. Your enquiry has been received (Local Demo Mode: Please configure Supabase keys in js/supabaseClient.js).'
        );
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Inquiry';
      }, 600);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase client initialization failed.');
      }

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{ name, email, enquiry }]);

      if (error) {
        throw error;
      }

      showStatus('success', 'Thank you! Your inquiry has been successfully sent.');
      contactForm.reset();
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      showStatus('error', 'Unable to submit your request at this time. Please try again or contact us directly via telephone.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
    }
  });
});
