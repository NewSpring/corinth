describe('Landing Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have landing screen', async () => {
    await expect(element(by.id('landing_screen'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  // await element(by.id('hello_button')).tap();
  // await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
});
