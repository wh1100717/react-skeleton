import React from 'react'
import Router from 'react-routing/src/Router'
import App from './App'
import ContentPage from './ContentPage'
import NotFoundPage from './NotFoundPage'
import ErrorPage from './ErrorPage'
import http from '../utils/HttpClient'

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next()
    return component && <App context={state.context}>{component}</App>
  })

  // on('/contact', async () => <ContactPage />)

  // on('/login', async () => <LoginPage />)

  // on('/register', async () => <RegisterPage />)

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`)
    return content && <ContentPage {...content} />
  })

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  )

})

export default router
