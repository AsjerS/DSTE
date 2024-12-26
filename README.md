# DSTE - De Skeere Text Editor

### **WARNING**: THIS PROJECT IS NOT FINISHED BUT I DECIDED TO MAKE A GITHUB PAGE FOR IT BECAUSE I HAD NOTHING TO DO, THE PROJECT FILES ARE PROBABLY NOT HERE YET

## Introduction

De Skeere Text Editor (English: The Crappy Text Editor) is a text editor written in HTML made to be fully usable without internet. It's made for people that can't have professional editors like Notepad++ because they have a device managed by someone else, like a school.

The editor is also made to be highly customizable, with customizable theme colours, font sizes, tab behaviour, fonts, and even a website icon that changes colours.

## Setup & Installation

Download the folder called `DSTE` from this Github page, and open the `index.html` file to use the application. It should open the program in a browser by default.

## Shortcuts

| Action                    | Shortcut             |
|---------------------------|----------------------|
| Decrease font size        | ctrl + [             |
| Increase font size        | ctrl + ]             |
| Save file                 | ctrl + s             |
| Load/open file            | ctrl + o             |
| Edit settings/preferences | ctrl + ,<br>ctrl + p |

## Customization

### Themes

In the `themes.js` file, you can change the values for all the default colours used in the application by changing the hex colour values for each variable.

### Shortcuts

In the `shortcuts.js` file, you can add your own shortcuts to the app, or change what key does what. This is a bit harder than changing the theme though, as this is not just a configuration file, but also contains code that calls functions from the main `script.js` file.

### Fonts

In the `fonts` folder, you can add your the font files you'd like to be able to select. For this to work, you need to add the font file to the `style.css` file, including what type it is (we usually use `.ttf` files, which are of the `truetype` type), and afterwards, you need to add an option to select your new font in the HTML document under the settings menu. There should be a category in there called `WEBSAFE` and `NOT SAFE`, and I'd recommend putting your new font under the `NOT SAFE` category.
