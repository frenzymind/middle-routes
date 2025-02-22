import { Component, ErrorInfo, ReactNode } from 'react'

type IProps = {
  children?: ReactNode
}

type IState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<IProps, IState> {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error) {
    console.log('Error boundary:', error)

    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h2>Что-то тут совсем не так</h2>
    }

    return this.props.children
  }
}
