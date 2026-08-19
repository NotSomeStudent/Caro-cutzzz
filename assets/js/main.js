(function () {
  var year = document.getElementById('yr');
  if (year) year.textContent = new Date().getFullYear();

  function hasFont(name) {
    try {
      var ctx = document.createElement('canvas').getContext('2d');
      var sample = 'ABCWMgjq0123';
      ctx.font = '72px monospace';
      var base = ctx.measureText(sample).width;
      ctx.font = '72px "' + name + '", monospace';
      return ctx.measureText(sample).width !== base;
    } catch (e) {
      return true;
    }
  }

  function checkFont() {
    if (!hasFont('Archivo Black')) document.documentElement.className += ' nofont';
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkFont);
  else setTimeout(checkFont, 1500);

  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;

    var box = img.parentNode;
    if (!box || !box.className) return;

    if (box.className.indexOf('tile') > -1 || box.className.indexOf('cmt') > -1 || box.className.indexOf('shot') > -1) {
      box.className += ' img-off';
    }
  }, true);

  var reveal = document.querySelectorAll('.rv');

  function showAll() {
    for (var i = 0; i < reveal.length; i++) reveal[i].classList.add('in');
  }

  if (!('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px' });

  for (var i = 0; i < reveal.length; i++) observer.observe(reveal[i]);

  setTimeout(showAll, 2600);
})();
