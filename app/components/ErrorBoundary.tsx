import React from "react"

interface Props {
  fallback: (error: any) => React.ReactNode
}

export default class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error)
    }
    return this.props.children
  }
}
