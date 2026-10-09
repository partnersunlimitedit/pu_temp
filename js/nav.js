/**
 * Navigation and Command Palette (Cmd+K) Controller
 * Zero external dependencies, vanilla ES logic under 300 lines.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer controls
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Command Palette (Cmd+K) controls
  const cmdBackdrop = document.getElementById('cmdPaletteBackdrop');
  const cmdTrigger = document.getElementById('cmdPaletteTrigger');
  const cmdInput = document.getElementById('cmdPaletteInput');
  const cmdItems = document.querySelectorAll('.cmd-result-item');

  function openPalette() {
    if (!cmdBackdrop) return;
    cmdBackdrop.classList.add('open');
    if (cmdInput) {
      cmdInput.value = '';
      filterItems('');
      setTimeout(() => cmdInput.focus(), 50);
    }
  }

  function closePalette() {
    if (!cmdBackdrop) return;
    cmdBackdrop.classList.remove('open');
  }

  function filterItems(term) {
    const q = term.toLowerCase().trim();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'block' : 'none';
    });
  }

  if (cmdTrigger) {
    cmdTrigger.addEventListener('click', openPalette);
  }

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdBackdrop) closePalette();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && cmdBackdrop && cmdBackdrop.classList.contains('open')) {
      closePalette();
    }
  });
});
