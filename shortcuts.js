document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    save_file();
  } else if (event.ctrlKey && event.key === 'o') {
    event.preventDefault();
    load_file();
  } else if (event.ctrlKey && event.key === ',') {
    event.preventDefault();
    open_settings();
  } else if (event.ctrlKey && event.key === '[') {
    event.preventDefault();
    set_font_size(document.getElementById("font-size").value - 1);
  } else if (event.ctrlKey && event.key === ']') {
    event.preventDefault();
    set_font_size(Number(document.getElementById("font-size").value) + 1);
  } else if (event.ctrlKey && event.key === '\\') {
    event.preventDefault();
    set_font_size(defaults.size);
  }
});