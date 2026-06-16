/* ============================================
   HEY! PEPPERS — TRILHA TECH
   script.js
   ============================================ */

/* ========================================
   DADOS INICIAIS
   ======================================== */

const TRILHAS_INFO = {
  'robotica-kids': {
    id: 'robotica-kids',
    nome: 'Robótica Kids',
    faixa: '6 a 7 anos',
    emoji: '🤖',
    cor: 'laranja',
    descricao: 'Introdução à tecnologia com projetos divertidos e educativos para os menores.',
    sobre: 'A Robótica Kids é o primeiro passo das crianças no mundo da tecnologia! Com atividades lúdicas e materiais coloridos, os pequenos aprendem conceitos de lógica, sequência e criatividade enquanto montam e programam seus primeiros robôs. Tudo com muita diversão e sem tela!',
    aprende: ['Lógica e sequenciamento', 'Trabalho em equipe', 'Criatividade e imaginação', 'Conceitos básicos de robótica', 'Coordenação motora fina'],
    imagem: null
  },
  'robotica': {
    id: 'robotica',
    nome: 'Robótica',
    faixa: '7 a 11 anos',
    emoji: '⚙️',
    cor: 'azul',
    descricao: 'Construção com LEGO WeDo 2.0 e projetos práticos de engenharia.',
    sobre: 'Na trilha de Robótica, os alunos avançam para projetos mais complexos usando o LEGO WeDo 2.0 e outras plataformas. Eles aprendem sobre sensores, motores e programação em blocos, construindo robôs que realmente funcionam e resolvem desafios reais.',
    aprende: ['Programação em blocos', 'Sensores e atuadores', 'LEGO WeDo 2.0', 'Engenharia e prototipagem', 'Resolução de problemas'],
    imagem: null
  },
  'aventura': {
    id: 'aventura',
    nome: 'Aventureiros da Programação',
    faixa: '8 a 12 anos',
    emoji: '🧩',
    cor: 'roxo',
    descricao: 'Programação com Scratch e desenvolvimento do pensamento computacional.',
    sobre: 'Os Aventureiros da Programação mergulham no Scratch e descobrem que programar é como contar histórias. Nessa trilha, os alunos criam animações, jogos interativos e projetos autorais, desenvolvendo o raciocínio lógico de forma criativa e divertida.',
    aprende: ['Programação em Scratch', 'Animações e histórias interativas', 'Criação de jogos 2D', 'Pensamento computacional', 'Depuração e resolução de bugs'],
    imagem: null
  },
  'programacao': {
    id: 'programacao',
    nome: 'Programação de Jogos',
    faixa: '9 a 13 anos',
    emoji: '🎮',
    cor: 'vermelho',
    descricao: 'Criação de jogos 2D com física, mecânicas e design de personagens.',
    sobre: 'Na trilha de Programação de Jogos, os alunos aprendem a criar jogos completos do zero! Desde a ideia e design de personagens até as mecânicas de jogo, física e sons. Usamos ferramentas profissionais e os alunos saem com projetos reais publicados no Scratch.',
    aprende: ['Design de jogos', 'Física aplicada a jogos', 'Sprites e animação', 'Sons e efeitos', 'Publicação de projetos'],
    imagem: null
  },
  'maker-high-tech': {
    id: 'maker-high-tech',
    nome: 'Maker High Tech',
    faixa: '10+ anos',
    emoji: '🔌',
    cor: 'verde',
    descricao: 'Arduino, protoboard, eletrônica prática e projetos do mundo maker.',
    sobre: 'O Maker High Tech é para quem quer ir além e entender como a tecnologia realmente funciona. Os alunos trabalham com Arduino, protoboard, componentes eletrônicos e até dão os primeiros passos em linguagem C. Projetos práticos que conectam o digital ao físico!',
    aprende: ['Arduino e programação C', 'Eletrônica básica e protoboard', 'Sensores e módulos', 'Projetos maker completos', 'Leitura de esquemas elétricos'],
    imagem: null
  }
};

