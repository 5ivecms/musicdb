import type { FC } from 'react'
import { useForm } from 'react-hook-form'

const onSubmit = (data: any): void => {
  console.log(data)
}

const GenreForm: FC = () => {
  const { handleSubmit } = useForm()

  return <form onSubmit={handleSubmit(onSubmit)} />
}

export default GenreForm
