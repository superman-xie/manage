import isAdminLog from '@/components/admin/adminLog'
export default [
    {
        path: '/isAdminLog',
        name: 'isAdminLog',
        component: isAdminLog,
        meta:{
            isAuthorization : true
        }
    }
]