// Dados persistidos no localStorage
function getJogos() {
  try {
    return JSON.parse(localStorage.getItem('heyPeppersJogos') || '[]');
  } catch { return []; }
}

function salvarJogos(lista) {
  localStorage.setItem('heyPeppersJogos', JSON.stringify(lista));
}

function getTrilhas() {
  try {
    const saved = JSON.parse(localStorage.getItem('heyPeppersTrilhas') || 'null');
    return saved || JSON.parse(JSON.stringify(TRILHAS_INFO)); // deep clone
  } catch { return JSON.parse(JSON.stringify(TRILHAS_INFO)); }
}

function salvarTrilhas(trilhas) {
  localStorage.setItem('heyPeppersTrilhas', JSON.stringify(trilhas));
}

// Inicializar com dados exemplo se não houver nada salvo
function inicializarDados() {
  if (getJogos().length === 0) {
    const exemplos = [
      { id: 1, aluno: 'Pedro', titulo: 'Aventura Espacial', trilha: 'programacao', url: 'https://scratch.mit.edu', desc: 'Desvie dos asteroides e colete estrelas nesse jogo épico!', imagem: null, data: '2024-05-10' },
      { id: 2, aluno: 'Edgar', titulo: 'Robô Dançarino', trilha: 'robotica', url: '', desc: 'Um robô que dança ao som de música criado com LEGO WeDo.', imagem: null, data: '2024-05-12' },
      { id: 3, aluno: 'Eduardo', titulo: 'Labirinto Mágico', trilha: 'aventura', url: 'https://scratch.mit.edu', desc: 'Encontre a saída do labirinto usando sua lógica!', imagem: null, data: '2024-05-14' },
      { id: 4, aluno: 'Bento', titulo: 'Fazenda Virtual', trilha: 'programacao', url: 'https://scratch.mit.edu', desc: 'Plante, colha e venda seus produtos nessa fazenda divertida.', imagem: null, data: '2024-05-16' },
      { id: 5, aluno: 'Tales', titulo: 'Corrida de Carros', trilha: 'programacao', url: 'https://scratch.mit.edu', desc: 'O jogo de corrida mais rápido já criado por um aluno da Hey!', imagem: null, data: '2024-05-18' },
    ];
    salvarJogos(exemplos);
  }
}

/* ========================================
   NAVEGAÇÃO
   ======================================== */

let paginaAtual = 'home';
let cursoAtualAdmin = null;

function goTo(pagina) {
  // Esconde todas as páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pg = document.getElementById('page-' + pagina);
  if (pg) pg.classList.add('active');

  const btn = document.querySelector(`.nav-btn[data-page="${pagina}"]`);
  if (btn) btn.classList.add('active');

  paginaAtual = pagina;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Renderizar conteúdo da página
  if (pagina === 'home') renderHome();
  if (pagina === 'jogos') renderJogos();
  if (pagina === 'cursos') renderCursos();
  if (pagina === 'admin') renderAdmin();

  // Fechar menu mobile
  document.getElementById('main-nav-mobile')?.classList.remove('open');
  document.querySelector('.main-nav')?.classList.remove('open');
}

function goToCurso(id) {
  goTo('cursos');
  setTimeout(() => abrirCurso(id), 50);
}

// Nav buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => goTo(btn.dataset.page));
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('open');
});

/* ========================================
   HOME
   ======================================== */

function renderHome() {
  const jogos = getJogos();
  const preview = document.getElementById('jogos-home-preview');
  if (!preview) return;

  const ultimos = jogos.slice(-4).reverse();
  if (ultimos.length === 0) {
    preview.innerHTML = '<p style="color:var(--c-muted);font-size:.9rem">Nenhum jogo publicado ainda.</p>';
    return;
  }
  preview.innerHTML = ultimos.map(j => cardJogoHTML(j)).join('');
}

/* ========================================
   JOGOS
   ======================================== */

let filtroAtual = 'all';

