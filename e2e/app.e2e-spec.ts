import { GamelistdbPage } from './app.po';

describe('gamelistdb App', () => {
  let page: GamelistdbPage;

  beforeEach(() => {
    page = new GamelistdbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
