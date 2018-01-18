$(document).ready(function () {
    window.mdc.autoInit();

    var toolbar = mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
    toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');

    let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    document.querySelector('.oprum-menu').addEventListener('click', () => drawer.open = true);
});
