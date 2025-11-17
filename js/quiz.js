
(function() {
  const answers = { q1: 'b', q2: 'b', q3: 'b' };

  function calcScore() {
    let score = 0;
    let total = Object.keys(answers).length;
    Object.keys(answers).forEach(q => {
      const checked = document.querySelector(`input[name="${q}"]:checked`);
      if (checked && checked.value === answers[q]) score++;
    });
    return { score, total };
  }

  const btn = document.getElementById('quiz-submit');
  const resultEl = document.getElementById('quiz-result');

  if (btn && resultEl) {
    btn.addListener = btn.addEventListener || btn.attachEvent;
    btn.addListener('click', function() {
      const { score, total } = calcScore();
      resultEl.textContent = `Obtuviste ${score} de ${total} respuestas correctas.`;
    });
  }

  const dlBtn = document.getElementById('quiz-download');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      const { score, total } = calcScore();
      const rows = [
        ['pregunta', 'respuesta_correcta'],
      ];

      ['q1', 'q2', 'q3'].forEach(q => {
        const checked = document.querySelector(`input[name="${q}"]:checked`);
        rows.push([q, checked ? checked.value : 'sin_respuesta']);
      });

      rows.push(['puntaje', `${score}/${total}`]);

      let csv = '';
      rows.forEach(r => {
        csv += r.join(';') + '\n';
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quiz_usb_respuestas.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  const ticketBtn = document.getElementById('ticket-download');
  if (ticketBtn) {
    ticketBtn.addEventListener('click', () => {
      const nombre = (document.getElementById('ticket-nombre') || {}).value || '';
      const comentario = (document.getElementById('ticket-pregunta') || {}).value || '';
      const { score, total } = calcScore();
      const content =
        `Ticket de salida – Memoria USB\n\n` +
        `Nombre: ${nombre}\n` +
        `Puntaje quiz (si lo realizó): ${score}/${total}\n\n` +
        `Aprendizaje clave:\n${comentario}\n`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ticket_salida_usb.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
})();
