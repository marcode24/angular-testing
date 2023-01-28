import { Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function getText<T>(fixture: ComponentFixture<T>, testId: string) {
  const debugElement = queryById(fixture, testId);
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`Element not found: ${selector}`);
  }
  return debugElement;
}

export function queryById<T>(fixture: ComponentFixture<T>, id: string) {
  const selector = `[data-testid="${id}"]`;
  return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.nativeElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
  return fixture.debugElement.queryAll(By.directive(directive));
}
