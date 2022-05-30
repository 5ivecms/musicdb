import { FC } from 'react'
import { useForm } from 'react-hook-form'

interface GenreFormProps {}

const GenreForm: FC<GenreFormProps> = () => {
  const { handleSubmit } = useForm()

  const onSubmit = () => {}

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}

export default GenreForm
