let state = {
  supplements: [],
  purchases: []
};

function saveState() {
  localStorage.setItem('supp-state', JSON.stringify(state));
  render();
}

function loadState() {
  const data = localStorage.getItem('supp-state');
  if (data) state = JSON.parse(data);
  render();
}

function addSupplement(name, daily) {
  state.supplements.push({id: Date.now(), name, daily, jars:0});
  saveState();
}

function addJar(id) {
  const supp = state.supplements.find(s => s.id === id);
  if (!supp) return;
  const cost = parseFloat(prompt("¿Cuánto costó este frasco?"));
  if (!isNaN(cost)) {
    state.purchases.push({id, date: Date.now(), cost});
    supp.jars += 1;
    saveState();
  }
}

function removeJar(id) {
  const supp = state.supplements.find(s => s.id === id);
  if (!supp) return;
  if (supp.jars > 0) {
    supp.jars -= 1;
    saveState();
  }
}

function render() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  state.supplements.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<b>${s.name}</b><br>
      Frascos: ${s.jars} <br>
      <button onclick="addJar(${s.id})">+1 frasco</button>
      <button onclick="removeJar(${s.id})">-1 frasco</button>`;
    list.appendChild(div);
  });
  renderMetrics();
}

function renderMetrics() {
  const now = Date.now();
  const msDay = 24*60*60*1000;
  const purchases = state.purchases;
  let metricsDiv = document.getElementById('metrics');

  function calc(rangeDays) {
    const cutoff = now - rangeDays*msDay;
    const recent = purchases.filter(p => p.date >= cutoff);
    if (recent.length === 0) return {total:0, avg:0};
    const total = recent.reduce((a,b)=>a+b.cost,0);
    const spanDays = Math.max(1, (now - Math.min(...recent.map(p=>p.date)))/msDay);
    const avgDaily = total / spanDays;
    return {total, avg: avgDaily};
  }

  const w = calc(7);
  const m = calc(30);
  const y = calc(365);

  metricsDiv.innerHTML = `
    <h3>📊 Métricas de gasto</h3>
    <p>Gastado (7 días): $${w.total.toFixed(2)}</p>
    <p>Gastado (30 días): $${m.total.toFixed(2)}</p>
    <p>Gastado (365 días): $${y.total.toFixed(2)}</p>
    <p>Promedio semana: $${(w.avg*7).toFixed(2)}</p>
    <p>Promedio mes: $${(m.avg*30).toFixed(2)}</p>
    <p>Promedio año: $${(y.avg*365).toFixed(2)}</p>
  `;
}

function exportState() {
  const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'suplementos.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importState(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      state = JSON.parse(e.target.result);
      saveState();
    } catch(err) { alert('Error al importar'); }
  };
  reader.readAsText(file);
}

window.onload = loadState;
