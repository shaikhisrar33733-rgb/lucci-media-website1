/**
 * LUCCI MEDIA — PREMIUM CREATIVE AGENCY HOMEPAGE JAVASCRIPT
 * High-End Animations, Interactions, Carousel, FAQ & Lightbox
 * Inspired by The Social Agency & International Creative Studios
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. LUXURY PRELOADER
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderCount = document.getElementById('preloaderCount');
  
  let progress = 0;
  const startTime = Date.now();
  const minLoadTime = 1200; // minimum 1.2s for luxurious brand impression

  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;
    
    if (preloaderBar) preloaderBar.style.width = `${progress}%`;
    if (preloaderCount) preloaderCount.textContent = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('loaded');
          document.body.classList.add('page-ready');
          initHeroAnimations();
        }
      }, remaining);
    }
  }, 40);

  /* --------------------------------------------------------------------------
     2. CUSTOM CURSOR (DESKTOP ONLY)
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursorDot && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth lerp follower
    const renderCursor = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Interactive Hover States
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .service-item-header, .service-inquire-btn, .service-card, .portfolio-item, .faq-question-btn, .filter-tab');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('is-hovering');
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });
  }

  /* --------------------------------------------------------------------------
     3. STICKY NAVBAR & ACTIVE SECTION OBSERVER
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Highlight active section link
  const navObserverOptions = {
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  /* --------------------------------------------------------------------------
     4. MOBILE MENU DRAWER
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      mobileMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('is-open');
      navToggle.classList.add('is-active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. HERO TYPEWRITER / STATEMENT ROTATION (INSPIRED BY THE SOCIAL AGENCY)
     -------------------------------------------------------------------------- */
  const heroStatement = document.getElementById('heroStatement');
  if (heroStatement) {
    const statements = [
      "WHERE STRATEGY MEETS SCALE",
      "DATA-DRIVEN CONTENT ENGINEERED TO CONVERT",
      "TRANSFORMING PASSIVE AUDIENCES INTO HIGH-VALUE CLIENTS",
      "TRUSTED BY 250+ ELEVATED BUSINESSES",
      "BOSTON'S #1 BEAUTY MARKETING AGENCY"
    ];

    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    const typeLoop = () => {
      const currentText = statements[currentIdx];

      if (isDeleting) {
        heroStatement.textContent = currentText.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        heroStatement.textContent = currentText.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 65;
      }

      if (!isDeleting && charIdx === currentText.length) {
        typingSpeed = 2200; // pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % statements.length;
        typingSpeed = 400; // brief pause before next word
      }

      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 800);
  }

  /* --------------------------------------------------------------------------
     5.5. SERVICES: TYPOGRAPHY, HOVER IMAGE REVEAL & CLICK-TO-OPEN ACCORDION
     (Inspired by The Social Agency Design Pattern)
     -------------------------------------------------------------------------- */
  const servicesList = document.getElementById('servicesList');
  const serviceItems = document.querySelectorAll('.service-editorial-item');
  const serviceFloatingPreview = document.getElementById('serviceFloatingPreview');
  const serviceFloatingPreviewImg = document.getElementById('serviceFloatingPreviewImg');
  const serviceFloatingPreviewMeta = document.getElementById('serviceFloatingPreviewMeta');

  if (servicesList && serviceItems.length > 0) {
    let mouseX = -500;
    let mouseY = -500;
    let previewX = -500;
    let previewY = -500;
    let isHoveringServices = false;

    // Floating Image Mouse Tracker (Desktop only)
    if (serviceFloatingPreview && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });

      const renderPreviewPos = () => {
        if (isHoveringServices) {
          // Smooth spring-like lerping with natural offset
          previewX += (mouseX + 40 - previewX) * 0.15;
          previewY += (mouseY - 80 - previewY) * 0.15;
          
          // Keep preview within viewport boundaries
          const clampedX = Math.min(window.innerWidth - 160, Math.max(160, previewX));
          const clampedY = Math.min(window.innerHeight - 200, Math.max(200, previewY));
          
          serviceFloatingPreview.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
        }
        requestAnimationFrame(renderPreviewPos);
      };
      requestAnimationFrame(renderPreviewPos);
    }

    // Hover Image Reveal on Service Items
    serviceItems.forEach((item) => {
      const header = item.querySelector('.service-item-header');
      const panel = item.querySelector('.service-details-panel');
      const serviceName = item.getAttribute('data-service') || 'Lucci Media Service';
      const serviceImgSrc = item.getAttribute('data-image') || '';

      // Hover Reveal
      item.addEventListener('mouseenter', () => {
        if (serviceFloatingPreview && serviceFloatingPreviewImg && !item.classList.contains('is-open')) {
          serviceFloatingPreviewImg.src = serviceImgSrc;
          serviceFloatingPreviewImg.alt = serviceName;
          if (serviceFloatingPreviewMeta) {
            serviceFloatingPreviewMeta.textContent = serviceName;
          }
          serviceFloatingPreview.classList.add('is-visible');
          isHoveringServices = true;
        }
      });

      item.addEventListener('mouseleave', () => {
        if (serviceFloatingPreview) {
          serviceFloatingPreview.classList.remove('is-visible');
          isHoveringServices = false;
        }
      });

      // Hide floating preview when mouse enters the expanded panel to allow smooth reading
      panel?.addEventListener('mouseenter', () => {
        if (serviceFloatingPreview) {
          serviceFloatingPreview.classList.remove('is-visible');
          isHoveringServices = false;
        }
      });

      // Click to Open / Toggle Service Details (Accordion)
      const toggleServiceDetails = () => {
        const isOpen = item.classList.contains('is-open');

        // Close floating hover preview immediately on click
        if (serviceFloatingPreview) {
          serviceFloatingPreview.classList.remove('is-visible');
          isHoveringServices = false;
        }

        // Close other open service items for clean accordion UX
        serviceItems.forEach((other) => {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            const otherHeader = other.querySelector('.service-item-header');
            const otherPanel = other.querySelector('.service-details-panel');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            if (otherPanel) {
              otherPanel.style.maxHeight = null;
              otherPanel.setAttribute('aria-hidden', 'true');
            }
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          if (header) header.setAttribute('aria-expanded', 'false');
          if (panel) {
            panel.style.maxHeight = null;
            panel.setAttribute('aria-hidden', 'true');
          }
        } else {
          item.classList.add('is-open');
          if (header) header.setAttribute('aria-expanded', 'true');
          if (panel) {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
            panel.setAttribute('aria-hidden', 'false');
          }
        }
      };

      header?.addEventListener('click', toggleServiceDetails);

      // Keyboard accessibility (Enter / Space)
      header?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleServiceDetails();
        }
      });
    });

    // Handle "Inquire This Service" CTA Buttons inside details
    document.querySelectorAll('.service-inquire-btn').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const chosenService = this.getAttribute('data-service-name');
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && chosenService) {
          // Pre-select service in contact form
          for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value === chosenService || serviceSelect.options[i].text.includes(chosenService)) {
              serviceSelect.selectedIndex = i;
              break;
            }
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. PORTFOLIO FILTERING & INTERACTIVE LIGHTBOX
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.portfolio-filter-tabs .filter-tab');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  // Filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      
      const filter = tab.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory.includes(filter)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          }, 10);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Open
  portfolioItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const img = item.querySelector('img');
      const title = item.querySelector('.portfolio-title')?.textContent || 'Lucci Media Showcase';
      const category = item.querySelector('.portfolio-cat')?.textContent || '';
      
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        if (lightboxCaption) {
          lightboxCaption.textContent = `${category ? category + ' — ' : ''}${title}`;
        }
        lightboxModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Lightbox Close
  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('is-active')) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     7. CLIENT TESTIMONIALS CAROUSEL
     -------------------------------------------------------------------------- */
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const testDotsContainer = document.getElementById('testimonialsDots');
  
  if (testimonialsTrack) {
    const testimonialCards = testimonialsTrack.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardWidth = 0;
    let gap = 32; // 2rem
    let visibleCards = 3;

    const updateVisibleCardsCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        visibleCards = 1;
      } else if (width < 992) {
        visibleCards = 2;
      } else {
        visibleCards = 3;
      }
    };

    const maxIndex = () => Math.max(0, testimonialCards.length - visibleCards);

    // Build dots
    const buildDots = () => {
      if (!testDotsContainer) return;
      testDotsContainer.innerHTML = '';
      const totalDots = maxIndex() + 1;
      
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('test-dot');
        if (i === currentIndex) dot.classList.add('is-active');
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        testDotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      if (!testDotsContainer) return;
      const dots = testDotsContainer.querySelectorAll('.test-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      updateVisibleCardsCount();
      currentIndex = Math.max(0, Math.min(index, maxIndex()));
      
      const card = testimonialCards[0];
      if (card) {
        cardWidth = card.offsetWidth;
        const offset = currentIndex * (cardWidth + gap);
        testimonialsTrack.style.transform = `translateX(-${offset}px)`;
      }
      updateDots();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex >= maxIndex()) {
          goToSlide(0);
        } else {
          goToSlide(currentIndex + 1);
        }
      });
    }

    // Touch / Swipe Support
    let startX = 0;
    let isDragging = false;

    testimonialsTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (diff > 50) {
        goToSlide(currentIndex + 1);
      } else if (diff < -50) {
        goToSlide(currentIndex - 1);
      }
    }, { passive: true });

    // Autoplay
    let autoplayTimer = setInterval(() => {
      if (currentIndex >= maxIndex()) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }, 6000);

    const pauseAutoplay = () => clearInterval(autoplayTimer);
    const resumeAutoplay = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        if (currentIndex >= maxIndex()) {
          goToSlide(0);
        } else {
          goToSlide(currentIndex + 1);
        }
      }, 6000);
    };

    testimonialsTrack.addEventListener('mouseenter', pauseAutoplay);
    testimonialsTrack.addEventListener('mouseleave', resumeAutoplay);

    window.addEventListener('resize', () => {
      updateVisibleCardsCount();
      buildDots();
      goToSlide(currentIndex);
    });

    updateVisibleCardsCount();
    buildDots();
  }

  /* --------------------------------------------------------------------------
     8. FAQ ACCORDION & CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const faqTabs = document.querySelectorAll('.faq-tab-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  // FAQ Category Filter
  faqTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      faqTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filterCategory = tab.getAttribute('data-faq-tab');

      faqItems.forEach((item) => {
        const itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Accordion Expand/Collapse
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPanel = item.querySelector('.faq-answer-panel');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const panel = other.querySelector('.faq-answer-panel');
          if (panel) panel.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        if (answerPanel) answerPanel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        if (answerPanel) answerPanel.style.maxHeight = `${answerPanel.scrollHeight}px`;
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstFaq = faqItems[0];
    const firstPanel = firstFaq.querySelector('.faq-answer-panel');
    firstFaq.classList.add('is-open');
    if (firstPanel) firstPanel.style.maxHeight = `${firstPanel.scrollHeight}px`;
  }

  /* --------------------------------------------------------------------------
     9. CONTACT INQUIRY FORM (INTERACTIVE FEEDBACK)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Inquiry...</span>`;

      // Simulate sending
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Inquiry Sent!</span>`;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `<strong>Thank you!</strong> Your inquiry has been received. Lex Luciano & the Lucci Media team will review your brand details and reach out within 24 hours.`;
          formStatus.style.display = 'block';
        }

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 4000);
      }, 1200);
    });
  }

  /* --------------------------------------------------------------------------
     10. SMOOTH SCROLLING FOR ALL ANCHOR LINKS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     11. GSAP & SCROLLTRIGGER ENHANCED REVEALS (IF AVAILABLE)
     -------------------------------------------------------------------------- */
  function initHeroAnimations() {
    if (typeof gsap !== 'undefined') {
      // Register ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Hero Elements Staggered Entrance
      gsap.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1
      });

      gsap.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.25
      });

      gsap.from('.hero-desc', {
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.45
      });

      gsap.from('.hero-cta-group', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
      });

      gsap.from('.hero-stats-bar .hero-stat-item', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.75
      });

      gsap.from('.hero-visual-wrap', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Scroll-triggered animations for sections
      if (typeof ScrollTrigger !== 'undefined') {
        // Section headings reveal
        gsap.utils.toArray('.section-tag, .heading-lg, .heading-md').forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.85,
            ease: 'power3.out'
          });
        });

        // Service items staggered reveal
        gsap.utils.toArray('.services-editorial-list').forEach((list) => {
          gsap.from(list.children, {
            scrollTrigger: {
              trigger: list,
              start: 'top 82%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out'
          });
        });

        // Portfolio items stagger
        gsap.utils.toArray('.portfolio-grid').forEach((grid) => {
          gsap.from(grid.children, {
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 35,
            stagger: 0.1,
            duration: 0.85,
            ease: 'power3.out'
          });
        });

        // Founder Image parallax/scale
        gsap.from('.founder-image-wrapper', {
          scrollTrigger: {
            trigger: '.founder-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: -40,
          duration: 1,
          ease: 'power3.out'
        });

        gsap.from('.founder-content', {
          scrollTrigger: {
            trigger: '.founder-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: 40,
          duration: 1,
          ease: 'power3.out'
        });
      }
    } else {
      // Fallback: IntersectionObserver for smooth scroll reveals
      const revealElements = document.querySelectorAll('.service-item-header, .service-inquire-btn, .service-card, .portfolio-item, .pillar-item, .contact-channel-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
      });
    }
  }

  // Back to top smooth button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

