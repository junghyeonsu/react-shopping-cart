import Header from '@/modules/header'
import Admin from '@/components/admin'

const AdminPage = () => {
  return (
    <section className="page admin-page">
      <Header title="상품 관리" />
      <Admin />
    </section>
  )
}

export default AdminPage
