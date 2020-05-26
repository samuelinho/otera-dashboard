# OTERA-dashboard
**Otera-dashboard** (or as a later meaning *Optimal templates elementarily representing anchors*) is a proof of concept of a dashboard made for self use. As it was conceived, it exists with a minimal extension of code written.
It's main target were to provide a list of links to my homeserver located services and apps. 
After testing some great alternatives in the "market" like Heimdall, Homer or some others up in docker containers I found that they were either too much for my needs or required more effort to personalize them than i was willing to use.
So I decided to make my own simplistic dashboard. It's not a full tool for a production enviroment but a good base or easy tool to make some welcome page to a server.
Design is still improvable but maybe some day.
[DEMO](https://samuelinho.github.io/otera-dashboard/index.html)

# Highlights:
- **No backend nor database**
- Reads all data it needs from a **JSON** so it's easy to update
- Utterly easy to change design at will
- Uses plain html with tokens as templates
- In mi proposed front-end it uses bootstrap

# Components
- 3 html files, one with full page body, two others with templates for a link and a popup for categories (with more links inside)
- 1 sass file for my tweaks
- 1 js file with json processing and token replacement
- Nowadays jquery and bootstrap
- icons and images at will
- 1 JSON file with items and some basic configuration
  
# How it works
  At first, when you enter the dashboard, js loads the json file and two html templates and mix them to form the links structure. If JSON change, just reload page and the new structure is loaded.
Made it with writing some scripted json generator in mind so it could have automatic updates of links based on a reverse proxy configuration or on docker exposed ports.

# JSON structure
Json uses the following structure (although better take the example file as a reference)
- **NOME**: name of the app,item,category
- **ITEMS**: list of items of main scree or if it's inside a category, the items of that category
- **TIPO**: Type of item as "item" a link or "cat" a category
- **DESCRICION**: description of the app,item,category
- **ICONA**: path to icon file of item,category
- **COR**: color used as a background for link card
```
{
  "nome": "OTERA",
  "items": [
    { "tipo": "item", "nome": "AGYO", "descricion": "Duplicati backups", "icona": "icon-agyo.png", "ligazon": "localhost:8200", "cor": "#03071E" },
    { "tipo": "cat", "nome": "MEDIA", "descricion": "Gestores de medios", "icona": "icon-inari.png", "cor": "#52b788", "items": [
      { "tipo": "item", "nome": "INARI", "descricion": "Transmission", "icona": "icon-inari.png", "ligazon": "localhost:9117", "cor": "#40916c" }
    ]}
  ]
}
```
