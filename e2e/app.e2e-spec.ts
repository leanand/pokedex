import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('pokemon App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to PokeDex');
  });

  it('should contain twenty elements', () => {
    page.navigateTo();
    expect(element.all(by.css('.pokemon-wrap')).then((items) => {
      return items.length;
    })).toEqual(20);
  });

  it('clicking next button should list next twenty elements', () => {
    page.navigateTo();
    let initialName = element(by.css('.pokemon-wrap h4')).getText();
    element(by.id("nextButton")).click();

    let nextName = element(by.css('.pokemon-wrap h4')).getText();
    expect(nextName).not.toEqual(initialName);
    expect(element.all(by.css('.pokemon-wrap')).then((items) => {
      return items.length;
    })).toEqual(20);
  });

  it('clicking previous button should list the previous twenty elements', () => {
    page.navigateTo();
    let initialName = element(by.css('.pokemon-wrap h4')).getText();
    element(by.id("nextButton")).click();
    element(by.id("previousButton")).click();
    let nextName = element(by.css('.pokemon-wrap h4')).getText();
    expect(nextName).toEqual(initialName);
    expect(element.all(by.css('.pokemon-wrap')).then((items) => {
      return items.length;
    })).toEqual(20);
  });

  it('should go to pokemon detail page, when clicking the pokemon tab', () => {
    page.navigateTo();
    let initialName = element(by.css('.pokemon-wrap h4')).getText();
    expect(element(by.css('.pokemon-header'))).not.toBeFalsy();
    expect(element(by.css('.pokemon-image'))).not.toBeFalsy();
    expect(element(by.css('.pokemon-height'))).not.toBeFalsy();
    expect(element(by.css('.pokemon-weight'))).not.toBeFalsy();
  });
});
