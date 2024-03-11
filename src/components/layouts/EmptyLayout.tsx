import Container from '@mui/material/Container'

interface EmptyLayoutProps {
  children: React.ReactNode
}

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => {
  return (
    <Container sx={{ height: '100vh' }} disableGutters maxWidth={false}>
      {children}
    </Container>
  )
}
export default EmptyLayout
