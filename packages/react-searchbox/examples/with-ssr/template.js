export default ({ body, title, initialState, css }) =>
  `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <style>${[...css].join('')}</style>

        <title>${title}</title>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/assets/bundle.js"></script>
    </html>
  `;
