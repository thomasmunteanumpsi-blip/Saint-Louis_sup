document.documentElement.classList.add('js');

const data = {
  logique: {
    title: 'Rudiments de logique',
    tds: [
      ['Mansuy', 'TD 1', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD1.pdf', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD1-correction.pdf'],
      ['Kaczmarek', 'TD', 'https://laurentkaczmarek.fr/cours/ExercicesLogiqueEtRaisonnementsMathematiques.pdf', null],
      ['Champollion', 'TD 1', 'https://www.mp2i-champo.fr/TD/TD1.pdf', null],
      ['Mullaert', 'TD 1', 'https://saint-louis.mullaert.fr/TD/TD1-Raisonnements.pdf', null],
      ['Bertault', 'TD', 'https://christophebertault.fr/documents/coursetexercices/Exercices%20-%20Rudiments%20de%20logique%20et%20vocabulaire%20ensembliste.pdf', 'https://christophebertault.fr/documents/coursetexercices/Exercices%20indications%20-%20Rudiments%20de%20logique%20et%20vocabulaire%20ensembliste.pdf']
    ]
  },
  calculs: {
    title: 'Calculs',
    tds: [
      ['Mansuy', 'TD 2', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD2.pdf', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD2-correction.pdf'],
      ['Mansuy', 'TD 3', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD3.pdf', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD3-correction.pdf'],
      ['Kaczmarek', 'TD', 'https://llgpcsi2.wordpress.com/wp-content/uploads/2023/09/calculsalgebriques.pdf', null],
      ['Champollion', 'TD 3', 'https://www.mp2i-champo.fr/TD/TD3.pdf', null],
      ['Mullaert', 'TD 2', 'https://saint-louis.mullaert.fr/TD/TD2-Calculs.pdf', null],
      ['Bertault', 'TD', 'https://christophebertault.fr/documents/coursetexercices/Exercices%20-%20Calculs%20algebriques%20dans%20R.pdf', 'https://christophebertault.fr/documents/coursetexercices/Exercices%20indications%20-%20Calculs%20algebriques%20dans%20R.pdf']
    ]
  },
  complexes: {
    title: 'Complexes',
    tds: [
      ['Mansuy', 'TD 7', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD7.pdf', 'https://www.mathieu-mansuy.fr/pdf/MP2I-TD7-correction.pdf'],
      ['Kaczmarek', 'TD', 'https://laurentkaczmarek.fr/cours/ExercicesNombresComplexes.pdf', null],
      ['Champollion', 'TD 7', 'https://www.mp2i-champo.fr/TD/TD7.pdf', null],
      ['Mullaert', 'TD 3', 'https://saint-louis.mullaert.fr/TD/TD3-Complexes.pdf', null],
      ['Bertault', 'TD', 'https://christophebertault.fr/documents/coursetexercices/Exercices%20-%20Nombres%20complexes.pdf', 'https://christophebertault.fr/documents/coursetexercices/Exercices%20indications%20-%20Nombres%20complexes.pdf']
    ]
  }
};

const panel = document.querySelector('#chapterPanel');
const panelTitle = document.querySelector('#panelTitle');
const tdList = document.querySelector('#tdList');
const closePanel = document.querySelector('#closePanel');

function openChapter(key){
  const c = data[key];
  if(!c) return;
  panelTitle.textContent = c.title;
  tdList.innerHTML = c.tds.map(([source,label,pdf,corr]) => `
    <div class="td-row">
      <span class="td-source">${source}</span>
      <a class="td-link" href="${pdf}" target="_blank" rel="noopener">${label}</a>
      ${corr ? `<span class="td-sep">(</span><a class="correction-link" href="${corr}" target="_blank" rel="noopener">correction</a><span class="td-sep">)</span>` : ''}
    </div>`).join('');
  panel.hidden = false;
  panel.scrollIntoView({behavior:'smooth',block:'start'});
  history.replaceState(null,'','#chapter-'+key);
}

document.querySelectorAll('[data-chapter]').forEach(el => el.addEventListener('click', () => openChapter(el.dataset.chapter)));
document.querySelectorAll('[data-open]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openChapter(el.dataset.open); }));
closePanel.addEventListener('click', () => { panel.hidden = true; history.replaceState(null,'','#td'); document.querySelector('#td').scrollIntoView({behavior:'smooth'}); });

if(location.hash.startsWith('#chapter-')){
  const key = location.hash.replace('#chapter-','');
  setTimeout(() => openChapter(key), 50);
}

const reveals = [...document.querySelectorAll('.reveal')];
const obs = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){ entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
}), {threshold:.08});
reveals.forEach(el => obs.observe(el));
