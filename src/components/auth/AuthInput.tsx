interface AuthInputProps {
  label: string
  value: any
  obrigatorio?: boolean
  naoRenderizarInput?: boolean 
  tipo?: 'text' | 'email' | 'password'
  valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
  return props.naoRenderizarInput ? null :(
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input type={props.tipo ?? 'text'} value={props.value} onChange={e => props.valorMudou?.(e.target.value)} required={props.obrigatorio} className="px-4 py-3 rounded-lg bg-gray-200 focus:bg-white mt-2 border focus:border-blue-500 focus:outline-none" />
      
    </div>
  )
}