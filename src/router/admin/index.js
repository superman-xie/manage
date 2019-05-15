import adminLog from '@/components/admin/adminLog'
export default [
    {
        path: '/adminLog',
        name: 'adminLog',
        component: adminLog,
        meta:{
            isAuthorization : true
        }
    }
]