import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isApiError = this.state.error?.message?.includes("fetch") ||
        this.state.error?.message?.includes("network") ||
        this.state.error?.message?.includes("500") ||
        this.state.error?.message?.includes("Failed");

      return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <img
              src="/abhiara-logo.png"
              alt="Abhiara Foundation"
              className="h-16 w-auto mx-auto mb-8 opacity-80"
            />
            <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">
              {isApiError ? "Service Temporarily Unavailable" : "Something went wrong"}
            </h1>
            <p className="font-sans text-[16px] text-[#555] leading-relaxed mb-4">
              {isApiError
                ? "Our servers are currently experiencing issues. This is usually temporary. please try again in a few moments."
                : "We encountered an unexpected error. Please try refreshing the page."
              }
            </p>
            {isApiError && (
              <p className="font-sans text-[12px] text-[#888] leading-relaxed mb-6">
                If this persists, please contact us at info@abhiarafoundation.org
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#111111] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1A1A1A] transition-colors rounded-sm"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-8 text-left">
                <summary className="font-mono text-[10px] tracking-wider uppercase text-[#888] cursor-pointer hover:text-[#555] transition-colors">
                  Technical Details
                </summary>
                <pre className="mt-3 p-4 bg-white border border-gray-200 rounded-lg text-[11px] text-[#666] overflow-auto max-h-40 font-mono">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
