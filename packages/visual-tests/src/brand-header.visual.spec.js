describe('Brand Header', () => {
  it('default mega menu states', async () => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--standard&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    await page.evaluate(() => {
      const transitions = [
        '--scl-motion-duration-immediate',
        '--scl-motion-duration-fast',
        '--scl-motion-duration-slower',
        '--scl-motion-duration-deliberate',
      ];

      transitions.forEach((transitionSpeed) => {
        document.body.style.setProperty(transitionSpeed, '0s');
      });
    });

    const previewHtml = await page.$('body');
    const firstLink = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-app-shell").shadowRoot.querySelector("scale-app-header nav.header__nav > div > div.header__nav-menu-wrapper > div.header__nav-menu-main > ul > scale-nav-main:nth-child(1) > li > a")`
    );
    await firstLink.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await firstLink.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });

  it('custom mega menu states', async () => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--custom-main-navigation&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const previewHtml = await page.$('body');
    const firstLink = await page.evaluateHandle(
      `document.querySelector("#nav-main-with-mega-menu > li > a")`
    );
    await firstLink.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await firstLink.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });

  test.each([
    ['standard'],
    ['custom-main-navigation'],
    ['custom-icon-navigation'],
    ['custom-sector-navigation'],
    ['custom-addon-navigation'],
    ['custom-logo'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    await page.evaluate(() => {
      const transitions = [
        '--scl-motion-duration-immediate',
        '--scl-motion-duration-fast',
        '--scl-motion-duration-slower',
        '--scl-motion-duration-deliberate',
      ];

      transitions.forEach((transitionSpeed) => {
        document.body.style.setProperty(transitionSpeed, '0s');
      });
    });

    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
