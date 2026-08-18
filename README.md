# PLENO · Carta digital

Este repositorio contiene la carta digital QR de PLENO. Es una aplicación estática React + Vite que se publica automáticamente en GitHub Pages con cada cambio aprobado en `main`.

## URL pública

La carta está publicada en **https://pleno-coffeeandbowls.github.io/carta/** con HTTPS activo.

## Estructura

| Ruta | Uso |
| --- | --- |
| `client/src/pages/Home.tsx` | Contenido de la carta, nombres, precios, enlaces y estructura de la experiencia. |
| `client/src/index.css` | Sistema visual, responsive y comportamiento de las fotos. |
| `client/public/assets/` | Logotipo, fotografías y texturas de PLENO. |
| `.github/workflows/deploy.yml` | Compilación y publicación automática al actualizar `main`. |

## Actualizar la carta

Tras aprobar un cambio, modifica el contenido o los estilos, prueba localmente con `pnpm dev`, comprueba la producción con `pnpm build`, y súbelo a `main`. GitHub Pages desplegará la actualización de forma automática. Mantén los recursos visuales en `client/public/assets/` y usa la función `asset()` de `Home.tsx` para referenciarlos.

Para una actualización manual desde PowerShell, usa este flujo desde la carpeta local del repositorio:

```powershell
git pull origin main
pnpm install
pnpm build
git add .
git commit -m "chore: actualizar carta PLENO"
git push origin main
```

El flujo `.github/workflows/deploy.yml` compila y publica cada `push` a `main`; no hace falta subir manualmente la carpeta `dist` ni usar una rama `gh-pages`.

## Notas de publicación

El repositorio es público y GitHub Pages también lo será. No guardes credenciales, datos personales ni materiales no autorizados. La configuración usa la base `/carta/`, necesaria porque el sitio se publica dentro de un repositorio de proyecto, no en la raíz del perfil.

## Referencias

[1] [Vite · Deploying a Static Site](https://vite.dev/guide/static-deploy)

[2] [GitHub Docs · Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

[3] [GitHub Docs · Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
