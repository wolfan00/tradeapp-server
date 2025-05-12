import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'

import sequelize from './models/index.js' 

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
})

const adminRouter = AdminJSExpress.buildRouter(adminJs)

export { adminJs, adminRouter }
