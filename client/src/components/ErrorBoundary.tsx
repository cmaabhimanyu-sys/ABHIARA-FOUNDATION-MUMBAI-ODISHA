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

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/aaf-logo-concept-3-DYGWPrtD3n9D2RUbi4xCrD.png"
              alt="Abhiara Foundation"
              className="h-16 w-auto mx-auto mb-8 opacity-60"
            />
            <h1 className="font-serif text-2xl font-bold text-white mb-3">
              Something went wrong
            </h1>
            <p className="font-sans text-[14px] text-white/50 leading-relaxed mb-8">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-8 text-left">
                <summary className="font-mono text-[10px] tracking-wider uppercase text-white/30 cursor-pointer hover:text-white/50 transition-colors">
                  Technical Details
                </summary>
                <pre className="mt-3 p-4 bg-black/30 rounded-lg text-[11px] text-white/40 overflow-auto max-h-40 font-mono">
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
