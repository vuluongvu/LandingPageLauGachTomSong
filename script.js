// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  if (window.scrollY > 60) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Back to top
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
});

// ===== BOOKING via MESSENGER (no backend!) =====
const MESSENGER_URL = "https://m.me/61586726563696";
let currentBookingText = "";

function handleBooking() {
  const btn = document.getElementById("btnBooking");
  const name = document.getElementById("bookingName").value.trim();
  const phone = document.getElementById("bookingPhone").value.trim();
  const guests = document.getElementById("bookingGuests").value;
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  const note = document.getElementById("bookingNote").value.trim();

  // Validate
  if (!name || !phone) {
    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Vui lòng điền Tên & SĐT';
    btn.style.background = "#D97706";
    setTimeout(() => {
      btn.innerHTML = '<i class="fab fa-facebook-messenger"></i> Đặt Bàn Qua Messenger';
      btn.style.background = "";
    }, 2500);
    return;
  }

  // Format date nicely
  let dateDisplay = "Chưa chọn";
  if (date) {
    const d = new Date(date);
    dateDisplay = d.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // Build the message text for Messenger
  currentBookingText =
    `🍲 ĐẶT BÀN - IL DIVO\n` +
    `━━━━━━━━━━━━━━━━\n` +
    `👤 Họ tên: ${name}\n` +
    `📱 SĐT: ${phone}\n` +
    `👥 Số người: ${guests}\n` +
    `📅 Ngày: ${dateDisplay}\n` +
    `🕐 Giờ: ${time}\n` +
    (note ? `📝 Ghi chú: ${note}\n` : "") +
    `━━━━━━━━━━━━━━━━\n` +
    `Xin xác nhận giúp em ạ. Cảm ơn! 🙏`;

  // Fill the modal details
  const detailsEl = document.getElementById("modalDetails");
  detailsEl.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">👤 Họ tên</span>
      <span class="detail-value">${name}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">📱 Điện thoại</span>
      <span class="detail-value">${phone}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">👥 Số người</span>
      <span class="detail-value">${guests}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">📅 Ngày</span>
      <span class="detail-value">${dateDisplay}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">🕐 Giờ</span>
      <span class="detail-value">${time}</span>
    </div>
    ${note ? `<div class="detail-row">
      <span class="detail-label">📝 Ghi chú</span>
      <span class="detail-value">${note}</span>
    </div>` : ""}
  `;

  // Set Messenger link
  document.getElementById("btnSendMessenger").href = MESSENGER_URL;

  // Clear copy status
  document.getElementById("copyStatus").textContent = "";

  // Show modal with inline styles to guarantee positioning
  const modal = document.getElementById("bookingModal");
  modal.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;";
  document.body.style.overflow = "hidden";
}

// Copy booking text to clipboard
document.getElementById("btnCopyBooking").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentBookingText);
    document.getElementById("copyStatus").textContent =
      "✅ Đã copy! Mở Messenger và dán tin nhắn là xong.";
  } catch (err) {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = currentBookingText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    document.getElementById("copyStatus").textContent =
      "✅ Đã copy! Mở Messenger và dán tin nhắn là xong.";
  }
});

// Send via Messenger: copy first, then open
document.getElementById("btnSendMessenger").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText(currentBookingText);
  } catch (err) {
    const ta = document.createElement("textarea");
    ta.value = currentBookingText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  document.getElementById("copyStatus").textContent =
    "✅ Đã copy nội dung! Dán (Ctrl+V) vào Messenger nhé.";
  // Link will open Messenger in new tab via href + target="_blank"
});

// Close modal
document.getElementById("modalClose").addEventListener("click", closeBookingModal);
document.getElementById("bookingModal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeBookingModal();
});

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  modal.style.cssText = "";
  document.body.style.overflow = "";
  // Reset form
  document.getElementById("bookingName").value = "";
  document.getElementById("bookingPhone").value = "";
  document.getElementById("bookingNote").value = "";
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  ".menu-card, .feature-card, .stat-item, .gallery-item, .contact-item, .hours-row"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 80);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

// Section reveal
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => {
  sectionObserver.observe(el);
});

// Smooth parallax on hero image
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-image-wrapper");
  if (hero) {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  }
});
