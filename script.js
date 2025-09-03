set_text_col(defaults.theme.text);
set_bg_col(defaults.theme.bg);
set_accent_col(defaults.theme.accent);
set_font_size(defaults.size);
font.value = defaults.font;
document.querySelector(":root").style.setProperty("--font", defaults.font);
document.querySelector(":root").style.setProperty("--textarea-width", defaults.textareaWidth);

document.addEventListener("onload", function () {
  f = document.getElementsByClassName("font");
  for (i = 0; i < f.length; i++) {
    option = f[i];
    option.style.setProperty("font-family", option.value);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--col').trim();

  fetch('icon.svg')
      .then(response => response.text())
      .then(svgText => {
          const coloredSvg = svgText.replace(/fill="[^"]*"/, `fill="${color}"`);

          const blob = new Blob([coloredSvg], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);

          const link = document.querySelector("link[rel='icon']");
          link.href = url;
      });

    const select = document.getElementById('textarea-width');
});


function save_file() {
  filename = document.getElementById("filename").value;
  text = document.getElementById("doc").value;
  download(filename, text);
}

function load_file() {
  element = document.createElement("input");
  element.setAttribute("type", "file");
  element.style.display = "none";

  document.body.appendChild(element);

  element.click();

  element.onchange = () => {
    const file = element.files[0];

    if (!file) {
      reject(new Error('No file selected'));
      document.body.removeChild(fileInput);
      return;
    }

    document.getElementById("filename").value = file.name;

    const reader = new FileReader();

    reader.onload = () => {
      document.getElementById("doc").value = reader.result;
      document.body.removeChild(element);
    }

    reader.onerror = (error) => {
      reject(error);
      document.body.removeChild(fileInput); // Clean up
    };

    reader.readAsText(file);
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var setting_is = false;

function open_settings() {
  doc = document.getElementById("doc");
  set = document.getElementById("settings");

  if (setting_is) {
    doc.style.display = "block";
    set.style.display = "none";
  } else {
    doc.style.display = "none";
    set.style.display = "block";
  }

  setting_is = !setting_is;
}


function initializeColorPickers() {
  const themeDefaults = defaults.theme;
  const colorMap = {
    "text-col": themeDefaults.text,
    "bg-col": themeDefaults.bg,
    "accent-col": themeDefaults.accent
  };
  document.querySelectorAll('.custom-color-picker').forEach(picker => {
    const input = picker.querySelector('.hidden-color-picker');
    const display = picker.querySelector('.color-display');
    const colorValue = colorMap[input.id];
    if (colorValue) {
      input.value = colorValue;
      display.style.backgroundColor = colorValue;
    }
  });
}
window.addEventListener('DOMContentLoaded', initializeColorPickers);

document.querySelectorAll('.custom-color-picker').forEach(picker => {
  const input = picker.querySelector('.hidden-color-picker');
  const display = picker.querySelector('.color-display');

  display.addEventListener('click', () => {
    input.click();
  });

  input.addEventListener('input', () => {
    display.style.backgroundColor = input.value;
  });
});

function set_text_col(col) {
  document.getElementById("text-col").value = col;
  document.querySelector(":root").style.setProperty("--col", col);
}

function set_bg_col(col) {
  document.getElementById("bg-col").value = col;
  document.querySelector(":root").style.setProperty("--bg", col);
}

function set_accent_col(col) {
  document.getElementById("accent-col").value = col;
  document.querySelector(":root").style.setProperty("--accent", col);
}

function set_font_size(size) {
  document.getElementById("font-size").value = size;
  document.querySelector(":root").style.setProperty("--size", size + "px");
}

function set_font_style(style) {
  document.getElementById("style").value = style;
  document.querySelector(":root").style.setProperty("--style", style);
}

function change_font(e) { 
  font = e.target.value;
  document.querySelector(":root").style.setProperty("--font", font);
}


document.getElementById('doc').addEventListener('keydown', (event) => {
  const textarea = document.getElementById('doc');
  const tabBehaviorSelect = document.getElementById('tabBehaviour');

    if (event.key === 'Tab') {
      event.preventDefault();

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      tablet = {
        "html": "<!DOCTYPE html>\n<html>\n<head>\n\n</head>\n<body>\n\n</body>\n</html>",
        "\\l": "\u2190",
        "<-": "\u2190",
        "\\u": "\u2191",
        "\\r": "\u2192",
        "->": "\u2192",
        "\\d": "\u2193"
      }

      for (key in tablet) {
        if (textarea.value.substring(end - key.length, end) === key) {
          textarea.value = textarea.value.substring(0, end - key.length) + tablet[key] + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = end + tablet[key].length - key.length;
          return;
        }
      }

      const behavior = tabBehaviorSelect.value;
      let insertText;

      if (behavior === 'custom') {
        insertText = tabBehaviorCustomPremium.value;
      } else {
        insertText = behavior;
      }



      textarea.value = textarea.value.substring(0, start) +
                        insertText +
                        textarea.value.substring(end);

      textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
    }
});

function tabBehaviorCustom(e) {
  if (e.target.value == "custom") {
      document.getElementById("tabBehaviourOtherBool").style.display = "block";
  } else {
      document.getElementById("tabBehaviourOtherBool").style.display = "none";
  }
}

function set_textarea_width(event) {
  const width = event.target.value;
  document.documentElement.style.setProperty('--textarea-width', width);
}

function toggleLineWrapping(event) {
  const textArea = document.querySelector('#doc');
  if (event.target.checked) {
    textArea.style.whiteSpace = 'pre-wrap'; // Enable word wrapping
    textArea.style.overflowX = 'hidden'; // Prevent horizontal scrolling
  } else {
    textArea.style.whiteSpace = 'pre'; // Disable word wrapping
    textArea.style.overflowX = 'scroll'; // Allow horizontal scrolling
  }
}