function renderJogos(filtro) {
  if (filtro !== undefined) filtroAtual = filtro;

  const jogos = getJogos();
  const lista = document.getElementById('jogos-lista');
  const empty = document.getElementById('jogos-empty');
  if (!lista) return;

  let filtrados = filtroAtual === 'all' ? jogos : jogos.filter(j => j.trilha === filtroAtual);

  if (filtrados.length === 0) {
    lista.innerHTML = '';
    if (empty) empty.style.display = 'block';
  } else {
    if (empty) empty.style.display = 'none';
    lista.innerHTML = filtrados.map(j => cardJogoHTML(j)).join('');
  }
}

function cardJogoHTML(jogo) {
  const trilha = getTrilhas()[jogo.trilha] || {};
  const corTag = { laranja: '#FF6B00', azul: '#1A6BFF', roxo: '#7B2FFF', vermelho: '#E8002A', verde: '#00B248' };
  const cor = corTag[trilha.cor] || '#1A6BFF';
  const thumb = jogo.imagem
    ? `<div class="jogo-thumb"><img src="${jogo.imagem}" alt="${jogo.titulo}" loading="lazy"/></div>`
    : `<div class="jogo-thumb-placeholder">${trilha.emoji || '🎮'}</div>`;

  return `
    <div class="jogo-card" onclick="abrirModalJogo(${jogo.id})">
      ${thumb}
      <div class="jogo-info">
        <span class="jogo-trilha-tag" style="background:${cor}">${trilha.nome || jogo.trilha}</span>
        <div class="jogo-nome">${jogo.titulo}</div>
        <div class="jogo-aluno">👤 ${jogo.aluno}</div>
        <button class="btn-play" onclick="event.stopPropagation(); abrirModalJogo(${jogo.id})">🎮 Ver Jogo</button>
      </div>
    </div>
  `;
}

// Filtros de jogo
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderJogos(btn.dataset.filter);
  });
});

/* ========================================
   MODAL JOGO
   ======================================== */

