import { SkillPage } from './app.po';

describe('skill App', function() {
  let page: SkillPage;

  beforeEach(() => {
    page = new SkillPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
