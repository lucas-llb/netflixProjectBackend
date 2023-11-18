import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { sequelize } from '../database';
import { adminJsResources } from './resources';
import { Category, Episode, Serie, User } from '../models';
import bcrypt from 'bcrypt'
import { locale } from './locale';

AdminJs.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJs({
    databases: [sequelize],
    locale: locale,
    rootPath: "/admin",
    resources: adminJsResources,
    branding: {
        companyName: 'NetflixProject',
        theme: {
          colors: {
              primary100: '#ff0043',
              primary80: '#ff1a57',
              primary60: '#ff3369',
              primary40: '#ff4d7c',
              primary20: '#ff668f',
              grey100: '#151515',
              grey80: '#333333',
              grey60: '#4d4d4d',
              grey40: '#666666',
              grey20: '#dddddd',
              filterBg: '#333333',
              accent: '#151515',
              hoverBg: '#151515',
          }
        }
      },
      dashboard: {
        component: AdminJs.bundle("./components/Dashboard"),
        handler: async (req, res, context) => {
          const series = await Serie.count();
          const episodes = await Episode.count();
          const categories = await Category.count();
          const users = await User.count({where: { role:'user'}})

          res.json({
            'Series': series,
            'Episódios': episodes,
            'Categorias': categories,
            'Usuários': users
          })
        }
      }
})

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
      const user = await User.findOne({ where: {email}})
      if(user && user.role == 'admin'){
        const matched = await bcrypt.compare(password, user.password);

        if(matched){
          return user;
        }
      }
      return false;
  },
  cookiePassword: 'cookie-password'
}, 
null, 
{
    resave: false,
    saveUninitialized: false
});