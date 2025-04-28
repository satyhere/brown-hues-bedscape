import { useEffect, useState } from 'react'
import { testSupabaseConnection } from '../integrations/supabase/test'

export function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    async function testConnection() {
      try {
        const result = await testSupabaseConnection()
        if (!mounted) return

        setStatus(result.success ? 'success' : 'error')
        setMessage(result.success ? 'Connected to Supabase successfully!' : 'Failed to connect to Supabase')
        setDetails(result)
      } catch (error) {
        if (!mounted) return
        setStatus('error')
        setMessage('Error testing Supabase connection')
        setDetails(error)
      }
    }

    testConnection()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      <div className={`p-4 rounded ${
        status === 'loading' ? 'bg-gray-100' :
        status === 'success' ? 'bg-green-100' :
        'bg-red-100'
      }`}>
        <p className="mb-2">{status === 'loading' ? 'Testing connection...' : message}</p>
        {details && (
          <div className="text-xs overflow-auto p-2 bg-white/50 rounded">
            <p className="font-semibold mb-1">Details:</p>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(details, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 