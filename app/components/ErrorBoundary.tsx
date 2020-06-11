import React from "react"

interface Props {
  fallback?: (error: any) => React.ReactNode
}

class ErrorBoundary extends React.Component<Props> {
  fallback = (error) => <div>Error: {JSON.stringify(error)}</div>
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    }
  }

  render() {
    if (this.state.hasError) {
      return (this.props.fallback || this.fallback)(this.state.error)
    }
    return this.props.children
  }
}

export default ErrorBoundary
