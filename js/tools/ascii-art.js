// Minimal ASCII Art generator without external fonts
// Styles: standard, block, bubble, bold (fullwidth), 3d, graffiti, slant, mini, dotmatrix

(function(){
  const fullwidthMap = {
    '0':'０','1':'１','2':'２','3':'３','4':'４','5':'５','6':'６','7':'７','8':'８','9':'９',
    'a':'ａａ','b':'ｂ','c':'ｃ','d':'ｄ','e':'ｅ','f':'ｆ','g':'ｇ','h':'ｈ','i':'ｉ','j':'ｊ','k':'ｋ','l':'ｌ','m':'ｍ','n':'ｎ','o':'ｏ','p':'ｐ','q':'ｑ','r':'ｒ','s':'ｓ','t':'ｔ','u':'ｕ','v':'ｖ','w':'ｗ','x':'ｘ','y':'ｙ','z':'ｚ',
    'A':'Ａ','B':'Ｂ','C':'Ｃ','D':'Ｄ','E':'Ｅ','F':'Ｆ','G':'Ｇ','H':'Ｈ','I':'Ｉ','J':'Ｊ','K':'Ｋ','L':'Ｌ','M':'Ｍ','N':'Ｎ','O':'Ｏ','P':'Ｐ','Q':'Ｑ','R':'Ｒ','S':'Ｓ','T':'Ｔ','U':'Ｕ','V':'Ｖ','W':'Ｗ','X':'Ｘ','Y':'Ｙ','Z':'Ｚ',
    ' ':'  '
  };

  function toFullwidth(s){
    return s.split('').map(ch => fullwidthMap[ch] || ch).join('');
  }

  function styleBlock(s){
    return s.toUpperCase().split('').map(ch => ch + ' ').join('');
  }

  function styleBubble(s){
    return s.split('').map(ch => '(' + ch + ')').join('');
  }

  function style3D(s){
    const up = s.toUpperCase();
    const shadow = ' ' + up.replace(/./g, '·');
    return up + '\n' + shadow;
  }

  function styleGraffiti(s){
    const marks = ['*','~','`','!','^','+','?'];
    return s.split('').map(ch => ch + marks[Math.floor(Math.random()*marks.length)]).join('');
  }

  function styleSlant(s){
    return s.split('').map((ch,i) => ' '.repeat(i) + ch).join('\n');
  }

  function styleMini(s){
    return s.toLowerCase();
  }

  function styleDotMatrix(s){
    return s.split('').join('·');
  }

  function generateAscii(){
    const input = document.getElementById('asciiInput').value || '';
    const style = document.getElementById('asciiStyle').value;
    let out = '';
    switch(style){
      case 'standard': out = input; break;
      case 'block': out = styleBlock(input); break;
      case 'bubble': out = styleBubble(input); break;
      case 'bold': out = toFullwidth(input); break;
      case '3d': out = style3D(input); break;
      case 'graffiti': out = styleGraffiti(input); break;
      case 'slant': out = styleSlant(input); break;
      case 'mini': out = styleMini(input); break;
      case 'dotmatrix': out = styleDotMatrix(input); break;
      default: out = input;
    }
    document.getElementById('asciiResult').textContent = out;
  }

  function copyAsciiText(){
    copyToClipboard(document.getElementById('asciiResult').textContent);
    showNotification('ASCII text copied');
  }

  function copyAsciiHTML(){
    const pre = document.getElementById('asciiResult');
    const html = `<pre>${pre.textContent.replace(/[&<>]/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}</pre>`;
    copyToClipboard(html);
    showNotification('ASCII HTML copied');
  }

  function downloadAscii(){
    const text = document.getElementById('asciiResult').textContent;
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'ascii-art.txt'; a.click();
    URL.revokeObjectURL(url);
  }

  window.generateAscii = generateAscii;
  window.copyAsciiText = copyAsciiText;
  window.copyAsciiHTML = copyAsciiHTML;
  window.downloadAscii = downloadAscii;
})();
