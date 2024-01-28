import React, { Component, ErrorInfo } from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class MyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    /* eslint-disable no-console*/
    console.error('Error caught by MyErrorBoundary:', error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }
    return this.props.children
  }
}

export default MyErrorBoundary
