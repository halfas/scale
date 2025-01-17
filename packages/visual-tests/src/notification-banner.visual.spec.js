describe('NotificationBanner', () => {
  test.each([
    ['standard'],
    ['warning'],
    ['error'],
    ['success'],
    ['informational'],
    ['dismissible'],
    ['timeout'],
    ['with-text'],
    ['with-link'],
    ['with-link-and-text'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-notification-banner--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
