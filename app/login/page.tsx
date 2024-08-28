import { Card, Flex } from '@chakra-ui/react'
import { LoginForm } from '../components/forms/LoginForm'

export default function LoginPage() {
  return (
    <Flex height='90vh' align='center' justify='center'>
      <Card px='5rem' py='3rem'>
        <LoginForm />
      </Card>
    </Flex>
  )
}
