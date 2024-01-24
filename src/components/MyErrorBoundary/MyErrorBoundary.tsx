import React, { Component, ErrorInfo } from 'react'

interface MyErrorBoundaryProps {
  children: React.ReactNode
}

interface MyErrorBoundaryState {
  hasError: boolean
}

class MyErrorBoundary extends Component<
  MyErrorBoundaryProps,
  MyErrorBoundaryState
> {
  constructor(props: MyErrorBoundaryProps) {
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
