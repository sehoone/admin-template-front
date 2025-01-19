# global loading

Global loading refers to the loading effect that appears when the page is refreshed, usually a rotating icon:

![Global loading spinner](/guide/loading.png)

## Principle

Implemented by the `vite-plugin-inject-app-loading` plugin, the plugin will inject a global `loading html` into each application.

## closure

If you don't need global loading, you can turn it off in the `.env` file:

```bash
VITE_INJECT_APP_LOADING=false
```

## Custom

If you want to customize global loading, you can create a `loading.html` file in the application directory at the same level as `index.html`, and the plug-in will automatically read and inject it. This html can define its own styles and animations.

::: tip

- You can use the same syntax as `index.html`, such as the `VITE_APP_TITLE` variable, to get the title of the application.
- There must be an element with id="__app-loading__"`.
- Add a `hidden` class to the element with `id="__app-loading__"`.
- There must be a `style[data-app-loading="inject-css"]` element.

```html{1,4}
<style data-app-loading="inject-css">
  #__app-loading__.hidden {
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: all 1s ease-out;
  }
  /* ... */
</style>
<div id="__app-loading__">
  <!-- ... -->
  <div class="title"><%= VITE_APP_TITLE %></div>
</div>
```

:::