function abrirModalJogo(id) {
  const jogos = getJogos();
  const jogo = jogos.find(j => j.id === id);
  if (!jogo) return;

  const trilha = getTrilhas()[jogo.trilha] || {};
  const thumb = jogo.imagem
    ? `<div class="modal-jogo-img"><img src="${jogo.imagem}" alt="${jogo.titulo}"/></div>`
    : `<div class="modal-jogo-img-placeholder">${trilha.emoji || '🎮'}</div>`;

  const linkBtn = jogo.url
    ? `<a href="${jogo.url}" target="_blank" rel="noopener" class="btn-primary" style="text-decoration:none;display:inline-block">🎮 Jogar agora</a>`
    : `<span style="color:var(--c-muted);font-size:.85rem">🔗 Link do jogo não disponível</span>`;

  document.getElementById('modal-conteudo').innerHTML = `
    ${thumb}
    <div class="modal-jogo-info">
      <h3>${jogo.titulo}</h3>
      <p>👤 <strong>${jogo.aluno}</strong> · ${trilha.nome || jogo.trilha}</p>
      <p>${jogo.desc || 'Sem descrição.'}</p>
      <div class="modal-jogo-actions">
        ${linkBtn}
      </div>
    </div>
  `;

  document.getElementById('modal-jogo').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modal-jogo').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ========================================
   CURSOS
   ======================================== */

function renderCursos() {
  const trilhas = getTrilhas();
  const grid = document.getElementById('cursos-grid-lista');
  if (!grid) return;

  const corBg = { laranja: '#FFF3E6', azul: '#E6EFFF', roxo: '#F0E6FF', vermelho: '#FFE6EA', verde: '#E6FFF0' };
  const corBtn = { laranja: '#FF6B00', azul: '#1A6BFF', roxo: '#7B2FFF', vermelho: '#E8002A', verde: '#00B248' };

  grid.innerHTML = Object.values(trilhas).map(t => {
    const banner = t.imagem
      ? `<div class="curso-banner" style="background:${corBg[t.cor]||'#e8edff'}">
           <img src="${t.imagem}" alt="${t.nome}" />
           <span class="curso-banner-emoji">${t.emoji}</span>
         </div>`
      : `<div class="curso-banner" style="background:${corBg[t.cor]||'#e8edff'}">
           <span class="curso-banner-emoji">${t.emoji}</span>
         </div>`;

    return `
      <div class="curso-card" onclick="abrirCurso('${t.id}')">
        ${banner}
        <div class="curso-body">
          <div class="curso-faixa">⏰ ${t.faixa}</div>
          <div class="curso-nome">${t.nome}</div>
          <div class="curso-desc">${t.descricao}</div>
          <button class="btn-curso" style="background:${corBtn[t.cor]||'#1A6BFF'};color:#fff">
            Ver Trilha →
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function abrirCurso(id) {
  const trilhas = getTrilhas();
  const t = trilhas[id];
  if (!t) return;

  const jogos = getJogos().filter(j => j.trilha === id);
  const corBg = { laranja: '#FFF3E6', azul: '#E6EFFF', roxo: '#F0E6FF', vermelho: '#FFE6EA', verde: '#E6FFF0' };

  const bannerStyle = t.imagem
    ? `style="background:${corBg[t.cor]||'#e8edff'}"`
    : `style="background:${corBg[t.cor]||'#e8edff'}"`;

  const bannerImg = t.imagem
    ? `<img src="${t.imagem}" alt="${t.nome}" />`
    : '';

  const aprendeItems = (t.aprende || []).map(a => `<li>${a}</li>`).join('');
  const jogosHTML = jogos.length > 0
    ? `<div class="jogos-grid">${jogos.map(j => cardJogoHTML(j)).join('')}</div>`
    : '<p style="color:var(--c-muted);font-size:.9rem">Nenhum jogo publicado nessa trilha ainda.</p>';

  document.getElementById('curso-detalhe-conteudo').innerHTML = `
    <div class="curso-detalhe-hero" ${bannerStyle}>
      ${bannerImg}
      <div class="curso-detalhe-hero-bg">${t.emoji}</div>
      <div class="curso-detalhe-hero-overlay">
        <h2>${t.nome}</h2>
        <p>⏰ ${t.faixa}</p>
      </div>
    </div>
    <div class="curso-detalhe-body">
      <div class="detalhe-sobre">
        <h3>Sobre a Trilha</h3>
        <p>${t.sobre || t.descricao}</p>
      </div>
      <div class="detalhe-aprende">
        <h3>O que você vai aprender</h3>
        <ul>${aprendeItems}</ul>
      </div>
    </div>
    <div class="curso-detalhe-jogos">
      <h3>🎮 Jogos desta Trilha</h3>
      ${jogosHTML}
    </div>
  `;

  document.getElementById('cursos-lista').style.display = 'none';
  document.getElementById('curso-detalhe').classList.remove('hidden');
}

function voltarCursos() {
  document.getElementById('cursos-lista').style.display = '';
  document.getElementById('curso-detalhe').classList.add('hidden');
}

/* ========================================
   ADMIN
   ======================================== */

function renderAdmin() {
  renderCursosEditList();
  renderAdminJogos();
}

// Tabs do admin
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    if (tab.dataset.tab === 'lista-jogos') renderAdminJogos();
    if (tab.dataset.tab === 'edit-cursos') renderCursosEditList();
  });
});

// ---- Upload de imagem (Jogo) ----
const jogoImgInput = document.getElementById('jogo-img');
jogoImgInput.addEventListener('change', () => {
  const file = jogoImgInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('jogo-img-preview');
    preview.src = e.target.result;
    preview.classList.remove('hidden');
    document.querySelector('.file-drop-inner').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// Drag & drop jogo
const jogoDrop = document.getElementById('jogo-img-drop');
jogoDrop.addEventListener('dragover', e => { e.preventDefault(); jogoDrop.style.borderColor = 'var(--c-azul)'; });
jogoDrop.addEventListener('dragleave', () => { jogoDrop.style.borderColor = ''; });
jogoDrop.addEventListener('drop', e => {
  e.preventDefault();
  jogoDrop.style.borderColor = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    jogoImgInput.files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = ev => {
      const preview = document.getElementById('jogo-img-preview');
      preview.src = ev.target.result;
      preview.classList.remove('hidden');
      document.querySelector('#jogo-img-drop .file-drop-inner').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

function adicionarJogo() {
  const aluno = document.getElementById('jogo-aluno').value.trim();
  const titulo = document.getElementById('jogo-titulo').value.trim();
  const trilha = document.getElementById('jogo-trilha').value;
  const url = document.getElementById('jogo-url').value.trim();
  const desc = document.getElementById('jogo-desc').value.trim();
  const preview = document.getElementById('jogo-img-preview');

  if (!aluno || !titulo || !trilha) {
    mostrarFeedback('jogo-feedback', 'error', '⚠️ Preencha nome do aluno, título e trilha.');
    return;
  }

  const imagem = (!preview.classList.contains('hidden') && preview.src) ? preview.src : null;

  const jogos = getJogos();
  const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => j.id)) + 1 : 1;

  jogos.push({
    id: novoId,
    aluno,
    titulo,
    trilha,
    url,
    desc,
    imagem,
    data: new Date().toISOString().split('T')[0]
  });

  salvarJogos(jogos);
  mostrarFeedback('jogo-feedback', 'success', `✅ Jogo de ${aluno} publicado com sucesso!`);
  limparFormJogo();
  mostrarToast(`🎮 "${titulo}" publicado!`);
}

function limparFormJogo() {
  document.getElementById('jogo-aluno').value = '';
  document.getElementById('jogo-titulo').value = '';
  document.getElementById('jogo-trilha').value = '';
  document.getElementById('jogo-url').value = '';
  document.getElementById('jogo-desc').value = '';
  document.getElementById('jogo-img-preview').classList.add('hidden');
  document.getElementById('jogo-img-preview').src = '';
  document.querySelector('#jogo-img-drop .file-drop-inner').style.display = '';
  document.getElementById('jogo-img').value = '';
}

// ---- Lista de Jogos no Admin ----
function renderAdminJogos() {
  const jogos = getJogos();
  const cont = document.getElementById('admin-jogos-lista');
  if (!cont) return;

  if (jogos.length === 0) {
    cont.innerHTML = '<p style="color:var(--c-muted);font-size:.9rem">Nenhum jogo cadastrado ainda.</p>';
    return;
  }

  const trilhas = getTrilhas();
  cont.innerHTML = [...jogos].reverse().map(j => {
    const t = trilhas[j.trilha] || {};
    const thumb = j.imagem
      ? `<div class="admin-jogo-thumb"><img src="${j.imagem}" alt=""/></div>`
      : `<div class="admin-jogo-thumb">${t.emoji || '🎮'}</div>`;
    return `
      <div class="admin-jogo-row">
        ${thumb}
        <div class="admin-jogo-info">
          <strong>${j.titulo}</strong>
          <span>👤 ${j.aluno} · ${t.nome || j.trilha} · 📅 ${j.data || '-'}</span>
        </div>
        <div class="admin-jogo-actions">
          <button class="btn-delete" onclick="deletarJogo(${j.id})">🗑 Remover</button>
        </div>
      </div>
    `;
  }).join('');
}

function deletarJogo(id) {
  if (!confirm('Tem certeza que quer remover este jogo?')) return;
  const jogos = getJogos().filter(j => j.id !== id);
  salvarJogos(jogos);
  renderAdminJogos();
  mostrarToast('🗑 Jogo removido.');
}

// ---- Editar Trilhas ----
function renderCursosEditList() {
  const trilhas = getTrilhas();
  const cont = document.getElementById('cursos-edit-list');
  if (!cont) return;

  cont.innerHTML = Object.values(trilhas).map(t => `
    <div class="curso-edit-item">
      <span>${t.emoji}</span>
      <h4>${t.nome}</h4>
      <p style="font-size:.78rem;color:var(--c-muted)">${t.faixa}</p>
      <button class="btn-edit" onclick="abrirModalCurso('${t.id}')">✏️ Editar</button>
    </div>
  `).join('');
}

// Modal editar curso
let cursoEditandoId = null;

function abrirModalCurso(id) {
  const trilhas = getTrilhas();
  const t = trilhas[id];
  if (!t) return;

  cursoEditandoId = id;
  document.getElementById('modal-curso-titulo').textContent = `Editar: ${t.nome}`;
  document.getElementById('modal-curso-desc').value = t.descricao || '';
  document.getElementById('modal-curso-sobre').value = t.sobre || '';
  document.getElementById('modal-curso-aprende').value = (t.aprende || []).join('\n');

  const preview = document.getElementById('curso-img-preview');
  if (t.imagem) {
    preview.src = t.imagem;
    preview.classList.remove('hidden');
    document.querySelector('#curso-img-drop .file-drop-inner').style.display = 'none';
  } else {
    preview.classList.add('hidden');
    document.querySelector('#curso-img-drop .file-drop-inner').style.display = '';
  }

  document.getElementById('modal-curso').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function fecharModalCurso() {
  document.getElementById('modal-curso').classList.add('hidden');
  document.body.style.overflow = '';
  cursoEditandoId = null;
}

// Upload de imagem (Curso)
const cursoImgInput = document.getElementById('curso-img');
cursoImgInput.addEventListener('change', () => {
  const file = cursoImgInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('curso-img-preview');
    preview.src = e.target.result;
    preview.classList.remove('hidden');
    document.querySelector('#curso-img-drop .file-drop-inner').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// Drag & drop curso
const cursoDrop = document.getElementById('curso-img-drop');
cursoDrop.addEventListener('dragover', e => { e.preventDefault(); cursoDrop.style.borderColor = 'var(--c-azul)'; });
cursoDrop.addEventListener('dragleave', () => { cursoDrop.style.borderColor = ''; });
cursoDrop.addEventListener('drop', e => {
  e.preventDefault();
  cursoDrop.style.borderColor = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    cursoImgInput.files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = ev => {
      const preview = document.getElementById('curso-img-preview');
      preview.src = ev.target.result;
      preview.classList.remove('hidden');
      document.querySelector('#curso-img-drop .file-drop-inner').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

function salvarCurso() {
  if (!cursoEditandoId) return;

  const trilhas = getTrilhas();
  const preview = document.getElementById('curso-img-preview');
  const imagem = (!preview.classList.contains('hidden') && preview.src) ? preview.src : (trilhas[cursoEditandoId].imagem || null);
  const aprendeRaw = document.getElementById('modal-curso-aprende').value;

  trilhas[cursoEditandoId] = {
    ...trilhas[cursoEditandoId],
    descricao: document.getElementById('modal-curso-desc').value.trim(),
    sobre: document.getElementById('modal-curso-sobre').value.trim(),
    aprende: aprendeRaw.split('\n').map(s => s.trim()).filter(Boolean),
    imagem
  };

  salvarTrilhas(trilhas);
  mostrarFeedback('curso-feedback', 'success', '✅ Trilha atualizada!');
  mostrarToast('✅ Trilha salva com sucesso!');
  setTimeout(fecharModalCurso, 1200);
}

/* ========================================
   UTILITÁRIOS
   ======================================== */

function mostrarFeedback(id, tipo, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'feedback ' + tipo;
  el.textContent = msg;
  setTimeout(() => { el.className = 'feedback hidden'; }, 4000);
}

let toastTimer;
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Fechar modal com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    fecharModal();
    fecharModalCurso();
  }
});

/* ========================================
   INICIALIZAÇÃO
   ======================================== */
inicializarDados();
goTo('home');
