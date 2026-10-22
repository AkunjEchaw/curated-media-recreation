/**
 * CURATED.MEDIA - Interactive Spatial Engine & Application Logic
 * Recreating Peachworlds 3D WebGL Canvas, Supply-Side Engine Ticker, PMP Deal Generator & AI Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // =========================================================================
  // 1. THREE.JS 3D SUPPLY-SIDE ENGINE CANVAS (PEACHWORLDS STYLE)
  // =========================================================================
  const canvas = document.getElementById('curated-3d-canvas');
  const stageContainer = document.getElementById('curated-3d-stage');

  if (canvas && window.THREE) {
    initCurated3DScene();
  }

  function initCurated3DScene() {
    const width = stageContainer.clientWidth || window.innerWidth;
    const height = stageContainer.clientHeight || 580;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Holographic Supply Cube (Beveled Chamfer)
    const boxGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    const boxMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.85,
      roughness: 0.15,
      transmission: 0.6,
      ior: 1.4,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const mainCube = new THREE.Mesh(boxGeometry, boxMaterial);
    masterGroup.add(mainCube);

    // Inner Glowing Core Cube
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerCore);

    // Wireframe Outer Cage
    const wireGeo = new THREE.BoxGeometry(2.1, 2.1, 2.1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireCube = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireCube);

    // 2. Orbiting Programmatic Rings
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.025, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.9, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    masterGroup.add(ring2);

    // 3. Floating Deal Token Nodes
    const nodeCount = 14;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x10b981,
      emissiveIntensity: 0.6
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 0.8;
      node.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.8,
        Math.sin(angle) * radius
      );
      nodes.push({ mesh: node, speed: 0.005 + Math.random() * 0.008, radius: radius, angle: angle });
      masterGroup.add(node);
    }

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Emerald Cursor-Tracking Light
    const cursorLight = new THREE.PointLight(0x10b981, 3.5, 12);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // Mouse & Inertia Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      cursorLight.position.x = mouseX * 4;
      cursorLight.position.y = mouseY * 3;

      if (!isDragging) {
        targetRotY = mouseX * 0.6;
        targetRotX = -mouseY * 0.5;
      }
    });

    canvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      masterGroup.rotation.y += deltaX * 0.008;
      masterGroup.rotation.x += deltaY * 0.008;

      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
    });

    // Viewport Mode Switcher Buttons
    const modeBtns = document.querySelectorAll('.engine-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        modeBtns.forEach(b => {
          b.classList.remove('bg-[#10b981]', 'text-black', 'border-[#10b981]');
          b.classList.add('bg-white/5', 'text-zinc-400', 'border-white/10');
        });
        btn.classList.add('bg-[#10b981]', 'text-black', 'border-[#10b981]');
        btn.classList.remove('bg-white/5', 'text-zinc-400', 'border-white/10');

        if (mode === 'core') {
          mainCube.material.wireframe = false;
          mainCube.scale.set(1, 1, 1);
          innerCore.visible = true;
        } else if (mode === 'network') {
          mainCube.material.wireframe = true;
          mainCube.scale.set(1.2, 1.2, 1.2);
          innerCore.visible = false;
        } else if (mode === 'pmp') {
          mainCube.material.wireframe = false;
          mainCube.scale.set(1, 1, 1);
          innerCore.visible = true;
        }
        showToast('Engine Mode Updated', `Active simulation set to ${btn.textContent.trim()}.`);
      });
    });

    // Render Loop
    const clock = new THREE.Clock();

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      if (!isDragging) {
        masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05;
        masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;
      }

      mainCube.rotation.y = time * 0.25;
      mainCube.rotation.x = Math.sin(time * 0.4) * 0.2;

      innerCore.rotation.y = -time * 0.4;
      innerCore.rotation.z = time * 0.3;

      wireCube.rotation.y = -time * 0.15;
      wireCube.rotation.x = time * 0.1;

      ring1.rotation.z = time * 0.2;
      ring2.rotation.z = -time * 0.25;

      // Orbit Floating Nodes
      nodes.forEach(n => {
        n.angle += n.speed;
        n.mesh.position.x = Math.cos(n.angle) * n.radius;
        n.mesh.position.z = Math.sin(n.angle) * n.radius;
        n.mesh.position.y += Math.sin(time * 2 + n.angle) * 0.003;
      });

      renderer.render(scene, camera);
    }
    renderLoop();

    window.addEventListener('resize', () => {
      const w = stageContainer.clientWidth || window.innerWidth;
      const h = stageContainer.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  // =========================================================================
  // 2. DYNAMIC ENGINE STATUS TICKER
  // =========================================================================
  const tickerEl = document.getElementById('curated-engine-ticker');
  const tickerPhrases = [
    'Initializing Curated Media Engine…',
    'Optimizing Supply Pathways…',
    'Configuring Real-Time Optimizations...',
    'Activating Smart Buying Signals…',
    'Calibrating PMP SSP Multi-Exchange Floor Prices…',
    'Synthesizing Demand Facilitation Vectors…'
  ];
  let tickerIdx = 0;

  if (tickerEl) {
    setInterval(() => {
      tickerIdx = (tickerIdx + 1) % tickerPhrases.length;
      tickerEl.style.opacity = '0';
      setTimeout(() => {
        tickerEl.textContent = tickerPhrases[tickerIdx];
        tickerEl.style.opacity = '1';
      }, 300);
    }, 3200);
  }

  // =========================================================================
  // 3. PMP DEAL GENERATOR DEMO
  // =========================================================================
  const pmpModal = document.getElementById('pmp-generator-modal');
  const openPmpBtns = document.querySelectorAll('.open-pmp-btn');
  const closePmpBtn = document.getElementById('close-pmp-btn');
  const generateDealBtn = document.getElementById('generate-deal-btn');
  const dealResultBox = document.getElementById('deal-result-box');
  const generatedDealId = document.getElementById('generated-deal-id');
  const copyDealBtn = document.getElementById('copy-deal-btn');

  function openPmpModal(category = 'AUDIENCE-LAYERED') {
    if (pmpModal) {
      pmpModal.classList.remove('hidden');
      pmpModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      const catInput = document.getElementById('pmp-category-select');
      if (catInput) catInput.value = category;
      if (dealResultBox) dealResultBox.classList.add('hidden');
      if (window.lucide) lucide.createIcons();
    }
  }

  function closePmpModal() {
    if (pmpModal) {
      pmpModal.classList.add('hidden');
      pmpModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  openPmpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-pmp-cat') || 'AUDIENCE-LAYERED';
      openPmpModal(cat);
    });
  });

  if (closePmpBtn) closePmpBtn.addEventListener('click', closePmpModal);

  if (pmpModal) {
    pmpModal.addEventListener('click', (e) => {
      if (e.target === pmpModal) closePmpModal();
    });
  }

  if (generateDealBtn) {
    generateDealBtn.addEventListener('click', () => {
      const orig = generateDealBtn.innerHTML;
      generateDealBtn.disabled = true;
      generateDealBtn.innerHTML = `<div class="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mx-auto"></div>`;

      setTimeout(() => {
        generateDealBtn.disabled = false;
        generateDealBtn.innerHTML = orig;
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const dealId = `PMP-CURATED-US-SSP-${randomNum}`;

        if (generatedDealId) generatedDealId.textContent = dealId;
        if (dealResultBox) dealResultBox.classList.remove('hidden');
        showToast('PMP Deal Active', `Deal ID ${dealId} generated across OpenX, Magnite, PubMatic.`);
      }, 900);
    });
  }

  if (copyDealBtn && generatedDealId) {
    copyDealBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(generatedDealId.textContent).then(() => {
        showToast('Copied', 'PMP Deal ID copied! Paste into DV360 / TTD.');
      });
    });
  }

  // =========================================================================
  // 4. "ASK AI" ASSISTANT WIDGET & MODAL
  // =========================================================================
  const aiBadge = document.getElementById('floating-ai-trigger');
  const aiModal = document.getElementById('ai-assistant-modal');
  const closeAiBtn = document.getElementById('close-ai-modal');
  const aiQuestionBtns = document.querySelectorAll('.ai-question-prompt');
  const aiAnswerBox = document.getElementById('ai-response-content');

  const aiAnswers = {
    'what-is-ssp': `<strong>Supply Side Trading®</strong> is Curated.Media's proprietary approach to programmatic execution. Rather than relying solely on buy-side DSP algorithms that sift through bloated auctions, curation shapes, filters, and enriches inventory upstream at the SSP level before bidding occurs. This cuts out SSP margin hops, eliminates MFA (Made-For-Advertising) waste, and guarantees transparent 1st-party deal terms.`,
    'how-pmp-works': `Curated PMPs (Private Marketplace Deals) package premium publisher audiences, verified viewability signals, and contextual relevance into a single deal ID. Media buyers simply enter this Deal ID into their DSP (such as Google DV360, The Trade Desk, or Amazon DSP) to access optimized supply with zero tech fees.`,
    'which-channels': `Curated.Media curates inventory across CTV / Streaming TV, Premium Web Display, High-Impact Outstream Video, Digital Audio (Podcasts/Streaming), and Brand-Suitable YouTube channels.`
  };

  function openAiModal() {
    if (aiModal) {
      aiModal.classList.remove('hidden');
      aiModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }
  }

  function closeAiModal() {
    if (aiModal) {
      aiModal.classList.add('hidden');
      aiModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  if (aiBadge) aiBadge.addEventListener('click', openAiModal);
  if (closeAiBtn) closeAiBtn.addEventListener('click', closeAiModal);

  if (aiModal) {
    aiModal.addEventListener('click', (e) => {
      if (e.target === aiModal) closeAiModal();
    });
  }

  aiQuestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const qKey = btn.getAttribute('data-q');
      if (aiAnswers[qKey] && aiAnswerBox) {
        aiAnswerBox.innerHTML = `
          <div class="flex items-center gap-2 text-xs text-[#10b981] font-mono mb-2">
            <span class="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
            <span>AI SYNTHESIS COMPLETE</span>
          </div>
          <p class="text-sm text-zinc-200 leading-relaxed">${aiAnswers[qKey]}</p>
        `;
      }
    });
  });

  // =========================================================================
  // 5. BOOK A CALL / GET STARTED MODAL
  // =========================================================================
  const bookModal = document.getElementById('book-call-modal');
  const openBookBtns = document.querySelectorAll('.open-book-modal');
  const closeBookBtn = document.getElementById('close-book-modal');
  const bookForm = document.getElementById('book-call-form');

  function openBookModal() {
    if (bookModal) {
      bookModal.classList.remove('hidden');
      bookModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }
  }

  function closeBookModal() {
    if (bookModal) {
      bookModal.classList.add('hidden');
      bookModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  openBookBtns.forEach(btn => btn.addEventListener('click', openBookModal));
  if (closeBookBtn) closeBookBtn.addEventListener('click', closeBookModal);

  if (bookModal) {
    bookModal.addEventListener('click', (e) => {
      if (e.target === bookModal) closeBookModal();
    });
  }

  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<div class="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mx-auto"></div>`;

      setTimeout(() => {
        closeBookModal();
        bookForm.reset();
        btn.disabled = false;
        btn.innerHTML = orig;
        showToast('Call Confirmed 🚀', 'Our curation trading desk will send your calendar invite shortly.');
      }, 1000);
    });
  }

  // =========================================================================
  // 6. TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(title, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'glass-card-curated p-4 rounded-xl border border-white/10 flex items-start gap-3 shadow-2xl transition-all duration-300 transform translate-y-3 opacity-0 w-80 max-w-[90vw] bg-[#0c0e14]';
    toast.innerHTML = `
      <div class="mt-0.5 text-[#10b981]">
        <i data-lucide="check-circle" class="w-4 h-4"></i>
      </div>
      <div class="flex-1">
        <h4 class="text-xs font-bold text-white font-['Space_Grotesk']">${title}</h4>
        <p class="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">${message}</p>
      </div>
      <button class="text-zinc-500 hover:text-white" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-3', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
});
