import { Angular2fb2Page } from './app.po';

describe('angular2fb2 App', function() {
  let page: Angular2fb2Page;

  beforeEach(() => {
    page = new Angular2fb2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
