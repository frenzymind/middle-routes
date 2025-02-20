export type ILoginFormResult = { email: string; password: string }

interface ILoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  pswd: HTMLInputElement
}

export interface ILoginFormEvent extends HTMLFormElement {
  readonly elements: ILoginFormElements
}
