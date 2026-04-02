import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
          <Card className="w-full max-w-md shadow-lg border-red-100">
            <CardHeader className="bg-red-50/50 rounded-t-xl pb-4">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertTriangle className="h-6 w-6" />
                <CardTitle>Ops! Algo deu errado</CardTitle>
              </div>
              <CardDescription className="text-red-700/80">
                Ocorreu um erro inesperado na aplicação.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-slate-100 p-3 rounded text-sm font-mono text-slate-700 overflow-auto max-h-32">
                {this.state.error?.message || 'Erro desconhecido'}
              </div>
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Recarregar Aplicação
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
