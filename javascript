// === Form handlers (Diperbarui untuk Node.js API) ===

// Fungsi Register ke Backend
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const username = data.get('username');
  const email = data.get('email');
  const pw = data.get('password');
  const cpw = data.get('confirmPassword');
  
  if (pw !== cpw) {
    showToast('⚠ Kata sandi tidak cocok. Coba lagi.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password: pw })
    });
    
    const result = await response.json();
    
    if (result.success) {
      closeModal('registerModal');
      setTimeout(() => {
        showToast(`🎉 Selamat ${username}! Akun dibuat. Bonus Rp50.000 masuk.`);
      }, 400);
      e.target.reset();
    } else {
      showToast(`⚠ ${result.message}`);
    }
  } catch (error) {
    showToast('⚠ Gagal terhubung ke server. Pastikan Node.js menyala.');
  }
});

// Fungsi Login ke Backend
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="text"]').value;
  const password = document.getElementById('loginPw').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    
    if (result.success) {
      closeModal('loginModal');
      setTimeout(() => {
        showToast(`✓ Berhasil masuk. Halo ${result.user.username}!`);
      }, 400);
      e.target.reset();
    } else {
      showToast(`⚠ ${result.message}`);
    }
  } catch (error) {
    showToast('⚠ Gagal terhubung ke server. Pastikan Node.js menyala.');
  }
});
