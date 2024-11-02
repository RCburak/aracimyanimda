// openTab fonksiyonu
function openTab(evt, tabName) {
  // Tüm tab içeriklerini gizle
  const tabContent = document.querySelectorAll('.tabcontent');
  tabContent.forEach(content => content.style.display = 'none');

  // Tüm tab linklerinden active class'ını kaldır
  const tabLinks = document.querySelectorAll('.tablinks');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Seçili olan tab içeriğini göster ve butona active class'ı ekle
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');
}

// Giriş Formunu işleme
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch("http://localhost:3000/login.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    // Eğer giriş başarılıysa, token ve mesaj alınır
    if (response.ok) {
        alert(data.message);
        window.location.href = 'index.html';  // Kullanıcıyı yönlendirin
    } else {
        // Giriş başarısızsa hata mesajı göster
        alert(data.message);
    }
});

// Kayıt Formunu işleme
document.getElementById("signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert("Şifreler uyuşmuyor!");
        return;
    }

    const response = await fetch("http://localhost:3000/login.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();

    // Kayıt başarılıysa otomatik giriş yap
    if (response.ok) {
        alert(data.message);
        // Giriş için aynı token ile oturum aç
        const loginResponse = await fetch("http://localhost:3000/login.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
            alert(loginData.message);
            window.location.href = 'index.html'; // Kullanıcıyı yönlendirin
        } else {
            alert(loginData.message);
        }
    } else {
        alert(data.message);
    }
});
