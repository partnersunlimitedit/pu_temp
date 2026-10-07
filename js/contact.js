import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient.js';

/**
 * Contact Form Controller
 * Validates user input, inserts records into Supabase, and clears form fields on success.
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

    const nameInput = document.getElementById('inputName');
    const emailInput = document.getElementById('inputEmail');
    const enquiryInput = document.getElementById('inputEnquiry');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const enquiry = enquiryInput.value.trim();

    if (!name || !email || !enquiry) {
      showStatus('error', 'Please fill in all required fields.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    if (!isSupabaseConfigured()) {
      showStatus('error', 'System configuration error. Please contact us via email.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
      return;
    }

    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase client failed to initialize.');
      }

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{ name, email, enquiry }]);

      if (error) {
        throw error;
      }

      showStatus('success', 'Thank you! Your inquiry has been sent successfully. We will be in touch shortly.');
      contactForm.reset();
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      showStatus('error', 'Unable to submit your inquiry at this moment. Please email info@partnersunlimited.net directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
    }
  });
});
