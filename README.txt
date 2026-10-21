# Sorpresa de cumpleaños ❤️

## Estructura

sorpresa_cumpleanos/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── fotos/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   ├── foto3.jpg
│   ├── foto4.jpg
│   ├── foto5.jpg
│   └── foto_brindis.jpg
└── musica/
    └── musica.mp3

## Cómo utilizarla

1. Descomprime la carpeta.
2. Coloca 5 fotografías dentro de `fotos/` y nómbralas:
   - foto1.jpg
   - foto2.jpg
   - foto3.jpg
   - foto4.jpg
   - foto5.jpg
3. Coloca la fotografía que aparecerá en la sección del brindis como:
   - foto_brindis.jpg
4. Coloca tu música como:
   - musica.mp3
5. Abre `index.html` en el navegador.

## Personalizar el mensaje de la carta

Abre:

`index.html`

Busca:

`<!-- SECCIÓN 3 - CARTA -->`

y modifica los textos dentro de `.letter-paper-inner`.

## Personalizar la cena

En `index.html`, busca:

`<!-- SECCIÓN 5 - CENA -->`

y modifica fecha, hora, restaurante y mensaje.

## Cambiar frases del corazón

Abre:

`js/script.js`

Busca:

`messages:`

Ahí puedes cambiar las frases de cada etapa.

## Importante sobre la música

La música empieza después de completar la portada porque los navegadores normalmente bloquean la reproducción automática hasta que existe una interacción del usuario.

## Reinicio

No se utiliza localStorage ni cookies para guardar el progreso. Por eso, al recargar la página, la experiencia vuelve a comenzar desde la portada.
